const express = require("express");
var AWS = require("aws-sdk");
const { Readable } = require("stream");

const app = express();
const PORT = process.env.PORT || 3000;

AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: "AKIA24PWF4ENLMFIN7WZ",
  secretAccessKey: "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",
});

var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });

var queueURL = "https://sqs.ap-southeast-1.amazonaws.com/748377465114/Kcahtod";

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

let returnedData = {};

sqs.receiveMessage(params, function (err, data) {
  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {
    returnedData = data.Messages[0];
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    sqs.deleteMessage(deleteParams, function (err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});

if (returnedData) {
  console.log("Message received,", returnedData.Body);
  const s = new Readable();
  s.push(returnedData.Body);
  s.push(null);

  var uploadParams = {
    Bucket: "gscleandatabucket",
    Key: "testData.json",
    Body: s,
  };

  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else if (data) {
      console.log("Upload Success", data.Location);
    }
  });
}

app.get("/", (req, res) => {
  if (returnedData) {
    res.send("Returned Data " + returnedData.Body);
  } else {
    res.send("Nothing in the queue");
  }
});
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
