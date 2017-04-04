var Sequelize = require('sequelize');
//var myDb = 'postgresql://localhost:5432/1234/social_network_example';
var sequelize = new Sequelize('obqa_development_db', 'username', 'password',{
  host:'127.0.0.1',
  dialect:'postgres'
});

module.exports = sequelize;
