import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";

/**
 * @typedef {{title: string,
 *     author:string,
 *     url:string,
 *     likes:number,
 *     user:string,
 *     id:string
 *  }} Blog
 * @typedef {{[key: string]: Blog}} BloglistState
 */
/**
 * @type {BloglistState}
 */
const initialState = {};

const bloglistSlice = createSlice({
  name: "bloglist",
  initialState,
  reducers: {
    /**
     * @param {BloglistState} state
     * @param {{payload: Blog[]}} action
     */
    setAll(state, action) {
      let out = {};
      action.payload.forEach((blog) => {
        out[blog.id] = blog;
      });
      return out;
    },

    /**
     * sets a blog based on its id
     * @param {BloglistState} state
     * @param {{payload: Blog}} action
     */
    set(state, action) {
      let newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    },

    /**
     * @param {BloglistState} state
     * @param {{payload: string}} action payload is blog's id
     */
    del(state, action) {
      let newState = { ...state };
      delete newState[action.payload];
      return newState;
    },
  },
});

const { set, setAll, del } = bloglistSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const newBlogs = await blogs.getAll();
    console.log("initialized blogs with", newBlogs);
    dispatch(setAll(newBlogs));
  };
};

/**
 * @param {Blog} newBlog
 */
export const createBlog = (newBlog) => {
  return async (dispatch, getState) => {
    const createdBlog = await blogs.create(newBlog);

    // localuser fortunately has username and user fields so we'll use them
    // todo this is a glue fix because displaying blogs only uses user.name and user.username
    //  to make more robust, entire user object should be used (as blogs.getAll() also returns)
    const { token: _, ...user } = getState().localUser;

    dispatch(set({ ...createdBlog, user }));
  };
};

/**
 *
 * @param {Blog} newBlog
 */
export const updateBlog = (id, newBlog) => {
  return async (dispatch, getState) => {
    let oldBlog = getState().bloglist[id];

    delete newBlog["id"];
    delete newBlog["user"];

    const updatedBlog = await blogs.update(id, newBlog);
    dispatch(set({ ...updatedBlog, user: oldBlog.user }));
  };
};

/**
 *
 * @param {string} id blog's id
 */
export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogs.remove(id);
    dispatch(del(id));
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    let blog = getState().bloglist[id];

    if (!blog) {
      throw new Error("trying to like a blog that doesn't exist in state");
    }

    await dispatch(
      updateBlog(id, {
        ...blog,
        likes: blog.likes + 1,
      }),
    );
  };
};

export default bloglistSlice.reducer;
