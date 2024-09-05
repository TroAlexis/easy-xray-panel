#!/bin/sh

if [ -z "$CDN_URL" ]; then
    ./ex.sh install <<-EOF
    Y
    $SERVER_IP
    Y
    9
    $WEBSITE_URL
    n
    Y
    S
EOF
else
    ./ex.sh install <<-EOF
    Y
    $CDN_URL
    $SERVER_IP
    Y
    9
    $WEBSITE_URL
    $GRPC_SERVICE_NAME
    n
    Y
    S
EOF
fi
