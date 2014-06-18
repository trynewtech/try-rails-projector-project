var express = require('express');
var router = express.Router();

var _ = require('lodash');
var ProjectModel = function() { this.value = []; };

ProjectModel.prototype.create = function(name, ip, port) {
  var project = projects.find(name);
  if (project) {
    project.ip = ip;
    project.port = port;
  } else {
    this.value.push({name: name, ip: ip, port: port});
  }
};

ProjectModel.prototype.all = function() {
  return this.value || [];
};

ProjectModel.prototype.find = function(name) {
  return _(this.value).find(function(project) {
    return project.name === name;
  });
};

var projects = new ProjectModel();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', projects: projects.all() });
});

router.post('/', function(req, res) {
  projects.create(req.body.name, req._remoteAddress, req.body.port);
  res.redirect('/');
});

module.exports = router;
