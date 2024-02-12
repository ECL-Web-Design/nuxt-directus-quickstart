# PM2 Setup

Use the ecosystem.config.js file if you are intending on running your server instances with PM2.

This is recommended as PM2 offers automatic restarting and server clusters out the box, as well as the ability to manage
all your servers from one file.

## Initial steps

Make sure npm and PM2 are installed globally on the server.

```npm install pm2 -g```

See the docs for detailed information:

https://www.npmjs.com/package/pm2

## Creating a server app

Use the ecosystem.config.js file to create your server apps, which can all be managed from one location.

## Starting all apps

To start all apps run:

```pm2 start <path/to/ecosystem.config.js>```

## List all apps

```pm2 ls```

## Stop all apps

```pm2 stop all```

## Restart all apps

```pm2 restart all```

## Targeting specific apps

Commands can be run on specific app instances by using the app name, eg.

```pm2 stop <app-name>```

## Deleting apps from pm2 management

```pm2 delete <app-name | 'all'>```
