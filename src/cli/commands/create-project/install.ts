import { commandExist } from '../../../utils'
import { existsSync } from 'fs'
import { resolve } from 'path'
import { spawn } from 'child_process'

async function install(package_manager: string, phaser_version: string, project_name: string) {
  if (!existsSync(project_name) && (await commandExist(package_manager)))
    console.log(`Install package automatically has failed, try run '${package_manager} install' manually`)
  const install_arg = package_manager === 'yarn' ? 'add' : 'install'

  const install = await spawn(package_manager, ['install'], { stdio: [0, 1, 2], cwd: resolve(project_name) })
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

export default install
