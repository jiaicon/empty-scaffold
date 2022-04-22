#!/usr/bin/env node
const program = require('commander')
const { add } = require('./../src/command');

program.usage('<command>')

const packageInfo = require('../package.json');

program.version(packageInfo.version)

program
  .command('add [projectName]')
  .description('add a new template')
  .action((projectName) => {
    add(projectName);
  })

program
  .command('delete')
  .description('delete a template')
  .action(() => {
    require('../commands/delete')
  })

program
  .command('list')
  .description('List the templateList')
  .action(() => {
    require('../commands/list')
  })

program
  .command('init')
  .description('init a project')
  .action(() => {
    require('../commands/init')
  })

program.parse(process.argv)