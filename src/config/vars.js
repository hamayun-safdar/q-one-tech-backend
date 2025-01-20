require('dotenv').config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  base_url: process.env.BASE_URL,
  application_name: process.env.APPLICATION_NAME,
  frontEncSecret: process.env.FRONT_ENC_SECRET,
};
