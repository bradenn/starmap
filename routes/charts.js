let router = require('express').Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.query(`SELECT * FROM systems
                    LEFT OUTER JOIN stars s on systems."starId" = s.id`).then(stars => {
        db.query(`SELECT * FROM planets`).then(planets => {
            return res.render('charts', {stars: stars.rows, planets: planets.rows});
        });
    });
});


module.exports = router;
