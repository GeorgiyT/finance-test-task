## Requirements

Requirements:

- application should connect to the locally running service
- application should render price changes for some tickers in real time

As a bonus I did an additional tasks:

- added visual effects to highlight positive or negative changes in the prices
- added possibility to switch on/off tickers by user
- added possibility to specify interval time by user
- added possibility to add/remove ticker from watching group
- added white & dark colour theme
- added saving settings on server side in a file

Used technologies:

- React with hooks
- Redux Toolkit
- Redux-Thunk
- Socket.io
- CSS-Modules

## Running the local service

1. Open a new bash shell
2. `cd server`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`
5. You can visit [http://localhost:4000](http://localhost:4000) to check that the service is working correctly and inspect the data it produces.

## Run your application

1. Open a new bash shell
2. `cd client`
3. `npm install` or `yarn install`
4. `npm run start` or `yarn start`
