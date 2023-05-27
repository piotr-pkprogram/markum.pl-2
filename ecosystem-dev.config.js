module.exports = {
  apps: [
    {
      name: 'Markum.pl Dev',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      port: 3002,
      env_local: {
        APP_ENV: 'local',
        CONTENTFUL_API_PUBLIC_KEY: 'nrz0imrXtNkAmAhpoe6Y1nTV8cYAKZxyeQNs5hIYjiA',
        CONTENTFUL_API_PREVIEW_KEY: 'rjpkrg7XfxddBPD3v4Z-9z-8HT0nmrZozBGuhEvbrwo',
        CONTENTFUL_API_ID: 'xjfnd4eilgtd',
        CONTENTFUL_API_MANAGMENT_KEY: 'CFPAT-HKsmBrLGNUUSzdTheHNWnMWbeh-4kcc0TVZzwC00T7c',
        DOMAIN: 'http://134.122.92.71',
        ASARI_ID: '64074',
        ASARI_TOKEN: '0t574u4Yw3G6Jm20T26N7bRQV58bZ5U7As1P84u2'
      },
      env_development: {
        APP_ENV: 'dev',
        CONTENTFUL_API_PUBLIC_KEY: 'nrz0imrXtNkAmAhpoe6Y1nTV8cYAKZxyeQNs5hIYjiA',
        CONTENTFUL_API_PREVIEW_KEY: 'rjpkrg7XfxddBPD3v4Z-9z-8HT0nmrZozBGuhEvbrwo',
        CONTENTFUL_API_ID: 'xjfnd4eilgtd',
        CONTENTFUL_API_MANAGMENT_KEY: 'CFPAT-HKsmBrLGNUUSzdTheHNWnMWbeh-4kcc0TVZzwC00T7c',
        DOMAIN: '//marcinkumiszczo.pl',
        ASARI_ID: '64074',
        ASARI_TOKEN: '0t574u4Yw3G6Jm20T26N7bRQV58bZ5U7As1P84u2'
      },
      env_production: {
        APP_ENV: 'prod',
        CONTENTFUL_API_PUBLIC_KEY: 'nrz0imrXtNkAmAhpoe6Y1nTV8cYAKZxyeQNs5hIYjiA',
        CONTENTFUL_API_PREVIEW_KEY: 'rjpkrg7XfxddBPD3v4Z-9z-8HT0nmrZozBGuhEvbrwo',
        CONTENTFUL_API_ID: 'xjfnd4eilgtd',
        CONTENTFUL_API_MANAGMENT_KEY: 'CFPAT-HKsmBrLGNUUSzdTheHNWnMWbeh-4kcc0TVZzwC00T7c',
        DOMAIN: '//marcinkumiszczo.pl',
        ASARI_ID: '64074',
        ASARI_TOKEN: '0t574u4Yw3G6Jm20T26N7bRQV58bZ5U7As1P84u2'
      }
    }
  ]
};
