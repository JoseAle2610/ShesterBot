#! /bin/bash
server=("210" "214" "215" "216" "228" "231" "249" "251")
for server in "${server[@]}"
do
    echo "---------------- $server ----------------"
    ping -c 2 172.20.0.$server > /dev/null 2>&1
    err=$?
    if [ $err -eq 1 ]; then
        echo "Host Down"
    else
        ssh $server /home/xenserver/checkBackup.sh
    fi
done