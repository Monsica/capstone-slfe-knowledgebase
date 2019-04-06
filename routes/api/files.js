const express = require('express');
const aws = require('aws-sdk');
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const uuidv1 = require('uuid/v1');


router.post('/upload', upload.single('file'), (req, res)=>{
    const s3 = new aws.S3();
    let fileName, fileType, fileExtension, fileBuffer;
    fileExtension = req.file.originalname.split('.').pop();
    fileName = uuidv1() + "." + fileExtension;
    fileType = req.file.mimetype;
    fileBuffer = req.file.buffer;

    let s3Params = {
      Bucket: req.app.locals.S3_BUCKET_NAME,
      Body: fileBuffer,
      Key: fileName,
      ContentType: fileType
    };

    s3.putObject(s3Params, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          success: false
        });
      }
  
      res.json({
        success: true,
        url: 'https://' + 's3-' + req.app.locals.S3_BUCKET_REGION + '.amazonaws.com/' + req.app.locals.S3_BUCKET_NAME + '/' + fileName
      })
    });
  });

  router.delete('/delete_file', (req, res) => {
    res.json({
        success: false,
        message: 'Not implemented yet.'
    })
  });

  module.exports = router;