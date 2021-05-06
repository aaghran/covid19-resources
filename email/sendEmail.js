// import dotenv
require("dotenv").config();
// import AWS SDK
const AWS = require("aws-sdk");
const SESConfig = {
  apiVersion: "2010-12-01",
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};

exports.sendEmail = function (toAddresses, body, subject) {
  // Amazon SES configuration

  var params = {
    Source: "aaghran@gmail.com",
    Destination: {
      BccAddresses: toAddresses,
    },
    ReplyToAddresses: ["aaghran@gmail.com"],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };

  console.info("send email ", subject);
  console.info("send email to", toAddresses.toString());

  new AWS.SES(SESConfig)
    .sendEmail(params)
    .promise()
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
