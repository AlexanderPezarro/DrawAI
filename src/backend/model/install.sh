#!/bin/bash
# NB: works on Python 3.12.4

if [ ! `command -v python3` ]; then
    echo "python3 not installed, installing..."
	sudo dnf install -y python3
fi

sudo dnf install -y python3-devel
python3 -m venv venv
source venv/bin/activate
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
deactivate

