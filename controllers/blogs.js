const db = require('../models');
const time = require('date-and-time');

const _blog = db.blog;

exports.blog = async (req, res) => {
    const { title, summary, selected, latest, url } = req.body;
    const blog = new _blog({
        title,
        summary,
        latest,
        url,
        category: selected
    })
    try {
        await blog.save()
        return res.json({ status: 'ok' })
    } catch (error) {
        return res.json({ status: 'error', error: 'error' })
    }
}


exports.blogShow = async (req, res) => {

    try {
        const blogs = await _blog.findAll()
        return res.json({ status: 'ok', data: blogs })

    } catch (error) {
        console.log(error)
    }
}

exports.blogDelete = async (req, res) => {
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

exports.updateBlog = async (req, res) => {
    const { title, summary, selected, latest, url } = req.body;

    console.log(req.params)
    const { id } = req.params.id;
    console.log(id)
    try {
        const blog = await _blog.findByPk(req.params.id)

        console.log(blog)
        blog.title = title,
            blog.summary = summary,
            blog.latest = latest,
            blog.category = selected,
            blog.url = url
        await blog.save()
        return res.json({ status: 'ok' })
    } catch (error) {
        return res.json({ status: 'error', error: error.message })
    }
}


exports.getBlogByID = async (req, res) => {
    try {
        const blog = await _blog.findByPk(req.params.id)

        console.log(blog)
    } catch (error) {
        
    }
}