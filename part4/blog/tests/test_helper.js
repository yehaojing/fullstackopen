const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Hello World",
    author: "Bill Ye",
    url: "google.com",
    likes: 5,
  },
  {
    title: "Hello World",
    author: "Will Be",
    url: "facebook.com",
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => {
    blog = blog.toJSON();
    blog.user = blog.user.toString();
    return blog;
  });
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  usersInDb,
  blogsInDb,
};
