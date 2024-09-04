import {spawn} from "child_process"

function initPostgres() {
    const process = spawn('sudo apt-get install postgresql && sudo systemctl start postgresql', {
        shell: true,
        stdio: 'inherit'
    })

    process.on('exit', () => {
        console.log('\n Postgres installed!')
    })
}

export default initPostgres
