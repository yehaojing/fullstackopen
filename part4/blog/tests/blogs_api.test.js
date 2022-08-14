const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('generic tests', () => {
    test('all blogs are returned as json', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    test('id is defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('post blog tests', () => {
    test('blog post is successful', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const newBlog = {
            title: 'Test blog',
            author: 'Test author',
            url: 'testblog.com',
            likes: 999
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        newBlog.id = response._body.id

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
        expect(blogsAtEnd).toContainEqual(newBlog)
    }, 100000)

    test('blog post with no likes defaults to 0 likes in database', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const newBlog = {
            title: 'Test blog with no likes',
            author: 'Test author',
            url: 'testblog.com',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        newBlog.id = response._body.id
        newBlog.likes = 0

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
        expect(blogsAtEnd).toContainEqual(newBlog)
    }, 100000)

    test('blog post with no title and url results in 400 Bad Request', async () => {
        const newBlog = {
            author: 'Test author',
            likes: 666
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('delete blog tests', () => {
    test('delete blog successful', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const id = blogsAtStart[0].id
        expect(blogsAtStart.map(blog => blog.id)).toContain(id)
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.map(blog => blog.id)).not.toContain(id)
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })

    test('delete nonexistent blog unsuccessful', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const id = '62f3b3915e38708e4699c76f'
        expect(blogsAtStart.map(blog => blog.id)).not.toContain(id)
        await api
            .delete(`/api/blogs/${id}`)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})