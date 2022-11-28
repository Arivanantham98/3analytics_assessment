import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: [],
    post: [],
    comments: [],
  },
  reducers: {
    getAllPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = true;
    },
    getPost: (state, action) => {
      state.post = action.payload;
      state.loading = true;
    },
    getComments: (state, action) => {
      state.comments = action.payload;
      state.loading = true;
    },
  },
});

export default slice.reducer;

const { getAllPosts, getPost, getComments } = slice.actions;

export const fetchPosts =
  (pageNumber = 1) =>
  async (dispatch) => {
    try {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=20`
      );
      dispatch(getAllPosts(response.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

export const fetchPostById =
  ({ id }) =>
  async (dispatch) => {
    try {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      dispatch(getPost(response.data));
    } catch (e) {
      return console.error(e.message);
    }
  };

export const fetchCommentsById =
  ({ id }) =>
  async (dispatch) => {
    try {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      );
      dispatch(getComments(response.data));
    } catch (e) {
      return console.error(e.message);
    }
  };
