const Blog = require("../models/blog");

const initialBlogs = [
  {
     title: "lol",
     author: "imdumb",
     url: "wuturl",
     likes: 69420
  },
  {
    title: "will it work this time",
    author: "i dont know no names",
    url: "lets try local host 3001 this time",
    likes: 1337
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
