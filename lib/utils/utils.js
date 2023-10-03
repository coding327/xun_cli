const path = require('path')
const fs = require('fs');

const ejs = require('ejs')

const compile = (templateType, templateName, data) => {
  const templatePosition = `../templates/${templateType}/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }

      resolve(result)
    })
  })
}

// source/components/category
// const createDirSync = (pathName) => {
//   if (fs.existsSync(pathName)) {
//     return
//   } else {
//     // 判断父级目录是否存在
//     if (fs.existsSync(path.dirname(pathName))) {
//       // 存在创建category
//       fs.mkdirSync(pathName)
//     } else {
//       if (fs.existsSync(path.dirname(path.dirname(pathName)))) {

//       }
//     }
//   }
// }

// 递归创建文件夹
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}