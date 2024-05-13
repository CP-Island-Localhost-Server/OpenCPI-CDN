const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
    // Modify the URL path to remove .disney.io from the first segment
    console.log(req.url);
    req.url = req.url.replace(/\.disney.io/, '');
    console.log(req.url);
    next();
  });

app.use('/cdn', express.static('./CDN_FILES/'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})