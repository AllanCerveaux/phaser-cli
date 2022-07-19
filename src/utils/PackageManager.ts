import { spawn } from 'child_process'

export function PackageManager(package_manager: string, args: string[], options?: { path: string | URL }): void {
  const install = spawn(package_manager, args, { stdio: [0, 1, 2], cwd: options?.path })
  install.stdout?.on('data', data => console.log(data))
  install.stderr?.on('data', data => console.log(data))
  install.on('error', error => console.log(error))
}
