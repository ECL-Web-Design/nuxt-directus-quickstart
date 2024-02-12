# NGINX Server Block Config

Must have a running nginx server, see example/nginx.conf for example setup file

# .conf file

Rename the conf file to the full name of your site domain, .com, .co.uk, etc. included

There is a conf file for both the main site and the cms, the seperate cms file is for if you want a subdomain to point
to the cms.

If you want a sub directory instead, eg. site.com/admin, then you can delete the cms conf and set up a redirect in the
main conf file.

Make sure the redirect port is the same as the directus open port

# After Renaming

Run `node script-manager make-cert` on the server to make sure the https certificate is generated, must setup cert bot
before this

script-manager is found in /server/scripts
