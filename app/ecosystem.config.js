module.exports = {
    apps : [{
      name: "druid",
      script: "./lib/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }]
  };