import {confirm} from "@inquirer/prompts"
import chalk from "chalk"

const introMsg = `
${chalk.green('Create nginx directus site')}

--------------------------------------

This tool will walk you through adding a new site to the server.
Please ensure nginx, postgresql and docker are installed on this user profile.

Also ensure your domain dns points to your server ip address via A records.

Do you want to continue?
`

function addInputQuestion(msg, validateFn = null,)

const setupData = {
    projectName: {
        value
    }
}

async function initSite() {

    const shouldContinue = await confirm({message: introMsg}, {clearPromptOnDone: true})

    if (!shouldContinue) {
        console.log('Exiting')
        return
    }
}

export default initSite
