const { Client } = require('pg');
const performance = require('performance-now');
const client = new Client({
    host: '10.0.0.6',
    user: 'remote',
    password: 'toor',
    database: 'space'
})
const start = performance();
client
    .connect()
    .then(() => console.log(`Connected to PostgreSQL (${Math.round(performance() - start)}ms)`))
    .catch(err => console.error('connection error', err.stack))

module.exports = {
    query: (text, params) => client.query(text, params),
}
