const  express = require('express');
const aws = require('aws-sdk');
const  mongoose = require('mongoose');
const  bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const port = process.env.PORT || 5000;

const enterprises = require('./routes/api/enterprises');
const domains = require('./routes/api/domains');
const users = require('./routes/api/users');
const files = require('./routes/api/files');

const app = express();

// activate configuration variable
dotenv.config();

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

//Connect to Mongo
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to db...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/enterprises', enterprises);
app.use('/api/domains', domains);
app.use('/api/users', users);
app.use('/api/files', files);

// AWS config
aws.config.region = process.env.S3_BUCKET_REGION
aws.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID
aws.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

app.locals.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
app.locals.S3_BUCKET_REGION = process.env.S3_BUCKET_REGION

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
