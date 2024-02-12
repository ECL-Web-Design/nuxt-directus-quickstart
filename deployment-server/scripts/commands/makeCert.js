import {spawn} from "child_process"
import fs from "fs"

function makeCert() {

    console.log('Configuring certbot... \n')

    const siteListArgs = ['--nginx']

    fs
        .readdirSync('/etc/nginx/conf.d')
        .forEach(name => {
            if (name !== 'default.conf') {
                const nameParsed = name.replace('.conf', '')
                siteListArgs.push(`-d ${nameParsed}`)
                siteListArgs.push(`-d www.${nameParsed}`)
            }
        })

    const proc = spawn('certbot', siteListArgs,
                       {stdio: 'inherit', shell: true}
    )

    proc.on('exit', () => {
        console.log('\n Finished!')
    })

}

export default makeCert
