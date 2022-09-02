import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json';

const stylesPostCssPlugin = (config) =>
  postcss({
    config: {
      path: path.resolve('postcss.config.js'),
    },
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
      require('postcss-add-root-selector')({
        rootSelector: '.flair-wallet-component',
      }),
    ],
    ...config,
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: './src/index.css',
    output: [
      {
        file: 'dist/index.css',
      },
    ],
    plugins: [
      stylesPostCssPlugin({
        // Setting extract to generate a CSS file
        inject: false,
        extract: true,
      }),
    ],
  },
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      json(),
      commonjs(),
      typescript(),
      stylesPostCssPlugin({
        // Un-setting extract to force exporting styles in the JS
        inject: false,
        extract: false,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types.d.ts' }],
    external: [/\.css$/u],
    plugins: [dts({})],
  },
];
