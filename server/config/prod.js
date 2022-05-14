// When running in a deployment environment (AWS, Heroku...)
module.exports = {
  mongoURI: process.env.MONGO_URI,
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD,
};
