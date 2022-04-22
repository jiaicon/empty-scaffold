const child_process = require('child_process')

const { spawn } = child_process;

export const download = function() {
  const g = spawn('git', ['clone', '-b'])
}