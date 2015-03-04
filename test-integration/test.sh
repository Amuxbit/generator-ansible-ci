#!/bin/bash

# == vars ==
TEST_PLAYBOOK=test-playbook
NODE_MODULES=$TEST_PLAYBOOK/node_modules

echo "Preparing integration test..."

# == cleanup ==
# local template target, keep this clean on each run
if [ -e $TEST_PLAYBOOK ]; then
  rm -R $TEST_PLAYBOOK
fi;

mkdir -p $NODE_MODULES

# == install ==
# the integration local install
echo "Installing generator for integration test..."

cd $TEST_PLAYBOOK

echo "{}" > .yo-rc.json
cp ../package.json package.json

npm install ../../

# == run ==
# running the generator
echo "Running yo ansible-ci..."

pwd

ls -la

# node ../$NODE_MODULES/yo/cli.js ansible-ci $TEST_PLAYBOOK
npm test
