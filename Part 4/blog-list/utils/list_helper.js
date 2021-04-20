const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.likes;
};

const favoriteBlogs = (blogs) => {
  let entry = null;
  blogs.map((blog) => {
    if (blog.likes > (entry === null ? 0 : entry.likes)) entry = blog;
  });
  return entry;
};

const authorWithMostBooks = (blogs) => {
  let authorDetails = [
    {
      author: "DummyEntry",
      blogs: 0,
    },
  ];
  blogs.map((blog) => {
    lodash._.findIndex(authorDetails, ["author", blog.author]) === -1
      ? (authorDetails = lodash._.concat(authorDetails, {
          author: blog.author,
          blogs: 1,
        }))
      : (authorDetails[
          lodash._.findIndex(authorDetails, ["author", blog.author])
        ].blogs += 1);
  });
  authorDetails = lodash._.drop(authorDetails);
  let entry = null;
  authorDetails.map((blog) => {
    if (blog.blogs > (entry === null ? 0 : entry.blogs)) entry = blog;
  });
  return entry;
};

const authorWithMostLikes = (blogs) => {
  let authorDetails = [
    {
      author: "DummyEntry",
      likes: 0,
    },
  ];

  blogs.map((blog) => {
    lodash._.findIndex(authorDetails, ["author", blog.author]) === -1
      ? (authorDetails = lodash._.concat(authorDetails, {
          author: blog.author,
          likes: blog.likes,
        }))
      : (authorDetails[
          lodash._.findIndex(authorDetails, ["author", blog.author])
        ].likes += blog.likes);
  });
  authorDetails = lodash._.drop(authorDetails);
  let entry = null;
  authorDetails.map((blog) => {
    if (blog.likes > (entry === null ? 0 : entry.likes)) entry = blog;
  });
  return entry;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  authorWithMostBooks,
  authorWithMostLikes,
};
