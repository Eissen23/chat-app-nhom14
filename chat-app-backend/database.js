const mysql = require('mysql2');

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

function generateRandomString() {
    const length = Math.floor(Math.random() * 37);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


// Managing user

async function createUser(username, email, password) {
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    )
    return result;
}

async function getUser(user_id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [user_id]);
    return rows;
}

// Managing messages-room
async function createChatRoom(room_name, created_by, is_private = false, password = null) {
    const chatroom_id = generateRandomString();
    const result = await pool.query(
        'INSERT INTO chatrooms (chatroom_id, room_name, created_by, is_private, password) VALUES (?, ?, ?, ?, ?)',
        [chatroom_id, room_name, created_by, is_private, password]
    );
    return result;
}

async function getChatRoomsForUser(user_id) {
    const [rows] = await pool.query(
        'SELECT cr.* FROM chatrooms cr JOIN userchatroom ucr ON cr.chatroom_id = ucr.chatroom_id WHERE ucr.user_id = ?',
        [user_id]
    );
    return rows;
}

module.exports = {
    createUser,
    getUser,
    createChatRoom,
    getChatRoomsForUser
}


module.exports = {
    createUser,
    getUser
}


// createUser('bob2','bob2@gmail.com','password').then(result => console.log(result)).catch(err => console.error(err));

//  getUser(3).then(result => console.log(result)).catch(err => console.error(err));