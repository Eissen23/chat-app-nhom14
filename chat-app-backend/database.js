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

// createUser('bob2','bob2@gmail.com','password').then(result => console.log(result)).catch(err => console.error(err));

// // getUser(3).then(result => console.log(result)).catch(err => console.error(err));