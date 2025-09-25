#!/usr/bin/env node

const { exec } = require('child_process');
const os = require('os');

function killPort5000() {
  const platform = os.platform();
  let command;

  console.log('========================================');
  console.log('Attempting to kill processes on port 5000...');
  console.log('========================================');

  if (platform === 'win32') {
    // Windows command
    command = 'netstat -ano | findstr :5000';
  } else {
    // Unix-like systems (macOS, Linux)
    command = 'lsof -ti:5000';
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('No processes found running on port 5000');
      console.log('========================================');
      return;
    }

    if (platform === 'win32') {
      // Windows parsing
      const lines = stdout.trim().split('\n');
      const pids = lines.map(line => {
        const parts = line.trim().split(/\s+/);
        return parts[parts.length - 1];
      }).filter(pid => !isNaN(pid) && pid !== '0');

      if (pids.length > 0) {
        const killCommand = `taskkill /F /PID ${pids.join(' /PID ')}`;
        console.log(`Found processes with PIDs: ${pids.join(', ')}`);
        exec(killCommand, (killError, killStdout, killStderr) => {
          if (killError) {
            console.error('Error killing processes:', killStderr);
          } else {
            console.log('Successfully killed processes on port 5000');
          }
          console.log('========================================');
        });
      } else {
        console.log('No valid processes found running on port 5000');
        console.log('========================================');
      }
    } else {
      // Unix-like systems parsing
      const pids = stdout.trim().split('\n').filter(pid => !isNaN(pid) && pid !== '');
      
      if (pids.length > 0) {
        console.log(`Found processes with PIDs: ${pids.join(', ')}`);
        const killCommand = `kill -9 ${pids.join(' ')}`;
        exec(killCommand, (killError, killStdout, killStderr) => {
          if (killError) {
            console.error('Error killing processes:', killStderr);
          } else {
            console.log('Successfully killed processes on port 5000');
          }
          console.log('========================================');
        });
      } else {
        console.log('No valid processes found running on port 5000');
        console.log('========================================');
      }
    }
  });
}

// Add a small delay to ensure any previous server shutdown is complete
setTimeout(killPort5000, 1000);