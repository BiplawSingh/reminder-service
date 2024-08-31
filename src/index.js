const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const { createChannel } = require('./utils/messageQueue');

const TicketController = require('./controllers/ticket-controller');
const jobs = require('./utils/job');
const m = require('./models/notificationticket');

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    const channel = await createChannel();

    app.post('/api/v1/tickets', TicketController.create);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        // jobs();
    });
}

setupAndStartServer();