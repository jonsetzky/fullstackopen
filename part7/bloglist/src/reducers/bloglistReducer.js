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
      return ({ ...state }[action.payload.id] = action.payload);
    },
    /**
     * @param {BloglistState} state
     * @param {{payload: string}} action payload is blog's id
     */
    delete(state, action) {
      let newState = { ...state };
      delete newState[action.payload];
      return newState;
    },
  },
});

const { add, set, setAll, del } = bloglistSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    let newBlogs = await blogs.getAll();
    dispatch(setAll(newBlogs));
  };
};

/**
 *
 * @param {Blog} newBlog
 */
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    let newBlogs = await blogs.create(newBlog);
    dispatch(add(newBlogs));
  };
};

/**
 *
 * @param {Blog} newBlog
 */
export const updateBlog = (id, newBlog) => {
  return async (dispatch) => {
    let updatedBlog = await blogs.update(id, newBlog);
    dispatch(set(updatedBlog));
  };
};

/**
 *
 * @param {string} id blog's id
 */
export const remove = (id) => {
  return async (dispatch) => {
    await blogs.remove(id);
    dispatch(del(id));
  };
};

export default bloglistSlice.reducer;
