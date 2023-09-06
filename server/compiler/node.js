const compiler = "ts-node";
const infile = "Node.ts";
const fs = require('fs')
const { exec } = require("child_process");
const sf = require('../js/saveFile')



const nodeExecute = (code, args) => {
    // console.log(args)
    return new Promise((resolve, reject) => {
        const iife = `(${code})(${args})`
        exec(`ts-node -p -e '${iife}'`, (err, stdout, stderr) => {
            if (err) {
                console.log("ERROR " + err)
                resolve({
                    err: true,
                    output: err,
                    error: stderr
                })
            }

            console.log("OUTPUT ", stdout)
            resolve(stdout)
        })
    })
}

module.exports = {
    nodeExecute,
    infile
}