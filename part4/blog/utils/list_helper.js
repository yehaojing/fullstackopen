const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((likes1, likes2) => likes1 + likes2)
}
    
module.exports = {
    dummy,
    totalLikes
}