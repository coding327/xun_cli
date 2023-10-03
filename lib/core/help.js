const { program } = require('commander')

const helpOptions = () => {
  // --help时会有option，可以增加自己的help option
  program
    .option('-t, --test', 'a test cli')
    // 目标文件夹
    .option('-d, --dest <dest>', 'a destination folder, 例如：-d /src/components')
    // 第三个参数设置默认值
    .option('-f, --framework <framework>', 'your framework, 例如：vue2', 'vue2')

  // 监听指令，执行回调，打印内容会追加到尾部
  program.on('--help', () => {
    console.log('')
    console.log('Other:')
    console.log('  other options~')
  })
}

module.exports = helpOptions