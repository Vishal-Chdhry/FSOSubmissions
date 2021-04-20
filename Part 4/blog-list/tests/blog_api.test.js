const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("id is the name of the unique identifier", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be created", async()=>{
     const newBlog= {
          title: "ok.",
          author: "someone",
          url: "definetly a real URL",
          likes: 0
     };

     await api
       .post("/api/blogs")
       .send(newBlog)
       .expect(200)
       .expect("Content-Type", /application\/json/);

     const blogsAtEnd= await helper.blogsInDb();
     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
})

test("a blog without likes is created", async () => {
  const newBlog = {
    title: "testing likes",
    author: "not me",
    url: "how many URLs do you even want",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
});

test("blog without title and URL is not added", async () => {
  const newBlog = {
    likes:0,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
