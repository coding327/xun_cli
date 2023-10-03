/**
 * 执行终端命令的代码
 */

// exec是spawn的封装
const { exec, spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    // pipe管道函数，把子进程输出流添加到主进程输出流
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stdout)
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}