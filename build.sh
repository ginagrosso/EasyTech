#!/bin/bash
cd EasyTech
pip install -r requirements.txt
python3 manage.py collectstatic --noinput
