/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v1.quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = function(ctx) {
  return {
    // https://v1.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://v1.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v1.quasar.dev/quasar-cli/boot-files
    boot: ["axios", "syncfusion", "global-components", "spreadsheet"],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ["app.scss"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to it
      "material-icons" // optional, you are not bound to it
    ],

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      env: {
        GOOGLE_SERVICE_ACCOUNT_EMAIL:
          "google-sheet-service-account@cloud-mobile-app-318506.iam.gserviceaccount.com",
        GOOGLE_PRIVATE_KEY:
          "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChyD8qFiZBz985\nC2/wjB1sjlX+BaKc9zxBM0RNeWGaxrWU588VID90zBtZyj/FhNnQDbrNe7W24yY6\ntvt54yn/tG3qx7UM/QmcMpNzgtHqi0kmpTXLVFSXTq/OWqvkIllXPuyI6vt2UIAE\no/VVx5wC2J9dkaRhux8gXP685oaCmbeAD2GhY/9MPoww6u3Oy9LYAQ36ni6J4qHu\nh5xJv7FgZN60ck+X/XK5cXO09+t9J2LfTyzKukKaxDahXptgac7j0xNz/C+VdLdD\nOol0eMKmmMm7/py5l2IO9uCkja201TfGQ1UGHqlUMLyDkZMuW8+XRobcBQlezV4q\nwoAUrJ2vAgMBAAECggEAA9M1txuF9QliqDkegOv3KCFnZBWjBh4MVShOpZxIk/29\nvlMKwN+d0Heg7+sJvfRJqBMjBwe1QKk3Nq0r3fJihFKyRJpLLA7xgrlpZhJCP07i\nwGComHGafGdWXcUkCkVLonXw5r3TizUVCccMnmYVSLXxcqdmYQ8pCb1ZIoM6y+yn\n2+yUB6qrl4T58RD2AJYX9A8x/GrtqoZ7Qhh4y29nAELtcjr4fYYSKiA98KYGA85K\nkxQ7OOYXRQ6pdEvgspvBhsVW87/7xHma2AeMB8NSS0I+/wrSmV3OURQlKHvUwznI\nWAWGrKARof0NTvf5gQBJ15RylJeke3D5QTc7JYYxSQKBgQDMQgOTd5eRFXvuchGe\ncaBYz6d89m1aSZbQHiCgi7gtxhIz3+X3zKrajqr1fWwm5HNjo5uiRORaAJ2ffQ4V\nMS1CgTX0TAJEI3I3/CqJI85ixEfWCS473At9V+/23xnumM6xCqFjBaJ9qKn3Q9gw\nbMrJNz+ZB0S2oXvB06PBqjatdwKBgQDKw7cOzef6iEhH/foYAl5bMeB06UZgMhA2\nf+ee/VtJ1VD7GTVnU0i7p9u2U07cAKe1UjPc8YD14KBE3zMzFXh/veq8V9EGtm3/\nytbTvRIesZJAjujjryMI1VmlhDGz3ZEhPa2Pgk2z4UX1EzwTNZTZyfbgcSwyLawI\nhkqMZXK/iQKBgEsyNlzQ10S7Uw+6gNAC5tQrRm7TzfhCRTpDDSHtrhVz6PmeAOyU\nNYYWpcuQrAM5cV2KOt6nXCXiOiUgBdI5c38bUICqht8M6ZzAwewQ+YcU2ZlrcdDp\ntnUjrZ0GD2bubJFy520sAuEd+cyk9m8FbjZbl5c/vMU7d/Modg3zGwQLAoGAfDUb\n5BO6MTxemss38pEw38hT6QolNDQ2vkvnxPsKetYTf13X2u2ntlyDONMbkaVNFsO+\nRXAjQXtSch4QLRDP+eCK9MkOoIAMLg9BPf+qI+c+4hEpFKBqY7Td74hlMfteNfCk\nay61DqXGxvP7bwD5p9gSRTbOjgZwReCNtidG/ZECgYBu20RMp4/K5ZJhMKt6/6FI\nnyffaKzACmdLtJHG8Txg50v1unTf2IYB8fUT0s9UFg3aI3Yx/2cF7Ifr++TGPBow\nHvpCD4uK30WMACdLUGYsQG5VfojfR96bLRCPE7N1axNjE8CovrO5jLBSoZKxaheS\nLln96qX4qXQi82Orv6BcqQ==\n-----END PRIVATE KEY-----\n"
      },
      vueRouterMode: "hash", // available values: 'hash', 'history'

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://v1.quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v1.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
      }
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: false // opens browser window automatically
    },

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: "material-icons", // Quasar icon set
      lang: "en-us", // Quasar language pack
      config: {},

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: "auto",

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ["Notify", "Dialog", "AppFullscreen"]
    },

    // animations: 'all', // --- includes all animations
    // https://v1.quasar.dev/options/animations
    animations: [],

    // https://v1.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://v1.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: `Cloud Bytes Quasar Frontend`,
        short_name: `Cloud Bytes Quasar Frontend`,
        description: `Cloud Bytes Frontend using Quasar Framework`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "cb-quasar-frontend"
      },

      // More info: https://v1.quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  };
};
