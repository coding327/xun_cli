const { promisify } = require('util')
const exec = promisify(require('node:child_process').exec)

// node内置的模块方法
async function cloneRepo(repo, project) {
  try {
    const result = await exec(`git clone ${repo} ${project}`)
    console.log(`successfully~`)
  } catch (error) {
    console.error(`failed: ${error}`)
  }
}

module.exports = {
  cloneRepo
}