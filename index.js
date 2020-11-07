const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.use((req, res, next) => {
   res.locals.url = req.url;
   next();
});

app.use('/', require('./routes'))

app.listen(port, () => {
    console.log(`StarMap started. Listening on 0.0.0.0:${port}`);
})
