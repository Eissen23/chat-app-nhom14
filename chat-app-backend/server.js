const express = require('express')
const app = express()
app.use(express.json())

const {
    MessengerClient
} = require('./messenger')

const {
    createUser,
    getUser,
    createChatRoom,
    joinChatRoom,
    getChatRoomsForUser,
    isUserInChatRoom,
    getChatMessages,
    createChatMessage,
    authorizeUser
} = require('./server_side/database')

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(8080, () => {
    console.log('Server is running on port 8080')
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await createUser(String(username), String(email), String(password));
        res.status(201).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error signing up user');
    }
});

app.get('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authorizeUser(email, password);
        res.status(200).send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in user');
    }
});

app.post('/chatroom', async (req, res) => {
    try {
        const { user_id, chatroom_name, password } = req.body;
        if(password != null) {
            const chatroom = await createChatRoom(chatroom_name,user_id, password);
            res.status(201).send(chatroom);
        } else {
            const chatroom = await createChatRoom(chatroom_name,user_id);
            res.status(201).send(chatroom);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating chatroom');
    }
});

app.post('/join', async (req, res) => {
    try {
        const { user_id, chatroom_id } = req.body;
        const chatroom = await joinChatRoom(user_id, chatroom_id);
        res.status(201).send(chatroom);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error joining chatroom');
    }
});

app.get('/chatrooms', async (req, res) => {
    try {
        const { user_id } = req.body;
        const chatrooms = await getChatRoomsForUser(user_id);
        res.status(200).send(chatrooms);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting chatrooms');
    }
});

app.post('/message', async (req, res) => {
    try {
        const { user_id, chatroom_id, message } = req.body;
        const isValidChatroom = await isUserInChatRoom(user_id, chatroom_id);

        if (isValidChatroom) {
            const chatMessage = await createChatMessage(user_id, chatroom_id, message);
            res.status(201).send(chatMessage);
        } else {
            res.status(403).send('User is not a member of the chatroom');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error sending message');
    }
});

app.get('/messages', async (req, res) => {
    try {
        const { user_id, chatroom_id } = req.body;
        const isValidChatroom = await isUserInChatRoom(user_id, chatroom_id);

        if (isValidChatroom) {
            const messages = await getChatMessages(chatroom_id);
            res.status(200).send(messages);
        } else {
            res.status(403).send('User is not a member of the chatroom');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error getting messages');
    }
});