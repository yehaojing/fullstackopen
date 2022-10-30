import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const updatedBlog = action.payload;
      return state.map(
        blog => blog.id !== id ? blog : updatedBlog
      );
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    }
  }
});

export const { addBlog, removeBlog, setBlogs, updateBlog } = blogSlice.actions;

export const initialiseBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    dispatch(updateBlog(blog));
  };
};

export const commentBlog = (blog) => {
  return async (dispatch) => {
    dispatch(updateBlog(blog));
  };
};

export default blogSlice.reducer;
