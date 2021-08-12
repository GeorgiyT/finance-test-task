'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');
const fs = require('fs/promises')
const path = require('path')


const FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;
const TICKERS = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];
const DEFAULT_SETTINGS = {
  tickersList: TICKERS,
  tickersListToShow: TICKERS,
  interval: FETCH_INTERVAL,
  theme: "white"
}

let settings = DEFAULT_SETTINGS;

const settingsPath = path.join(__dirname, 'settings.json');

const readSettings = async () => {
  try {
    return JSON.parse(await fs.readFile(settingsPath, 'utf8'));
  } catch (error) {
    console.log(error.message);
    writeSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }
}

const writeSettings = async body => {
  try {
    fs.writeFile(settingsPath, JSON.stringify(body));
    return body
  } catch (error) {
    console.log(error.message);
  }
}

readSettings().then(data => settings = data).catch(err => {
  settings = DEFAULT_SETTINGS;
  console.log(err.message)
});


function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {

  const quotes = settings.tickersList.map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate().toLocaleString('ru'),
  }));

  socket.emit('ticker', quotes);
}

const trackTickers = (socket, iterval) => {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const timer = setInterval(function () {
    getQuotes(socket);
  }, iterval);

  socket.on('disconnect', function () {
    console.log("Disconnected")
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  console.log("Connected")

  socket.emit('settings', settings)

  socket.on('settings', (data) => {
    settings = { ...data };
    writeSettings(settings);
    trackTickers(socket, settings.interval);
  })

  socket.on('start', () => {
    trackTickers(socket, settings.interval);
    console.log("Started")
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on :${PORT}`);
});
