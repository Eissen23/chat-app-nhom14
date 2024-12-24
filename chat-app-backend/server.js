const express = require('express')
const app = express()

const {
    MessengerClient
} = require('./messenger')

const {
    createUser,
    getUser,
    createChatRoom,
    getChatRoomsForUser,
    getChatMessages,
    createChatMessage
} = require('./server_side/database')

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(8080, () => {
    console.log('Server is running on port 8080')
});

app.get('/manage_user', (req, res) => {
    res.send('Hello World!')
});