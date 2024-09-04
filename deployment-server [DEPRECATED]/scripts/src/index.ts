#!/usr/bin/env node

import {Command} from "commander"
import makeCert from "./commands/makeCert.js"
import initPostgres from "./commands/initPostgres.js"
import createPgDb from "./commands/createPgDb.js"


const program = new Command()

program.command("make-cert")
    .description("auto certbot configuration from /etc/nginx/conf.d")
    .action(makeCert)

program.command('init-postgres')
    .description('install and start postgresql on the server')
    .action(initPostgres)

program.command('create-pg-db <name> <password>')
    .action(createPgDb)

program.parse(process.argv)
