#!/usr/bin/env bash
set -e

host="$1"
shift
cmd="$@"

echo " Waiting for $host..."

until nc -z $(echo "$host" | cut -d: -f1) $(echo "$host" | cut -d: -f2); do
  >&2 echo " $host is unavailable - sleeping"
  sleep 1
done

>&2 echo " $host is up - executing command"
exec $cmd
