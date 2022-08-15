const blogRouter = require('express').Router()
const { update } = require('lodash')
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

blogRouter.put('/:id', async (request, response) => {
    console.log(request.body)
    const body = {
        title: request.body.title,
        author: request.body.author,
        likes: request.body.likes,
        url: request.body.url,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    if (updatedBlog) {
        response.status(201).json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter