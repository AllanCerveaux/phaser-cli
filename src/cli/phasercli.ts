import { description, name, version } from '../../package.json'

import { Command } from 'commander'
import CreateProject from './commands/create-project'

export const program = new Command()

const phasercli = program.name(name).description(description).version(version)

phasercli.addCommand(CreateProject())

export default phasercli
