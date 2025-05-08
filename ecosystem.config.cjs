module.exports = {
  apps: [
    {
      name: 'dialogos-client',
      cwd: 'current',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        NEXT_TELEMETRY_DISABLED: 1
      },
      max_memory_restart: '500M',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
      log_type: 'json',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false
    }
  ]
}
