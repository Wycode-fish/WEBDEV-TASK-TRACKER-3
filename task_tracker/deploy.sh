#!/bin/bash

export PORT=5300
export MIX_ENV=prod
export GIT_PATH=/home/eason/src/task_tracker

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "eason" ]; then
	echo "Error: must run as user 'eason'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/tracker ]; then
	echo mv ~/www/tracker ~/old/$NOW
	mv ~/www/tracker ~/old/$NOW
fi

mkdir -p ~/www/tracker
REL_TAR=~/src/task_tracker/_build/prod/rel/task_tracker/releases/0.0.1/task_tracker.tar.gz
(cd ~/www/tracker && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/eason/src/task_tracker/start.sh
CRONTAB

#. start.sh
