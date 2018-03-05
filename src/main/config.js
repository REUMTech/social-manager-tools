import { readFile, writeFile } from 'fs-extra-p'
import { readFileSync, writeFileSync } from 'fs'
import {EventEmitter} from 'events'
import Rx from 'rxjs'

export function Config() {
  const eventEmitter = new EventEmitter()
  const saves = Rx.Observable.from(eventEmitter, 'save')

  this.saves = saves

  this.read = () => {
    return readFile('config.json', 'utf8').then((data) => {
      data = JSON.parse(data)
      data.password = Buffer.from(data.password).toString()
      return data
    })
  }

  this.readSync = () => {
    let data = readFileSync('config.json', 'utf8')
    data = JSON.parse(data)
    data.password = Buffer.from(data.password).toString()
    return data
  }

  this.writeSync = (config) => {
    config.password = Buffer.from(config.password).toString('base64')
    writeFileSync('config.json', JSON.stringify(config, null, 2), 'utf8')
    eventEmitter.emit('save', config)
  }

  this.write = (config) => {
    config.password = Buffer.from(config.password).toString('base64')
    return writeFile('config.json', JSON.stringify(config, null, 2), 'utf8').then(() => {
      eventEmitter.emit('save', config)
    })
  }
}
