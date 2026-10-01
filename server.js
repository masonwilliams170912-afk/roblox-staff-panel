const express = require('express');
const cors = require('cors');
const app = express();

const STAFF_API_KEY = process.env.STAFF_API_KEY;
const WEB_KEY = process.env.WEB_KEY;
let commands = [];

app.use(cors());
app.use(express.json());

const checkRoblox = (req, res, next) => {
  if (req.headers.authorization !== `Bearer ${STAFF_API_KEY}`) {
    return res.status(403).json({error:"No access"});
  }
  next();
};

const checkWeb = (req, res, next) => {
  if (req.headers['x-web-key'] !== WEB_KEY) {
    return res.status(403).json({error:"Bad key"});
  }
  next();
};

app.get('/get-commands', checkRoblox, (req, res) => {
  res.json({commands});
  commands = [];
});

app.post('/send-cmd', checkWeb, (req, res) => {
  commands.push({id:Date.now(), ...req.body});
  res.json({ok:true});
});

app.listen(process.env.PORT||3000, ()=>console.log("✅ Online"));