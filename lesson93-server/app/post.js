const express = require('express');

const tokenCheck = require('../middlewerase/tokenCheck');

const router = express.Router();
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const Post = require('../models/Post');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.uploads)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', tokenCheck, async (req, res) => {
    const posts = await Post.find({user: {$in : [...req.user.subscriptions, req.user._id]}}).populate('user');

    res.send(posts);
});

router.post('/', [tokenCheck, upload.single('image')], async (req, res) => {
    try{
        if(req.file){
            req.body.image = 'http://localhost:8000/uploads/' + req.file.filename;
        }

        const newPost = {
            user: req.user._id,
            title: req.body.title,
            text: req.body.text,
            image: req.body.image ,
            tags: req.body.tags ? JSON.parse(req.body.tags) : []
        };

        const post = await Post.create(newPost);

        res.send(post);
    } catch (e) {
        console.log(e)
    }
});

router.get('/tags', async (req, res) => {
    const tags = await Post.distinct('tags');

    res.send(tags)
});

module.exports = router;