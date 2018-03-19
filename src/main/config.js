import { readFile, writeFile } from 'fs-extra-p'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import {EventEmitter} from 'events'
import Rx from 'rxjs'

export function Config () {
  const eventEmitter = new EventEmitter()
  const changes = Rx.Observable.fromEvent(eventEmitter, 'change')

  this.changes = changes

  if (!existsSync('config.json')) {
    writeFileSync('config.json', JSON.stringify({
      username: '',
      password: '',
      hashtags: [],
      mode: 'likemode_classic',
      showChrome: true
    }, null, 2), 'utf8')
  }

  this.read = () => {
    return readFile('config.json', 'utf8').then((data) => {
      data = JSON.parse(data)
      data.password = Buffer.from(data.password, 'base64').toString()
      return data
    })
  }

  this.readSync = () => {
    let data = readFileSync('config.json', 'utf8')
    data = JSON.parse(data)
    data.password = Buffer.from(data.password, 'base64').toString()
    return data
  }

  this.writeSync = (config) => {
    let clear = config.password
    config.password = Buffer.from(config.password).toString('base64')
    writeFileSync('config.json', JSON.stringify(config, null, 2), 'utf8')
    config.password = clear
    eventEmitter.emit('change', config)
  }

  this.write = (config) => {
    let clear = config.password
    config.password = Buffer.from(config.password).toString('base64')
    writeFile('config.json', JSON.stringify(config, null, 2), 'utf8').then(() => {
      config.password = clear
      eventEmitter.emit('change', config)
    })
  }
}
