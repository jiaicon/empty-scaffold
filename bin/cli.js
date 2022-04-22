#!/usr/bin/env node
const program = require('commander')
const { init } = require('./../src/command');

program.usage('<command>')

const packageInfo = require('../package.json');

program.version(packageInfo.version)

program
  .command('init [projectName]')
  .description('init a new project')
  .action((projectName) => {
    init(projectName);
  })

program
  .command('delete')
  .description('delete a project')
  .action(() => {
    require('../commands/delete')
  })

program
  .command('list')
  .description('List the templateList')
  .action(() => {
    require('../commands/list')
  })

program.parse(process.argv)