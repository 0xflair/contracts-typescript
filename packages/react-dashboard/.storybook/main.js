module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    "@storybook/preset-create-react-app"
  ],
  "webpackFinal": (config) => {
    // add monorepo root as a valid directory to import modules from
    config.resolve.plugins.forEach((p) => {
      if (Array.isArray(p.appSrcs)) {
        p.appSrcs.push(path.join(__dirname, '..', '..', '..'));
      }
    });
    return config;
  },
  "logLevel": "debug",
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  "features": {
    "buildStoriesJson": true,
  }
}