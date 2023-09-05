const compiler = "ts-node";
const infile = "Node.ts";
const fs = require('fs')
const { exec } = require("child_process");
const sf = require('../js/saveFile')



const nodeExecute = (code, args) => {
    // console.log(args)
    return new Promise((resolve, reject) => {
        sf.saveFile(infile, code)
            .then(() => {
                sf.saveFile('input.txt', args)
                    .then((err) => {
                        if (err) {
                            console.log("error")
                            reject()
                        } else {
                            exec(`ts-node ${infile} < input.txt`, (err, stdout, stderr) => {
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
                        }
                    })
            })
            .catch(() => {
                console.log("ERROR SAVE FILE")
                const err = {
                    err: true,
                    output: "Internal Server Error!"
                }
                resolve(err)
            })
    })
}

module.exports = {
    nodeExecute,
    infile
}