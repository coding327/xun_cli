// 内置
// 不使用这个download了，128报错
// const { promisify } = require('util')
// const download = promisify(require('download-git-repo'))

// const exec = promisify(require('node:child_process').exec);

const path = require('path')

// 三方库
// open改为es module了，裂开
// const open = require('open')
// const { openBrowser } = require('../utils/open-browser')

// personal
const { vueRepo } = require('../config/repo-config')
const { cloneRepo } = require('../utils/clone-repo')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

const createProjectAction = async (project, others) => {
  console.log('xun helps you create your project~')
  // 1. clone项目
  // 方法1：【这个库不知道咋了，报错】
  // await download(vueRepo, project, { clone: true }, (err) => {
  //   console.log(err ? err : 'success~');
  // }) // clone: true即git clone，false下载zip

  // 方法2：
  // node内置的模块方法【上面包原理也是这个】
  // await exec(`git clone ${vueRepo} ${project}`)
  // 简单使用exec封装一下，下面commandSpawn也可以在这使用
  await cloneRepo(vueRepo, project)

  // 2. 执行npm install
  // mac电脑执行npm就是npm，执行webpack就是webpack，linux系统也是，但是windows电脑执行的npm实际上是npm.cmd，终端它会找到这个npm.cmd。所以终端可以输入npm正常的，但是这里不是通过终端执行，而是我们自己让它去执行，所以需要判断一下【cmd命令行输入where npm或者which npm一般可以查看所在文件，powershell是where.exe npm】
  // 在 Windows 操作系统中，32 位和 64 位版本的进程都被归类为 "win32"
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3. 运行npm run serve 【注意这里执行完npm run serve后会造成阻塞，服务是一直开着，除非ctrl + c关闭，才会执行resolve，再执行后面代码，所以这里去掉await】
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })

  // 4. 打开浏览器【安装一个open三方库， 或者在webpack可以配置自动打开 devServer: { open: true } 】
  // openBrowser('http://localhost:8080/')
}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  /**
   * 1. 有对应的ejs模板
   * 2. 编译ejs模板得到一个字符串
   * 3. 将这个字符串写入到文件中
   * 4. 放到对应的文件夹中
   */

  // 1. 编译ejs模板
  const result = await compile('vue', 'component.ejs', { name, lowerName: name.toLowerCase() })

  // 2. 写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

// 添加组件和路由的action
const addPageAndRouteAction = async (name, dest) => {
  // 1. 编译ejs模板
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile('vue', 'component.ejs', data)
  const routeResult = await compile('vue', 'router.ejs', data)

  // 2. 写入文件的操作
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}

// 添加store的action
const addStoreAction = async (name, dest) => {
  // 1. 编译ejs模板
  const storeResult = await compile('vue', 'store.ejs', {})
  const typesResult = await compile('vue', 'types.ejs', {}) // types是store的常量

  // 2. 写入文件的操作
  const targetDest = path.resolve(dest, name.toLowerCase())
  if (createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `${name}.js`)
    const targeTypesPath = path.resolve(targetDest, 'types.js')
    writeToFile(targetStorePath, storeResult)
    writeToFile(targeTypesPath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}