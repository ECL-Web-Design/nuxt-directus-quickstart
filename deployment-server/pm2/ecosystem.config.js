//

module.exports = {
    apps: [
        {
            name: "app-name",
            // The port the server is listening on, point to this port in the nginx conf file.
            // Make sure each port is unique, including the cms ports, which are set separately via docker-compose.yml
            port: 8000,
            script: "/path/to/server/script.js",
            //put watched files and directories here, relative to the script file location.
            // the server will then refresh when it detects changes.
            watch: [],
            watch_delay: 1000,
            // If this is not set then it defaults to the location of this file.
            cwd: '/path/to/server/dir/'
        }
        //create more apps using the same format as above.
    ]
}
