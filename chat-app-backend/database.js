const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

mysql.createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    }
).promise()


async function createUser(username, email, password) {
    const connection = mysql.createPool().promise();
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [username, email, password]);
    return result.insertId;
}
async function getUser(userId) {
    const connection = mysql.createPool().promise();
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await connection.execute(query, [userId]);
    return rows[0];
}
async function createMessage(roomId, userId, message) {
    const connection = mysql.createPool().promise();
    const query = 'INSERT INTO messages (room_id, user_id, message) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [roomId, userId, message]);
    return result.insertId;
}

async function getMessages(roomId) {
    const connection = mysql.createPool().promise();
    const query = 'SELECT * FROM messages WHERE room_id = ? ORDER BY created_at ASC';
    const [rows] = await connection.execute(query, [roomId]);
    return rows;
}