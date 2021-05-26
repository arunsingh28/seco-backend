const db = require('../models');
const time = require('date-and-time');

const _cat = db.category;


exports.category = async (req, res) => {
    try {
        const { cat } = req.body;
        let categoryExists = await _cat.findOne({
            where: {
                cat: cat
            }
        })

        if (categoryExists) {
            return res.status(404).json({ status: 'error', error: 'cateory already exists' })

        } else {
            await _cat.create({
                cat
            }).then(() => {
                return res.status(200).json({ status: 'ok' })
            })
        }


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


exports.getCategoryById = async (req, res) => {
    try {
        const id = req.body.id;
        console.log(id)
        await _cat.findOne({
            where: {
                id
            }
        }).then(data => {
            return res.status(200).json({ status: 'ok', data: data });
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ status: 'error', error: 'server error' })
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const cat = await _cat.findAll()
        return res.status(200).json({ status: 'ok', data: cat })
    } catch {
        res.status(404).json({ status: 'error', error: 'Error' })
    }
}

exports.updateCategory = async (req, res) => {
    const { cat } = req.body
    try {
        const category = await _cat.findByPk(req.params.id)
        category.cat = cat
        await category.save()
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: 'error', error: 'server error' })
    }
}