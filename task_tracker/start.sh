#!/bin/bash

export PORT=5300

cd ~/www/tracker
./bin/task_tracker stop || true
./bin/task_tracker start

