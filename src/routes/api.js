const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const apiPath = path.resolve(__dirname,"../data/confessions.json" );

const confessions = JSON.parse(
    fs.readFileSync(apiPath)
);


// router.get('/api', (req, res) => res.status(200).json(confessions));
router.get('/api', (req, res) => res.status(200).json(confessions));

router.post('/api', (req, res) => {
    console.log(req.body.post);
    const newId = confessions.posts[confessions.posts.length - 1].id + 1;
    const newConfession = Object.assign(
        { title: `Confession ${newId}` },
        req.body, 
        { id: newId },
        { hearts: 0 },
        { samesies: 0 }
    );
    // push this new confession into the confessions array
    confessions.posts.push(newConfession);
    // fs.writeFile(apiPath, JSON.stringify(confessions), err => {
    //     res.status(201).json({ 
    //         status: 'success',
    //         posts: confessions.posts
    //      });
    // });
    console.log(newConfession);
    return res.redirect('/');
    // res.end();
})

// catch-all route handler for 404 errors
router.use((req, res) => {
    return res.status(404).sendFile(path.resolve(__dirname, '../client/404.html'))
})

module.exports = router;