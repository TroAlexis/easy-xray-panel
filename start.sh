#!/bin/bash
# Start xray process
xray run -c /easy-xray/conf/config_server.json &

# Start api server
cd /server || exit
npm run start:"$MODE"
