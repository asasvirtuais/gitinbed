import { Logger, ILogObj, ISettingsParam } from 'tslog'

const debug = process.argv.slice(2).find(arg => arg.startsWith('--debug')) || process.env.NODE_ENV !== 'production'

class CustomLogger extends Logger<ILogObj> {
  constructor(settings?: ISettingsParam<ILogObj>) {
    super(settings)
  }

  sillier<T>(whatever: T, ...args: any[]): T {
    super.silly(whatever, ...args)
    return whatever
  }
}

const logger = new CustomLogger({ minLevel: debug ? 0 : 3 })

declare global {
  var logger: CustomLogger
}

global.logger = logger

export default logger