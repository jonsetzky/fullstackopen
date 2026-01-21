const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (fav, blog) => (fav === null || blog.likes > fav.likes ? blog : fav),
    null,
  );
};

// returns the author who has written the most blogs
const mostBlogs = (blogs) => {
  return {
    author: "Dummy Author",
    blogs: 100,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
