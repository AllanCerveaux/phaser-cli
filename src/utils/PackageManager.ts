import { Logger } from './Logger'
import { spawn } from 'child_process'

const log = Logger()

export function PackageManager(package_manager: string, args: string[], options?: { path: string | URL }): void {
  const install = spawn(package_manager, args, { stdio: [0, 1, 2], cwd: options?.path })
  install.stdout?.on('data', data => log.info(data))
  install.stderr?.on('data', data => log.error(data))
  install.on('error', error => log.error(error))
}
