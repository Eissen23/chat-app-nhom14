const mysql = require('mysql2');
const {
    simpleHash,
    decryptHash,
    generateRandomString
} = require('./crypt-helper')

const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    }
).promise()

// Managing user

async function createUser(username, email, password) {
    encrypted_pass = simpleHash(password);
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, encrypted_pass]
    )
    return result;
}

async function authorizeUser(email, password) {
    check_pass = simpleHash(password);
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, check_pass]);
    return rows;
}

async function getUser(user_id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
    return rows;
}

// Managing messages-room
async function createChatRoom(room_name, created_by, is_private = false, password = null) {
    const chatroom_id = generateRandomString();
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        
        const result = await connection.query(
            'INSERT INTO chatrooms (chatroom_id, room_name, created_by, is_private, password) VALUES (?, ?, ?, ?, ?)',
            [chatroom_id, room_name, created_by, is_private, password]
        );

        await connection.query(
            'INSERT INTO userchatroom (user_id, chatroom_id) VALUES (?, ?)',
            [created_by, chatroom_id]
        );

        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getChatRoomsForUser(user_id) {
    const [rows] = await pool.query(
        'SELECT cr.* FROM chatrooms cr JOIN userchatroom ucr ON cr.chatroom_id = ucr.chatroom_id WHERE ucr.user_id = ?',
        [user_id]
    );
    return rows;
}

async function createChatMessage(chatroom_id, user_id, content) {
    const message_id = generateRandomString();
    const result = await pool.query(
        'INSERT INTO chatmessages (message_id, chatroom_id, user_id, content) VALUES (?, ?, ?, ?)',
        [message_id, chatroom_id, user_id, content]
    );
    return result;
}

async function getChatMessages(chatroom_id) {
    const [rows] = await pool.query(
        'SELECT * FROM chatmessages WHERE chatroom_id = ? ORDER BY timestamp ASC',
        [chatroom_id]
    );
    return rows;
}

async function insertUserChatroom(user_id, chatroom_id) {
    const result = await pool.query(
        'INSERT INTO userchatroom (user_id, chatroom_id) VALUES (?, ?)',
        [user_id, chatroom_id]
    );
    return result;
    
}

module.exports = {
    createUser,
    getUser,
    createChatRoom,
    getChatRoomsForUser,
    createChatMessage,
    getChatMessages,
    insertUserChatroom
}


//createUser('bob3','bob3@gmail.com','password').then(result => console.log(result)).catch(err => console.error(err));

//  getUser(3).then(result => console.log(result)).catch(err => console.error(err));
// authorizeUser('bob3@gmail.com', 'password').then(result => console.log(result)).catch(err => console.error(err));