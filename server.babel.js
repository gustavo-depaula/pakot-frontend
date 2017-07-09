import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import apicache from 'apicache';
import redis from 'redis';
import responseTime from 'response-time';
import morgan from 'morgan';
//import keys from './keys';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});


app.listen(process.env.PORT || 3000);