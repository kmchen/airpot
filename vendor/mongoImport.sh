#!/bin/sh
SERVICE='mongod'

for i in {1..10}
do
  if ps ax | grep -v grep | grep $SERVICE > /dev/null
  then
    echo "$SERVICE service running, everything is fine"
    exit;
  else
    echo "$SERVICE is not running"
    sleep 2
  fi
done
echo "***** Fail to Start mongodb *****"
