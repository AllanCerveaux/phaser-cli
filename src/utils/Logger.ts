import colors from 'colors'

const base = {
  info: ['bgCyan', 'bold'],
  warn: ['bgYellow', 'bold'],
  success: ['bgGreen', 'bold'],
  error: ['bgRed', 'bold']
}

export function Logger(theme: any = base) {
  colors.setTheme(theme)

  const log = {
    success: (str: any) => console.log('SUCCESS'.success, str.green),
    error: (str: any) => console.log('ERROR'.error, str.red),
    info: (str: any) => console.log('INFO'.info, str.cyan),
    warn: (str: any) => console.log('WARN'.warn, str.yellow)
  }

  return log
}
