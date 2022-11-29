import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "posts",
  initialState: {
    loading: false,
    posts: [],
    pageCount: 0,
    post: [],
    comments: [],
  },
  reducers: {
    getAllPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = true;
    },
    getAllPostsNumber: (state, action) => {
      state.pageCount = parseInt(action.payload);
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

const { getAllPosts, getAllPostsNumber, getPost, getComments } = slice.actions;

export const fetchPosts =
  (pageNumber = 1) =>
  async (dispatch) => {
    try {
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=20`
      );
      const total = response.headers.get("x-total-count");
      dispatch(getAllPosts(response.data));
      dispatch(getAllPostsNumber(total));
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
