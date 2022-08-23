const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
import utils from "@src/services/utils.mjs";

import nextConnect from "next-connect";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "guilds-assets",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    utils.logError(error, ["service-api", "upload-asset"], {
      requestQuery: req.query,
      requestBody: req.body,
      url: req.url,
    });
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
const upload = fileUpload.single("file-asset");

apiRoute.post((req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      //TODO log
      console.log(err);
      return res.status(500).json({ error: "upload error" });
    } else if (err) {
      //TODO log
      console.log(err);
      return res.status(500).json({ error: "upload error" });
    }

    res.status(200).json({ data: { fileLocation: req.file.location } });
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
