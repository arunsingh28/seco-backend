const db = require('../models');
const time = require('date-and-time');
const { category } = require('./auth');
const _blog = db.blog;

exports.blog = async (req, res) => {
    const { title, summary, selected, latest } = req.body;

    const blog = new _blog({
        title, 
        summary, 
        latest, 
        category: selected
    })

    try {
        console.log("save" + blog)
        await blog.save()
        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', error: 'error' })
    }
}


exports.blogShow = async (req, res) => {

    try {
        
        const blogs = await _blog.findAll()
        console.log(blogs)

        return res.json({ status: 'ok', data: blogs })

    } catch (error) {
        console.log(error)
    }
}

exports.blogDelete = async(req, res)=> {
    try {
        const id = req.params.id
        await _blog.destroy({
            where: {
                id
            }
        }).then(d => {
            if (d === 1) {
                return res.status(200).json({ status: 'ok' })
            } else {
                return res.status(400).json({ status: 'error' })
            }
        })
    } catch (error) {
        return res.status(404).json({ status: 'error', error: 'server error' })
    }
}