/* global require process */

/**
  *const cowsay = require('cowsay')
  *  const quotes = [
  *    "The only way to do great work is to love what you do. - Steve Jobs",
  *    "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
  *    "Believe you can and you're halfway there. - Theodore Roosevelt",
  *    "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
  *    "The best way to predict your future is to create it. - Abraham Lincoln",
  *    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  *    "You can never be ready. - Cook"
  *  ]
  *
  *  const randomIndex = Math.floor(Math.random() * quotes.length)
  *
  *  const opts = {
  *      text: quotes[randomIndex],
  *      e: '^^',
  *      r: true,
  *  }
  *
  *  console.log(cowsay.say(opts))
  *  
 */ 

  const figlet = require("figlet")
  const { loadEnv } = require('vite')
  const mode = process.env.NODE_ENV || 'development'
  const {  VITE_APP_BUILD_OUTPUTDIR, VITE_APP_BUILD_IDENTIFY } = loadEnv(mode, process.cwd())
  const OUTPUTDIR = `${VITE_APP_BUILD_IDENTIFY}${VITE_APP_BUILD_OUTPUTDIR}`
  const { name, version, author, description } = require("../package.json")


  const art = figlet.textSync(name.replace('-', '  '), { font: 'Standard', horizontalLayout: 'full' })
  const lines = art.split('\n')
  const centeredArt = lines.map(function(line) {
    const diff = Math.floor((process.stdout.columns - line.length) / 2)
    return ' '.repeat(diff > 0 ? diff : 0) + line
  }).join('\n')

  const f = ['The', name, 'Version', version, 'ESM', 'and', 'CJS', 'Standard']

  const isBuild = process.argv[2]
  !isBuild && f.push(...['upload', 'success'])

  const s = f.map(s => '='.repeat(s.length))

  const tg = !isBuild ? 'upload time' : 'end time'

  const banner = `${f.join(' ')}\n${s.join(' ')}\n${description}\nbuild source is located in root/${OUTPUTDIR}\n${tg}:${getCurrentTime()} author: ${author}`
  const descWidth = process.stdout.columns - 4
  const descRegex = new RegExp(`.{1,${descWidth}}`, 'g')
  const descLines = banner.match(descRegex)
  const centeredDesc = descLines.map(function(line) {
    const lineDiff = Math.floor((process.stdout.columns - line.length) / 2)
    return ' '.repeat(lineDiff > 0 ? lineDiff : 0) + line
  }).join('\n')

  console.log(centeredArt + '\n\n' + centeredDesc)

function getCurrentTime() {

  const now = new Date()
  
  const currentYear = now.getFullYear()
  
  const currentMonth = now.getMonth() + 1
  
  const currentDate = now.getDate()
  
  const currentHour = now.getHours()
  
  const currentMinute = now.getMinutes()
  
  const currentSecond = now.getSeconds()
  
  return `${currentYear}-${currentMonth}-${currentDate} ${currentHour}:${currentMinute}:${currentSecond}`
}