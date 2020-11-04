let router = require('express').Router();
const db = require('../database');


router.get('/', (req, res) => {
    db.query(`SELECT * FROM systems WHERE true ORDER BY distance LIMIT 50`).then(data => {
        res.render("systems", {systems: data.rows});
    })
});

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM systems WHERE "name"=$1::text`, [req.params.id]).then(systems => {
        db.query(`SELECT * FROM stars WHERE "id"=$1::text`, [systems.rows[0].starId]).then(stars => {
            if(stars.rows.length >= 1) {
                db.query(`SELECT * FROM planets WHERE "starId"=$1::text`, [stars.rows[0].id]).then(planets => {
                    Promise.all(planets.rows.map(planet => db.query(`SELECT * FROM moons WHERE "planetId"=$1::text`, [planet.id]))).then(r => {
                        let moons = [];
                        r.map(a => a.rows.map(b => moons.push(b)));
                        res.render("system", {
                            systems: systems.rows,
                            stars: stars.rows,
                            planets: planets.rows,
                            moons: moons
                        });
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }else{
                res.send("No stars found")
            }
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

module.exports = router;