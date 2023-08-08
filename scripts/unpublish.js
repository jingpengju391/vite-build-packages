/* global require */
const { exec } = require('child_process')
const { name } = require('../package.json')

exec(`npm unpublish ${name} --force`, (err, stdout) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(stdout)
})
