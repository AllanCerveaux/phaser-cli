import path, { dirname } from 'path'

import { access } from 'fs/promises'
import { fileURLToPath } from 'url'
import { spawn } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function commandExist(cmd: string): Promise<boolean | { err: string }> {
  const isWin = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys'
  const which = isWin ? 'where' : 'which'
  const which_cmd = spawn(which, [cmd])
  let out = ''
  let err = ''
  which_cmd.stdout.on('data', data => (out += data))
  which_cmd.stderr.on('error', error => (err += error))
  return new Promise((resolve, reject) => {
    if (err) reject({ err: err.trim() })
    which_cmd.on('close', (code: number) => {
      if (code === 0) {
        try {
          access(path.resolve(out.trim()))
          resolve(true)
        } catch {
          reject({ err: "Can't access to program" })
        }
      }
      resolve(false)
      return
    })
  })
}

export { __filename, __dirname, commandExist }
