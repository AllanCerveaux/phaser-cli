import { Command, Option } from 'commander'
import { join, resolve } from 'path'

import { Tea } from 'tea-parser'
import { __dirname } from '../utils'
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
    .addOption(new Option('-pv, --phaser <phaser_version>', 'choose phaser version :').choices(['phaser-ce', 'phaser']))
    .action(async (project_name, option) => {
      let { template, phaser_version } = option
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
              { title: 'Empty', value: 'empty', description: 'without all scripts' }
            ],
            initial: 0
          })
        ).template
      }
      await Tea(join(__dirname, `../src/templates/${template}`), resolve(project_name), { project_name })
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
        const install_phaser = await spawn(`npm`, ['install', phaser_version], {
          stdio: [0, 1, 2],
          cwd: resolve(project_name)
        })
        install_phaser.stdout?.on('data', data => console.log(data))
        install_phaser.stderr?.on('data', data => console.log(data))
        install_phaser.on('error', error => console.log(error))

        const install = await spawn(`npm`, ['install'], { stdio: [0, 1, 2], cwd: resolve(project_name) })
        install.stdout?.on('data', data => console.log(data))
        install.stderr?.on('data', data => console.log(data))
        install.on('error', error => console.log(error))
      }
    })
  return cmd
}

export default CreateProject
