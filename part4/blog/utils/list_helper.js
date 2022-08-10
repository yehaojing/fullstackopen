const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((likes1, likes2) => likes1 + likes2)
}

const favouriteBlog = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return blogs[likes.indexOf(Math.max(...likes))]
}
    
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}