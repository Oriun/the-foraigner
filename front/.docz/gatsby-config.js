const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'The Foraigner',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'The Foraigner',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front',
          templates:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\node_modules\\docz-core\\dist\\templates',
          docz:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz',
          cache:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz\\.cache',
          app:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz\\app',
          appPackageJson:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\package.json',
          appTsConfig:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\tsconfig.json',
          gatsbyConfig:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\gatsby-config.js',
          gatsbyBrowser:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\gatsby-browser.js',
          gatsbyNode:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\gatsby-node.js',
          gatsbySSR:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\gatsby-ssr.js',
          importsJs:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz\\app\\imports.js',
          rootJs:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz\\app\\root.jsx',
          indexJs:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz\\app\\index.jsx',
          indexHtml:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz\\app\\index.html',
          db:
            'D:\\Epitech\\ESP\\the-foreignerNew\\the-foraigner\\front\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
