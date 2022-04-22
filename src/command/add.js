
const figlet = require('figlet')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const download = require('download-git-repo')

const spinner = ora();


inquirer.prompt([
  {
    type: 'list',
    name: 'type',
    message: '选择要安装的包',
    choices: ['empty-scaffold', '测试项1', '测试项2'],
    default: 'empty-scaffold',
  }
]).then(({ type }) => {
  if (type === 'empty-scaffold') {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `确定要安装${type}吗？`,
        default: true,
      }
    ]).then(({ confirm }) => {
      if (confirm) {
        spinner.start();
        download('direct:https://github.com/jiaicon/empty-scaffold', path.join('./'), function (err) {
          if (err) {
            console.log(chalk.red(err))
          } else {
            console.log('\r\n' + figlet.textSync('icon', {
              font: 'Ghost',
              horizontalLayout: 'default',
              verticalLayout: 'default',
              width: 80,
              whitespaceBreak: true,
            }))
            console.log(`\r\nRun ${chalk.blue('icon-cli <command> --help')} show details\r\n`)
          }
          spinner.stop();
        })
      } else {
        console.log(`\r\n${chalk.red('您取消了安装')}\r\n`)
      }
    })
    
  } else {
    console.log('测试项而已0.0')
  }
})


