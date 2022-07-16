import { Command, Option } from 'commander'
import { join, resolve } from 'path'

import { Tea } from 'tea-parser'
import { __dirname } from '../utils'
import generate from 'project-name-generator'
import prompts from 'prompts'

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
    .action(async (project_name, option) => {
      let { template } = option
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
              { title: 'Empty', value: 'empty' }
            ],
            initial: 0
          })
        ).template
      }
      Tea(join(__dirname, `../src/templates/${template}`), resolve(project_name), { project_name })
    })
  return cmd
}

export default CreateProject
