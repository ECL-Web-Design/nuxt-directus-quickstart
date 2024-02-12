#!/usr/bin/env node

import {Command} from "commander"
import makeCert from "../commands/makeCert.js"

const program = new Command()

program
    .command("make-cert")
    .description("auto certbot configuration from /etc/nginx/conf.d")
    .action(makeCert)

program.parse(process.argv)
