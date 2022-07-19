import { Logger } from '@utils/Logger'
import generate from 'project-name-generator'
import prompts from 'prompts'

const log = Logger()

async function Prompt({ project_name, template, phaser_version, package_manager, no_install }: any) {
  const questions = [
    {
      type: () => (!project_name ? 'text' : null),
      name: 'pn',
      message: 'Project Name',
      initial: generate({ words: 3 }).dashed
    },
    {
      type: () => (!template ? 'select' : null),
      name: 'tpl',
      message: 'Pick a template',
      choices: [
        { title: 'Javascript', value: 'javascript' },
        { title: 'Typescript', value: 'typescript' },
        { title: 'Blank', value: 'blank', description: 'Template without script and configuration' }
      ],
      initial: 0
    },
    {
      type: () => (!no_install && !package_manager ? 'select' : null),
      name: 'pm',
      message: 'Pick a package manager',
      choices: [
        { title: 'Noone', value: 'noone', description: 'No package manager is chosen' },
        { title: 'NPM', value: 'npm', description: 'Run project with npm' },
        { title: 'Yarn', value: 'yarn', description: 'Run project with yarn' }
      ],
      initial: 0
    },
    {
      type: () => (!phaser_version ? 'select' : null),
      name: 'pv',
      message: 'Pick a phaser version',
      choices: [
        { title: 'Phaser 3', value: 'phaser' },
        { title: 'Phaser CE', value: 'phaser-ce' }
      ],
      initial: 0
    }
  ]

  const onCancel = (prompt: any) => {
    const name = {
      pn: 'project_name',
      tpl: 'template',
      pm: 'package_manager',
      pv: 'phaser_version'
    }
    log.error(`
You must specify a ${name[prompt.name]}:
  phaser-cli create <project_name> [--template] [--phaser-version] [--package-manager]
For Example:
  phaser-cli create ${
    generate({ words: 3 }).dashed
  } --template javascript --phaser-version phaser --package-manager yarn
    `)
    process.exit(1)
  }
  return prompts(questions, { onCancel })
}

export default Prompt
