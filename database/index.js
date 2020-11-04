const { Client } = require('pg');
const client = new Client({
    host: '10.0.0.6',
    user: 'remote',
    password: 'toor',
    database: 'space'
})

client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack))

module.exports = {
    query: (text, params) => client.query(text, params),
}
