const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }

    const blog = new Blog(body)

    if (body.url && body.title) {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } else {
        response.status(400).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    if (result) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }

})

module.exports = blogRouter