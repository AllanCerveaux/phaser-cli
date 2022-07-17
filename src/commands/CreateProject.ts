import { Command, Option } from 'commander'
import { join, resolve } from 'path'

import { Tea } from 'tea-parser'
import { __dirname } from '../utils'
import { existsSync } from 'fs'
import generate from 'project-name-generator'
import prompts from 'prompts'
import { spawn } from 'child_process'

function CreateProject() {
  const cmd = new Command('create')
  cmd
    .argument('[project_name]', 'Name of project')
    .addOption(
      new Option('-t, --template <template>', 'choose the template you want :').choices([
        'typescript',
        'javascript',
        'empty'
      ])
    )
    .addOption(
      new Option('-pm, --package-manager <package_manager>', 'choose package manager :').choices(['npm', 'yarn'])
    )
    .addOption(new Option('-pv, --phaser <phaser_version>', 'choose phaser version :').choices(['phaser-ce', 'phaser']))
    .action(async (project_name, option) => {
      let { template, phaser_version, package_manager } = option
      if (!project_name) {
        project_name = (
          await prompts({
            type: 'text',
            name: 'project_name',
            message: 'Project Name',
            initial: generate({ words: 3 }).dashed
          })
        ).project_name
      }
      if (!template) {
        template = (
          await prompts({
            type: 'select',
            name: 'template',
            message: 'Pick a template',
            choices: [
              { title: 'Javascript', value: 'javascript' },
              { title: 'Typescript', value: 'typescript' },
              { title: 'Empty', value: 'empty', description: 'Template without script and configuration' }
            ],
            initial: 0
          })
        ).template
      }
      if (!package_manager) {
        package_manager = (
          await prompts({
            type: 'select',
            name: 'pm',
            message: 'Pick a package manager',
            choices: [
              { title: 'NPM', value: 'npm' },
              { title: 'Yarn', value: 'yarn' }
            ],
            initial: 0
          })
        ).pm
      }

      if (!phaser_version) {
        phaser_version = (
          await prompts({
            type: 'select',
            name: 'phaser_version',
            message: 'Pick a phaser version',
            choices: [
              { title: 'Phaser 3', value: 'phaser' },
              { title: 'Phaser CE', value: 'phaser-ce' }
            ],
            initial: 0
          })
        ).phaser_version
      }

      await Tea(join(__dirname, `../src/templates/${template}`), resolve(project_name), { project_name })
      if (existsSync(resolve(project_name))) install_package(package_manager, phaser_version, resolve(project_name))
    })
  return cmd
}

async function install_package(package_manager: string, phaser_version: string, project_name: string) {
  const install_arg = package_manager === 'yarn' ? 'add' : 'install'

  const install = await spawn(package_manager, [install_arg], { stdio: [0, 1, 2], cwd: resolve(project_name) })
  install.stdout?.on('data', data => console.log(data))
  install.stderr?.on('data', data => console.log(data))
  install.on('error', error => console.log(error))

  const install_phaser = await spawn(package_manager, [install_arg, phaser_version], {
    stdio: [0, 1, 2],
    cwd: resolve(project_name)
  })
  install_phaser.stdout?.on('data', data => console.log(data))
  install_phaser.stderr?.on('data', data => console.log(data))
  install_phaser.on('error', error => console.log(error))
}

export default CreateProject
