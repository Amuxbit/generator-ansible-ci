'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({

  options: {},

  initializing: function () {
    this.pkg = require('../package.json');
  },

  askForOwner: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Ansible CI/Docker Playbook Generator')
    ));

    var prompts = [
    {
      type: 'input',
      name: 'playbookOwner',
      message: 'Who is the owner of the Dockerfile? (i.e. owner/Dockerfile-name)',
      default: 'ExampleOwner'
    }
    ];

    this.prompt(prompts, function (props) {
      this.options.playbookOwner = props.playbookOwner.toLowerCase();
      done();
    }.bind(this));
  },

  askForEmail: function () {
    var done = this.async();

    var prompts = [
    {
      type: 'input',
      name: 'playbookOwnerEmail',
      message: "What is the owner's email for this docker playbook?",
      default: this.options.playbookOwner + '@example.com'
    },
    ];

    this.prompt(prompts, function (props) {
      this.options.playbookOwnerEmail = props.playbookOwnerEmail;
      done();
    }.bind(this));
  },

  askForPlaybookName: function () {
    var done = this.async();

    var prompts = [
    {
      type: 'input',
      name: 'playbookName',
      message: 'What is the name for this Dockerfile (i.e. Owner/Dockerfile-name)?',
      default: 'ExamplePlaybook'
    },
    ];

    this.prompt(prompts, function (props) {
      this.options.playbookName = props.playbookName.toLowerCase();
      done();
    }.bind(this));
  },

  askForPlaybookdata: function () {
    var done = this.async();

    var prompts = [
    {
      type: 'input',
      name: 'playbookVersionTag',
      message: 'What is the version tag for this docker playbook (i.e. latest)?',
      default: 'latest'
    },
    {
      type: 'input',
      name: 'playbookVersion',
      message: 'What should the version for the Dockerfile ?',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'playbookRepo',
      message: 'What is the repo for this docker playbook?',
      default: 'https://github.com/' + this.options.playbookOwner + '/' + this.options.playbookName
    },
    {
      type: 'input',
      name: 'playbookDesc',
      message: 'What should the description be for this docker playbook?',
      default: 'This Dockerfile provides...'
    },
    {
      type: 'confirm',
      name: 'addBuildScript',
      message: 'Would you like me to add the bash build script (it will make life easier)?',
      default: true
    },
    {
      type: 'confirm',
      name: 'detectTravisCi',
      message: 'Will this playbook have issues with travis-ci and require to detect it?',
      default: false
    }
    ];

    this.prompt(prompts, function (props) {
      this.options.playbookVersionTag = props.playbookVersionTag.toLowerCase();
      this.options.playbookVersion = props.playbookVersion;
      this.options.playbookRepo = props.playbookRepo;
      this.options.playbookDesc = props.playbookDesc;
      this.options.generatorTag = 'Created via Ansible CI/Docker Playbook Generator';
      this.options.addBuildScript = props.addBuildScript;
      this.options.detectTravisCi = props.detectTravisCi;

      done();
    }.bind(this));
  },

  writing: {
    ciFiles: function() {
      this.fs.copyTpl(
        this.templatePath('travis.yml'),
        this.destinationPath('.travis.yml'),
        this.options
      );

      this.fs.copyTpl(
        this.templatePath('ci'),
        this.destinationPath('ci'),
        this.options
      );

      if (this.options.detectTravisCi) {
        this.fs.copyTpl(
          this.templatePath('ci-travis/travis.yml'),
          this.destinationPath('.travis.yml'),
          this.options
        )
      }
    },
    dockerfile: function() {
      this.fs.copyTpl(
        this.templatePath('Dockerfile'),
        this.destinationPath('Dockerfile'),
        this.options
      );
    },
    buildScript: function() {
      if (this.options.addBuildScript) {
        this.fs.copyTpl(
          this.templatePath('build.sh'),
          this.destinationPath('build.sh'),
          this.options
        );
      }
    }
  },

  install: function () {
    this.log('No further dependencies required.');
  }
});
