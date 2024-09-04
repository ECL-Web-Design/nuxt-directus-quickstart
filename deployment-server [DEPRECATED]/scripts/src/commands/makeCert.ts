import {spawn} from "child_process"
import fs from "fs"
import * as readline from "readline"

const confDir = '/etc/nginx/conf.d'

async function getServerNamesFromFile(filename) {
    const fileStream = fs.createReadStream(filename)

    const rl = readline.createInterface({input: fileStream, crlfDelay: Infinity})

    let serverNames = []

    for await (const line of rl) {
        if (line.includes('server_name')) {
            const lineNames = line.replace('server_name', '').replace(';', '').trim().split(' ')

            serverNames.push(...lineNames)
        }
    }

    return serverNames
}

async function makeCert() {

    console.log('Configuring certbot... \n')

    const siteListArgs = ['--nginx']

    const files = fs.readdirSync(confDir)
    for (const file of files) {
        if (file !== 'default.conf') {
            const fullFile = `${confDir}/${file}`

            const names = await getServerNamesFromFile(fullFile)
            siteListArgs.push(...(names.map(val => '-d ' + val)))
        }
    }

    const siteArgsNoDupes = [...new Set(siteListArgs)]

    const proc = spawn('certbot', siteListArgs,
        {stdio: 'inherit', shell: true}
    )

    proc.on('exit', () => {
        console.log('\n Finished!')
    })

}

export default makeCert
