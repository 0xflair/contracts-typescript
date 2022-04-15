import * as fse from "fs-extra";
import * as path from "path";
import * as rimraf from "rimraf";
import glob from "glob";

const main = async () => {
  const registry: Record<string, any> = {};

  const contractPackages = glob.sync(
    `${path.resolve(__dirname, "../node_modules")}/flair-contracts-*`,
    {
      nodir: false,
    }
  );

  for (const pkg of contractPackages) {
    const version = pkg.slice(pkg.lastIndexOf("-") + 1);
    registry[version] = registry[version] || {};

    const files = glob.sync("**/*.json", {
      nodir: true,
      cwd: pkg,
    });

    for (const file of files) {
      const artifactKey = file.slice(0, file.lastIndexOf("."));
      if (artifactKey === "package") continue;

      const artifactPath = path.resolve(pkg, file);
      const sourcePath = path.resolve(pkg, artifactKey + ".sol");

      registry[version][artifactKey] = {
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

  fse.writeJSONSync(path.resolve(__dirname, "../src/registry-mapping.json"), registry);

  fse.writeFileSync(
    path.resolve(__dirname, "../src/versions.ts"),
    `export enum Version {${Object.keys(registry)
  .map((v) => `'${v}' = '${v}'`)
  .join(", ")}}

export const LATEST_VERSION = Version['${versions[versions.length - 1]}'];
`);


};

main()
  .then((r) => {
    console.log(`Finished generating mapping.`);
  })
  .catch((e) => {
    console.error(`Error: ${e}`);
    process.exit(1);
  });
