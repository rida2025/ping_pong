#!/bin/bash


cd api
# Create a new virtual environment
echo "Creating virtual environment..."
python3 -m  venv env

# Activate the virtual environment
echo "Activating virtual environment..."
source env/bin/activate

pip uninstall -r requirements.txt
