module.exports = {
  apps: [
    {
      name: 'Markum.pl',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      env_local: {
        APP_ENV: 'local',
        'CONTENTFUL_API_PUBLIC_KEY': 'nrz0imrXtNkAmAhpoe6Y1nTV8cYAKZxyeQNs5hIYjiA',
        'CONTENTFUL_API_PREVIEW_KEY': 'rjpkrg7XfxddBPD3v4Z-9z-8HT0nmrZozBGuhEvbrwo',
        'CONTENTFUL_API_ID': 'xjfnd4eilgtd',
        'CONTENTFUL_API_MANAGMENT_KEY': 'CFPAT-HKsmBrLGNUUSzdTheHNWnMWbeh-4kcc0TVZzwC00T7c',
        'DOMAIN': 'http://134.122.92.71:3000',
        'ESTICRM_ID': 6400,
        'ESTICRM_TOKEN': '44b48b0294',
      },
      env_development: {
        APP_ENV: 'dev',
        'CONTENTFUL_API_PUBLIC_KEY': 'nrz0imrXtNkAmAhpoe6Y1nTV8cYAKZxyeQNs5hIYjiA',
        'CONTENTFUL_API_PREVIEW_KEY': 'rjpkrg7XfxddBPD3v4Z-9z-8HT0nmrZozBGuhEvbrwo',
        'CONTENTFUL_API_ID': 'xjfnd4eilgtd',
        'CONTENTFUL_API_MANAGMENT_KEY': 'CFPAT-HKsmBrLGNUUSzdTheHNWnMWbeh-4kcc0TVZzwC00T7c',
        'DOMAIN': 'http://134.122.92.71',
        'ESTICRM_ID': 6400,
        'ESTICRM_TOKEN': '44b48b0294',
      },
      env_production: {
        APP_ENV: 'prod',
        'CONTENTFUL_API_PUBLIC_KEY': 'nrz0imrXtNkAmAhpoe6Y1nTV8cYAKZxyeQNs5hIYjiA',
        'CONTENTFUL_API_PREVIEW_KEY': 'rjpkrg7XfxddBPD3v4Z-9z-8HT0nmrZozBGuhEvbrwo',
        'CONTENTFUL_API_ID': 'xjfnd4eilgtd',
        'CONTENTFUL_API_MANAGMENT_KEY': 'CFPAT-HKsmBrLGNUUSzdTheHNWnMWbeh-4kcc0TVZzwC00T7c',
        'DOMAIN': 'https://www.marcinkumiszczo.pl',
        'ESTICRM_ID': 6400,
        'ESTICRM_TOKEN': '44b48b0294',
      }
    }
  ]
}