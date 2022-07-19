import { Command, Option } from 'commander'
import { join, resolve } from 'path'

import { Logger } from '@utils/Logger'
import Prompt from './prompt'
import { Tea } from 'tea-parser'
import { __dirname } from '@utils/_path'
import { existsSync } from 'fs'
import install from './install'

const log = Logger()

function CreateProject() {
  const cmd = new Command('create')
  cmd
    .argument('[project_name]', 'Name of project')
    .addOption(
      new Option('-t, --template <template>', 'choose the template you want :').choices([
        'typescript',
        'javascript',
        'blank'
      ])
    )
    .addOption(
      new Option('-pm, --package_manager <package_manager>', 'choose package manager :').choices([
        'npm',
        'yarn',
        'none'
      ])
    )
    .addOption(
      new Option('-pv, --phaser_version <phaser_version>', 'choose phaser version :').choices(['phaser-ce', 'phaser'])
    )
    .addOption(new Option('-ni, --no_install', 'Do not run package manager installation.'))
    .action(async (project_name, option) => {
      let { template, phaser_version, package_manager, no_install } = option
      const { pn, pv, pm, tpl } = await Prompt({ project_name, template, phaser_version, package_manager, no_install })

      if (existsSync(project_name || pn)) {
        log.error(`Folder '${project_name || pn}' exist, try again with another project name!`)
        process.exit(1)
      }

      await Tea(join(__dirname, `../src/templates/project/${template || tpl}`), resolve(project_name || pn), {
        project_name: project_name || pn
      })

      if ((pm !== 'noone' && pm !== undefined) || !no_install) {
        log.info(`Run install package with ${package_manager || pm}`)
        await install(package_manager || pm, phaser_version || pv, resolve(project_name || pn))
      }
    })
  return cmd
}

export default CreateProject
