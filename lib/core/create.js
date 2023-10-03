const { program } = require("commander")
const { createProjectAction, addComponentAction, addPageAndRouteAction, addStoreAction } = require("./actions")

// 配置commands
const createCommands = () => {
  program
    // 后面...表示可变参数选项 a,b  或者a,b,c 一般中括号表示可选，而尖括号表示必选
    .command('create <project> [others...]')
    .description('clone repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add a vue component，例如：xun addcpn HelloWorld [-d src/components]')
    .action((name) => {
      addComponentAction(name, program.opts().dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config，例如：xun addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRouteAction(page, program.opts().dest || 'src/pages')
    })

  program
    .command('addstore <store>')
    .description('add vue store config，例如：xun addstore Home [-d src/store/modules]')
    .action((store) => {
      addStoreAction(store, program.opts().dest || 'src/store/modules')
    })
}

module.exports = createCommands
