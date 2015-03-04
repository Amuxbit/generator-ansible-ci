'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('ansible-template:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'Dockerfile',
      '.travis.yml',
      'ci/inventory',
      'ci/playbook.yml',
      'ci/tests.yml'
    ]);

    assert.fileContent('Dockerfile', /Created via Ansible CI\/Docker Playbook Generator/);

  });
});
