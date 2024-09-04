import {spawn} from "child_process"

export default function createPgDb(name, password) {

    console.log('Getting postgres user id...')

    const idProcess = spawn('id -u postgres', {shell: true})

    idProcess.on('error', (err) => {
        console.log('Could not get postgres user id:\n')
        console.log(err.message)
    })

    idProcess.stdout.on('data', (data) => {

        console.log(`got user id: ${data}`)
        const postgresId = parseInt(data)

        if (!isNaN(postgresId)) {
            const process = spawn(
                `psql -c 'CREATE DATABASE ${name};' -c "CREATE USER ${name} WITH PASSWORD '${password}';" -c 'GRANT ALL PRIVILEGES ON DATABASE ${name} TO ${name};'`,
                {stdio: 'inherit', shell: true, uid: postgresId}
            )

            process.on('error', (err) => {
                console.log('Could not create database\n')
                console.log(err.message)
            })

            process.on('exit', () => {
                console.log(`\n Created new Database! \nDB: ${name} \nOwner: ${name}`)
            })
        } else {
            console.log('Invalid user Id')
        }
    })
}
