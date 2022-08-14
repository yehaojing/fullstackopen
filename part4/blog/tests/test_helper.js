const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Hello World',
        author: 'Bill Ye',
        url: 'google.com',
        likes: 5
    },
    {
        title: 'Hello World',
        author: 'Will Be',
        url: 'facebook.com',
        likes: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}