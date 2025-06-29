#!/usr/bin/env bash
# 1. Install main packages
pip install -r requirements.txt

# 2. Install linter and type checker
pip install flake8 black pyright

# 3. (Optional) Persist any exports
echo 'export PYTHONPATH="$PWD"' >> ~/.bashrc
