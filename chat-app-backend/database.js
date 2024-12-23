const mysql = require('mysql2');

mysql.createPool(
    {
        host: '127.0.0.1',
        user:'root',
        password: 'DucPhuc2',
        database: 'chat_app_server',
    }
).promise()





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