const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

const User = require("../models/user");

let token = "";

beforeAll(async () => {
  await User.deleteMany({});

  const userCreds = {
    username: "root",
    name: "root",
    password: "qwerty123456",
  };

  newUserResponse = await api.post("/api/users").send(userCreds);

  token = await api.post("/api/login/").send(userCreds);

  token = token.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  helper.initialBlogs.map((blog) => (blog.user = newUserResponse.body.id));
  await Blog.insertMany(helper.initialBlogs);
});

describe("generic tests", () => {
  test("all blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 100000);

  test("id is defined", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `bearer ${token}`);
    expect(response.body[0].id).toBeDefined();
  });
});

describe("post blog tests", () => {
  test("blog post is successful", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      title: "Test blog",
      author: "Test author",
      url: "testblog.com",
      likes: 999,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    newBlog.id = response._body.id;
    newBlog.user = newUserResponse.body.id;

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    expect(blogsAtEnd).toContainEqual(newBlog);
  }, 100000);

  test("blog post with no likes defaults to 0 likes in database", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const newBlog = {
      title: "Test blog with no likes",
      author: "Test author",
      url: "testblog.com",
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    newBlog.id = response._body.id;
    newBlog.user = newUserResponse.body.id;
    newBlog.likes = 0;

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    expect(blogsAtEnd).toContainEqual(newBlog);
  }, 100000);

  test("blog post with no title and url results in 400 Bad Request", async () => {
    const newBlog = {
      author: "Test author",
      likes: 666,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test("blog post without token results in 401", async () => {
    const newBlog = {
      author: "Test author",
      title: "Test title",
      url: "testing.com",
      likes: 666,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("delete blog tests", () => {
  test("delete blog successful", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const id = blogsAtStart[0].id;
    expect(blogsAtStart.map((blog) => blog.id)).toContain(id);
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.map((blog) => blog.id)).not.toContain(id);
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  });

  test("delete nonexistent blog unsuccessful", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const id = "62f3b3915e38708e4699c76f";
    expect(blogsAtStart.map((blog) => blog.id)).not.toContain(id);
    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("delete without token is unsuccessful", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const id = "62f3b3915e38708e4699c76f";
    expect(blogsAtStart.map((blog) => blog.id)).not.toContain(id);
    await api.delete(`/api/blogs/${id}`).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

describe("update blog tests", () => {
  test("update existing blog likes", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const updateBlog = {
      likes: 123,
    };
    const id = blogsAtStart[0].id;
    await api
      .put(`/api/blogs/${id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updateBlog)
      .expect(201);

    const blogCheck = blogsAtStart[0];
    blogCheck["likes"] = updateBlog["likes"];

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(blogsAtEnd).toContainEqual(blogCheck);
  });

  test("update nonexistent blog unsuccessful", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const updateBlog = {
      likes: 123,
    };
    const id = "62f3b3915e38708e4699c76f";
    await api
      .put(`/api/blogs/${id}`)
      .set("Authorization", `bearer ${token}`)
      .send(updateBlog)
      .expect(404);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toEqual(blogsAtStart);
  });

  test("update without token is unsuccessful", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const updateBlog = {
      likes: 123,
    };
    const id = "62f3b3915e38708e4699c76f";
    await api.put(`/api/blogs/${id}`).send(updateBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toEqual(blogsAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
