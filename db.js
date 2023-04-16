const Pool = require("pg").Pool
const pool = new Pool({
    user: 'www',
    password: 'qwerty',
    host: 'localhost',
    port: '5432',
    database: 'home_cite'
})


module.exports = pool