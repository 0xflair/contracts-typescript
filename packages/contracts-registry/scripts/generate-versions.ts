import * as fse from 'fs-extra';
import glob from 'glob';
import * as path from 'path';
import { basename } from 'path';

const main = async () => {
  const registry: Record<string, any> = {};

  const contractPackages = glob.sync(
    `${path.resolve(__dirname, '../node_modules')}/flair-contracts-*`,
    {
      nodir: false,
    }
  );

  const versionToContractToChainAddress: Record<
    string,
    Record<string, string>
  > = {};

  for (const pkg of contractPackages) {
    const version = pkg.slice(pkg.lastIndexOf('-') + 1);
    const addressesPath = path.resolve(pkg, 'addresses.json');

    if (fse.existsSync(addressesPath)) {
      versionToContractToChainAddress[version] =
        fse.readJsonSync(addressesPath);
    }
  }

  const versionToBuildInfo: Record<string, Record<string, any>> = {};

  for (const pkg of contractPackages) {
    const version = pkg.slice(pkg.lastIndexOf('-') + 1);
    const buildInfoPath = path.resolve(pkg, 'build-info.json');

    if (fse.existsSync(buildInfoPath)) {
      versionToBuildInfo[version] = fse.readJsonSync(buildInfoPath);
    }
  }

  const packagePaths: Record<string, string> = {};
  const importNames: Record<string, string> = {};

  for (const pkg of contractPackages) {
    const version = pkg.slice(pkg.lastIndexOf('-') + 1);
    registry[version] = registry[version] || {};

    packagePaths[version] = pkg;
    importNames[version] = basename(pkg);

    const files = glob.sync('**/*.json', {
      nodir: true,
      cwd: pkg,
    });

    for (const file of files) {
      if (!file.includes('/') || file.startsWith('node_modules')) {
        continue;
      }

      const artifactKey = file.slice(0, file.lastIndexOf('.'));
      if (artifactKey === 'package') continue;

      const artifactPath = path.resolve(pkg, file);
      const sourcePath = path.resolve(pkg, artifactKey + '.sol');

      registry[version][artifactKey] = {
        address:
          (versionToContractToChainAddress[version] &&
            versionToContractToChainAddress[version][artifactKey]) ||
          undefined,
        artifact: fse.existsSync(artifactPath)
          ? fse.readJsonSync(artifactPath)
          : undefined,
        source: fse.existsSync(sourcePath)
          ? fse.readFileSync(sourcePath).toString()
          : undefined,
      };
    }
  }

  const versions = Object.keys(registry).sort();
  const lastVersion = versions[versions.length - 1];

  fse.writeJSONSync(
    path.resolve(__dirname, '../src/registry-mapping.json'),
    registry
  );

  fse.writeJSONSync(
    path.resolve(__dirname, '../src/build-info.json'),
    versionToBuildInfo
  );

  const typeNames: Record<string, any> = {};

  // TODO Extend ContractFqn type to export keys per version not just latest
  fse.writeFileSync(
    path.resolve(__dirname, '../src/generated-types.ts'),
    `/* THIS AN AUTO-GENERATED FILE, DO NOT EDIT MANUALLY */
/* eslint-disable */

${Object.entries(registry)
  .map(([versionTag, artifacts]) => {
    const safeVersionPrefix = getSafeVersionPrefix(versionTag);
    typeNames[versionTag] = {};
    return `import { ${Object.keys(artifacts)
      .map((key) => {
        if (
          !fse.existsSync(
            path.resolve(
              packagePaths[versionTag],
              'typechain',
              basename(key) + '.d.ts'
            )
          )
        ) {
          typeNames[versionTag][key] = 'any';
          return;
        }

        typeNames[versionTag][key] = `${safeVersionPrefix}${basename(key)}`;

        return `${basename(key)} as ${typeNames[versionTag][key]}
      `;
      })
      .filter((key) => !!key)
      .join(',')} } from '${importNames[versionTag]}';`;
  })
  .join(';')}

${Object.entries(registry)
  .map(([versionTag]) => {
    return `export type { ${Object.values(typeNames[versionTag])
      .filter((key) => key !== 'any')
      .join(',')} };`;
  })
  .join(';')}

export type ContractTypeRegistry = { ${Object.entries(registry)
      .map(([versionTag, artifacts]) => {
        const safeVersionPrefix = getSafeVersionPrefix(versionTag);
        return `'${versionTag}': { ${Object.keys(artifacts)
          .map(
            (key) =>
              `"${key}": ${
                typeNames[versionTag][key] === 'any'
                  ? 'any'
                  : `${typeNames[versionTag][key]}['functions']`
              }`
          )
          .join('; ')} }`;
      })
      .join(';')} };

${Object.entries(registry)
  .map(([versionTag, artifacts]) => {
    const safeVersionPrefix = getSafeVersionPrefix(versionTag);
    return `export type ${safeVersionPrefix}CONTRACTS = "${Object.keys(
      artifacts
    ).join('" | "')}"`;
  })
  .join(';\n')};

export type ContractFqn = ${Object.entries(registry)
      .map(([versionTag]) => {
        const safeVersionPrefix = getSafeVersionPrefix(versionTag);
        return `${safeVersionPrefix}CONTRACTS`;
      })
      .join(' | ')};

export type ContractVersion = keyof ContractTypeRegistry;

export const LATEST_VERSION: ContractVersion = "${lastVersion}";
`
  );
};

main()
  .then((r) => {
    console.log(`Finished generating mapping.`);
  })
  .catch((e) => {
    console.error(`Error: ${e}`);
    process.exit(1);
  });

function getSafeVersionPrefix(versionTag: string) {
  return versionTag.replace(/\./g, '_').toLocaleUpperCase() + '_';
}

/* 

export type ContractTypeRegistry = {
  "v1.4": {
    "collections/ERC721/extensions/ERC721AutoIdMinterExtension": ERC721AutoIdMinterExtension["functions"];
    "collections/ERC721/extensions/ERC721PrefixedMetadataExtension": ERC721PrefixedMetadataExtension["functions"];
  };
  "v1.3": {
    "collections/ERC721/extensions/ERC721AutoIdMinterExtension": ERC721AutoIdMinterExtension["functions"];
    "collections/ERC721/extensions/ERC721PrefixedMetadataExtension": ERC721PrefixedMetadataExtension["functions"];
  };
};
*/
