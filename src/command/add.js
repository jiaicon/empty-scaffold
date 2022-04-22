
const figlet = require('figlet')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const download = require('download-git-repo')

const spinner = ora();

const scaffolds = [
  {
    name: 'empty-scaffold',
    title: 'Icon',
    url: 'github:jiaicon/empty-scaffold'
  },
  {
    name: 'Vant + Vite',
    title: 'Vant + Vite',
    url: 'github:'
  },
  {
    name: 'Vant + React',
    title: 'Vant + React',
    url: ''
  }
]

const add = function(projectName) {
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '选择要安装的包',
      choices: scaffolds.map(item => item.name),
      default: scaffolds[0].name,
    }
  ]).then(({ type }) => {
    const scaffold = scaffolds.find(item => item.name === type)
    if (scaffold)
    if (scaffold !== -1) {
      inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `确定要安装${scaffold.name}吗？`,
          default: true,
        }
      ]).then(({ confirm }) => {
        if (confirm) {
          spinner.start();
          download(scaffold.url, projectName, function (err) {
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
              console.log(`\r\nRun ${chalk.blue(scaffold + ' <command> --help')} show details\r\n`)
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
}

module.exports = add;
