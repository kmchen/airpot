
var mongod_ip = process.env['MONGOD_IP'];

module.exports =  {
  mongo: {
    endpoint: "mongodb://" + mongod_ip+"/airport"
  }
};
