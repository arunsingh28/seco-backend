const db = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const time = require('date-and-time');
const dbConfig = require('../config/config.json')

var Sequelize = require('sequelize');
var sequelize = new Sequelize(dbConfig.development);
const { QueryTypes } = require('sequelize');

const _user = db.user;
const _cat = db.category;
const _blog = db.blog;


blog_count_query = `SELECT count(*) as count FROM blogs`;
category_count_query = `SELECT count(*) as count FROM categories`;

// create token 
const getToken = (user) => {
    let token = jwt.sign(
        {
            id: user.email
        },
        process.env.JWT_SECRET
    )
    return token
}



exports.login = async (req, res) => {
    const email = req.body.data.email
    const password = req.body.data.password

    try {
        const user = await _user.findOne({
            where: { email }
        })

        if (!user) {
            return res.json({ status: 'error', error: 'Account not found.' })
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = getToken(user)
            return res.json({ status: 'ok', token })
        } else {
            return res.json({ status: 'error', error: 'Password not matching' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: 'error', msg: err.message });
    }
}


exports.signup = async (req, res) => {
    const plainText = req.body.user.password;
    const email = req.body.user.email;
    const fullName = req.body.user.fullName;

    try {
        const u = await _user.findOne({
            where: {
                email
            }
        })
        if (u) {
            return res.json({ status: 'error', error: 'user already present' })
        }
        const password = await bcrypt.hash(plainText, 10)

        const user = new _user({
            fullName, password, email
        })
        try {
            await user.save()
            return res.json({ status: 'ok' })
        } catch (err) {
            return res.json({ status: 'error' })
        }
    } catch (err) {
        res.status(500).send({ msg: err.message });
    }
}


exports.category = async (req, res) => {
    try {
        const { cat } = req.body
        await _cat.create({
            cat
        }).then(() => {
            return res.status(200).json({ status: 'ok' })
        })
    } catch (error) {
        if (error) throw error
    }
}

exports.catDel = async (req, res) => {
    try {
        const id = req.params.id
        await _cat.destroy({
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

exports.dashboard = async (req, res) => {
    // rerurn data : user
    let totalBlog, totalCategory

    await sequelize.query(blog_count_query, { model: _blog, type: QueryTypes.SELECT, raw: true })
    .then(count => totalBlog = count)
    await sequelize.query(category_count_query, { model: _cat, type: QueryTypes.SELECT, raw: true }).then(count => totalCategory = count)
    
    return res.status(200).json({
        status: 'ok',
        user: req.user,
        blog: totalBlog,
        category: totalCategory
    })
}

exports.blog = async (req, res) => {
    const draft = false
    const { title, summary, url, latest } = req.body
    console.log(title, summary, url, latest, draft)

    const currentTime = time.format(new Date(), 'HH:mm:ss YYYY/MM/DD ')

    const blog = new _blog({
        title, summary, link: url, latest, draft, date: currentTime, category: 'catergory'
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
    const token = req.headers['token']

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await _user.findOne({
            where: {
                email: decoded.id
            }
        })
        if (!user) {
            return res.json({ status: 'error', error: 'anothrize user' })
        }

        const blogs = await _blog.findAll()
        console.log(blogs)

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


