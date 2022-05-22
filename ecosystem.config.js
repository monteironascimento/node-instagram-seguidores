module.exports = {
    apps : [{
      name: "instagram",
      version: "1.0.0",
      script: "ts-node ./src/server.ts",
      namespace: "INSTAGRAM",

       // Delay between restart
      //exec_mode: "cluster",
      autorestart: false,
      watch: true,
      max_memory_restart: '300M',
      //watch_delay: 10000,
      //kill_timeout: 3000,
      //instances: "max",
      //max_memory_restart: "1G",
      ignore_watch : ["node_modules","imagens","cookies"],
      watch_options: {
        "followSymlinks": false
      },
      
      env: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }