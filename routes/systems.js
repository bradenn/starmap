let router = require('express').Router();
const db = require('../database');

router.get('/pg/', (req, res) => {
    return res.redirect('/systems/pg/1');
});
router.get('/pg/:offset', (req, res) => {
    db.query(`SELECT * FROM systems 
                    WHERE distance < 30
                    ORDER BY distance asc
                    OFFSET $1 ROWS
                    LIMIT 9`,
        [(req.params.offset) ? req.params.offset * 9 : 0])
        .then(systems => {
            return res.render('systems', {systems: systems.rows});
        });
});

router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM systems
                    LEFT OUTER JOIN stars s
                    ON systems."starId" = s.id
                    WHERE systems.name=$1::text`,
        [req.params.id]).then(systems => {
        db.query(`SELECT * FROM planets
                        WHERE "starId"=$1::text`,
            [systems.rows[0].starId])
            .then(planets => {
                res.render("system", {
                    systems: systems.rows,
                    planets: planets.rows
                });
            }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});


module.exports = router;
