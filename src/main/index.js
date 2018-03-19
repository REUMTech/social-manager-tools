'use strict'

import { app, BrowserWindow } from 'electron'
import {InstagramBotLib} from 'instagrambotlib'
import {Config} from './config'

function initBot (config) {
  const botConfig = {
    // InstagramBot.js Configs
    'debug': true,
    // BOT Configs
    // [WORK] likemode_classic - select random hashtag from config list and like 1 random photo (of last 20) | 400-600 like/day.
    // [WORK] likemode_realistic - select random hashtag from config list, like fast 10-12 photo and sleep 15-20min. Sleep at night
    // [TODO] likemode_superlike - select random hashtag from config list and like 3 random photo of same user | 400-600 like/day.
    // [TODO] fdfmode_classic - follow user from random hashtag and defollow after 1h | 300 follow-defollow/day.
    // [TODO] fdfmode_defollowall - defollow all your following (not defollow users in whitelist) | 90 defollow/hour.
    'bot_mode': config.mode,
    'bot_likeday_min': 400,
    'bot_likeday_max': 600, // in 2018 limit instagram is descreased to 400-600/day :(
    'bot_sleep_night': '7:00', // sleep from 00:00 to 7:00 am, work only in likemode_realistic
    'bot_fastlike_min': '15', // min minutes of sleep after like 10-12 photo, work only in likemode_realistic
    'bot_fastlike_max': '20', // max minutes of sleep after like 10-12 photo, work only in likemode_realistic

    // Instagram Account
    'instagram_username': config.username, // without @
    'instagram_password': config.password,
    'instagram_hashtag': config.hashtags, // without #
    'instagram_pin': 'sms', // method to receive pin (email or sms)
    'instagram_userwhitelist': [''], // without @

    // Puppeteer configs
    'chrome_headless': !config.showChrome,
    'chrome_options': ['--disable-gpu', '--no-sandbox', '--window-size=1920x1080']
  }

  return new InstagramBotLib(botConfig)
}

const config = new Config()
config.changes.subscribe((savedConfig) => {
  global.bot.stop_bot()
  global.bot = initBot(savedConfig)
})

const configData = config.readSync()
global.bot = initBot(configData)
global.config = config

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.setMenu(null)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  global.bot.stop_bot()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
