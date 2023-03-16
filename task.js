const fs = require('fs')
const crypto = require('crypto')

const path1 = 'crypto2/password.txt'
const password1 = 'abrakadabra505050505404'
const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)
fs.writeFileSync(path1, password1)

function encryptPass(path, password){
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(password, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    fs.writeFileSync(path, encrypted)
}

function decryptPass(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        const decipher = crypto.createDecipheriv(algorithm, key, iv)
        let decrypted = decipher.update(data, "hex", "utf-8")

        fs.writeFile(path, decrypted, (err, data) => {
            if(err) throw err
        })
    }) 
}

encryptPass(path1, password1)
decryptPass(path1)