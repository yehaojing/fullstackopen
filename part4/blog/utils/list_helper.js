const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs
    .map((blog) => blog.likes)
    .reduce((likes1, likes2) => likes1 + likes2);
};

const favouriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  return blogs[likes.indexOf(Math.max(...likes))];
};

const mostBlogs = (blogs) => {
  const blogsByAuthor = _(blogs)
    .countBy("author")
    .map((value, key) => {
      return {
        author: key,
        blogs: value,
      };
    })
    .reduce((max, obj) => (obj.blogs > max.blogs ? obj : max));
  return blogsByAuthor;
};

const mostLikes = (blogs) => {
  const groupedByAuthor = _(blogs)
    .groupBy("author")
    .map((author, name) => ({
      author: name,
      likes: _.sumBy(author, "likes"),
    }))
    .value();
  return favouriteBlog(groupedByAuthor);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
