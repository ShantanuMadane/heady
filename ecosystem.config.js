module.exports = {
  apps: [
    {
      name: 'category-products',
      script: 'app.js',
      ignore_watch: ['*.log', '.git','node_modules'],
      watch:false,
      node_args: '--max_old_space_size=8192',
      max_memory_restart : '7168M',
      env: {
        NODE_ENV: "development",
        PORT:5051,
        DB_NAME:"heady"
      },
    }, 
  ]
};
