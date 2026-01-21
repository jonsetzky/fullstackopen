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
  let authors = {};
  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author] + 1 || 1;
  });

  let author = Object.entries(authors).reduce(
    (mx, a) => (a[1] > mx[1] ? a : mx),
    [null, 0],
  );
  if (author[0] === null) {
    return null;
  }

  return {
    author: author[0],
    blogs: author[1],
  };
};

const mostLikes = (blogs) => {
  let authors = {};
  blogs.forEach((blog) => {
    authors[blog.author] = authors[blog.author] + blog.likes || blog.likes;
  });

  let author = Object.entries(authors).reduce(
    (mx, a) => (a[1] > mx[1] ? a : mx),
    [null, 0],
  );
  if (author[0] === null) {
    return null;
  }

  return {
    author: author[0],
    likes: author[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
