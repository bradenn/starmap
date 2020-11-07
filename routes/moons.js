let router = require('express').Router();
const db = require('../database');


router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM moons
                    WHERE "id"=$1::text`,
        [req.params.id])
        .then(moons => {
            res.render("moon", {
                moon: moons.rows[0]
            });
        }).catch(err => console.log(err));
});

module.exports = router;
