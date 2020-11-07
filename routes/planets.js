let router = require('express').Router();
const db = require('../database');


router.get('/', (req, res) => {
    db.query(`SELECT * FROM planets WHERE true ORDER BY distance LIMIT 50`).then(data => {
        res.render("planets", {planets: data.rows});
    })
});

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM planets
                    WHERE "id"=$1::text`,
        [req.params.id])
        .then(planets => {
            db.query(`SELECT * FROM moons
                    WHERE "planetId"=$1::text`,
                [req.params.id])
                .then(moons => {
                    res.render("planet", {
                        planet: planets.rows[0],
                        moons: moons.rows
                    });
                }).catch(err => console.log(err));
        }).catch(err => console.log(err));
});

module.exports = router;
