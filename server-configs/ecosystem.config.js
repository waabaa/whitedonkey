module.exports = {
  apps: [{
    name: 'whitedonkey',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/whitedonkey',
    instances: 'max', // 또는 원하는 인스턴스 수 (예: 2)
    exec_mode: 'cluster',
    
    // Environment variables
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NEXTAUTH_URL: 'https://whitedonkey.ktenterprise.net'
    },
    
    // Logging
    log_file: '/var/log/whitedonkey/combined.log',
    out_file: '/var/log/whitedonkey/out.log',
    error_file: '/var/log/whitedonkey/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Process management
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    restart_delay: 4000,
    
    // Performance tuning
    node_args: '--max-old-space-size=2048',
    
    // Health monitoring
    min_uptime: '10s',
    max_restarts: 10,
    
    // Environment-specific settings
    env_production: {
      NODE_ENV: 'production',
      INSTANCE_ID: 'prod-whitedonkey',
      LOG_LEVEL: 'info'
    }
  }],

  deploy: {
    production: {
      user: 'deploy',
      host: 'whitedonkey.ktenterprise.net',
      ref: 'origin/main',
      repo: 'https://github.com/waabaa/whitedonkey.git',
      path: '/var/www/whitedonkey',
      'pre-deploy-local': '',
      'post-deploy': 'npm ci --production && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};