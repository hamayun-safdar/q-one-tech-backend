const PROJECT = require('../models/project.model')
// const { checkDuplicate } = require('../../config/errors')

// API to create project
exports.create = async (req, res, next) => {
    try {
        let payload = req.body
        
        const project = await PROJECT.create(payload)
        return res.send({ success: true, message: 'Project created successfully', project })
    } catch (error) {
        return next(error)
    }
}

// API to delete project
exports.delete = async (req, res, next) => {
    try {
        const { projectId } = req.params
        if (projectId) {
            const project = await PROJECT.deleteOne({ _id: projectId })
            if (project && project.deletedCount)
                return res.send({ success: true, message: 'Project deleted successfully', projectId })
            else return res.status(400).send({ success: false, message: 'Project not found for given Id' })
        } else
            return res.status(400).send({ success: false, message: 'Project Id is required' })
    } catch (error) {
        return next(error)
    }
}

// API to get Project list
exports.list = async (req, res, next) => {
    try {
        let { page, limit } = req.query
        page = page !== undefined && page !== '' ? parseInt(page) : 1
        limit = limit !== undefined && limit !== '' ? parseInt(limit) : 9

        const total = await PROJECT.countDocuments()

        if (page > Math.ceil(total / limit) && total > 0)
            page = Math.ceil(total / limit)

        const projects = await PROJECT.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: limit * (page - 1) },
            { $limit: limit },
            {
                $project: {
                    _id: 1, title: 1, pCode: 1,
                }
            }
        ])

        return res.send({
            success: true, message: 'Porjects fetched successfully',
            data: {
                projects,
                pagination: {
                    page, limit, total,
                    pages: Math.ceil(total / limit) <= 0 ? 1 : Math.ceil(total / limit)
                }
            }
        })
    } catch (error) {
        return next(error)
    }
}