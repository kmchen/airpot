
var mongod_ip = process.env['MONGOD_IP'];

module.exports =  {
  port: process.env.port || 8080,
  mongo: {
    endpoint: "mongodb://" + mongod_ip+"/airport"
  }
};
