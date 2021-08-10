module.exports = {
  apps: [
    {
      name: 'restoreca',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    },
    // {
    //   name: 'dev',
    //   script: './node_modules/nuxt/bin/nuxt.js',
    //   args: 'dev'
    // }
  ]
}
