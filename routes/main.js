let router = require('express').Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.query(`SELECT * FROM systems 
                    WHERE distance < 30
                    ORDER BY distance asc
                    LIMIT 9`,
        [])
        .then(systems => {
            return res.render('root', {systems: systems.rows});
        });
});




module.exports = router;
