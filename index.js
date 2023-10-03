#!/usr/bin/env node
// 脚本用env启动的原因，是因为脚本解释器在linux中可能被安装于不同的目录，env可以在系统的环境变量中查找。同时如果直接将解释器路径写死在脚本里，可能在某些系统就会存在找不到解释器的兼容性问题
const { program } = require('commander')

const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 【Usage配置】帮助信息的首行提示
program
  .name('xun')
  // .usage('[global options] command') // 自定义覆盖默认的

// 【Version版本配置】查看版本号，动态获取package.json里的version
program.version(require('./package.json').version)
// 默认支持-V和--version，这里覆盖掉-V，所以后面补充一个【推荐就使用默认，后面两个参数不需要设置】
// program.version(require('./package.json').version, '-v, --version')
// program.version(require('./package.json').version, '-V, --version')

// 【Options、Other配置】添加帮助信息=help option
helpOptions()

// 【Commands配置】创建其他指令
createCommands()

// 获取帮助里--dest, --framework等选项传入的值
// console.log(program.opts().framework);

// 传入输入的命令行参数
program.parse(process.argv)
