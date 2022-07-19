import { PackageManager } from '@utils/PackageManager'
import { commandExist } from '@utils/commandExist'
import { existsSync } from 'fs'

async function install(package_manager: string, phaser_version: string, project_path: string) {
  if (!existsSync(project_path) && (await commandExist(package_manager))) {
    console.log(`Install package automatically has failed, try run '${package_manager} install' manually`)
    return
  }

  const install_arg = package_manager === 'yarn' ? 'add' : 'install'
  await PackageManager(package_manager, ['install'], { path: project_path })
  await PackageManager(package_manager, [install_arg, phaser_version], { path: project_path })
}

export default install
