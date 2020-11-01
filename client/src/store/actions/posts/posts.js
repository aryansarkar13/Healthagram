import axios from "axios";
import {
  UPDATE_POSTS_SCROLLABLE,
  UPDATE_POSTS_LISTS,
  UPDATE_POSTS_LIKES,
  UPDATE_SINGLE_POST,
  PUT_SINGLE_POST_TO_TOP,
  HIDE_POST,
  RESET_POSTS
} from "store/types";

export const fetchPost = (skip, limit) => async dispatch => {
  try {
    console.log("fetch post have been called");
    const res = await axios.get(`/api/posts/find-all/${skip}/${limit}`);
    console.log("Fetch post have been called with data", res.data);
    if (!res.data || res.data.length === 0) {
      dispatch({
        type: UPDATE_POSTS_SCROLLABLE,
        payload: false
      });
    }

    dispatch({
      type: UPDATE_POSTS_LISTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POSTS_SCROLLABLE,
      payload: false
    });
    console.log(error);
  }
};
export const fetchPeoplePost = (skip, limit, id) => async dispatch => {
  try {
    console.log("fetch people post have been called", skip, limit, id);
    const res = await axios.get(`/api/posts/${id}/${skip}/${limit}`);
    console.log("Fetch post have been called with data", res.data);
    if (!res.data || res.data.length === 0) {
      dispatch({
        type: UPDATE_POSTS_SCROLLABLE,
        payload: false
      });
    }

    dispatch({
      type: UPDATE_POSTS_LISTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POSTS_SCROLLABLE,
      payload: false
    });
    console.log(error);
  }
};

export const resetPost = () => dispatch => {
  dispatch({
    type: RESET_POSTS
  });
};

export const addLike = (id, index) => async dispatch => {
  try {
    console.log("Add Like have been called", id, index);
    const res = await axios.post(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_SINGLE_POST,
      payload: { index: index, post: res.data }
    });
  } catch (error) {
    console.log(error);
  }
};

// Remove Like
export const removeLike = (id, index) => async dispatch => {
  try {
    console.log("Remove like have been called", id, index);
    const res = await axios.post(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_SINGLE_POST,
      payload: { index: index, post: res.data }
    });
  } catch (error) {
    console.log(error);
    if (error.response) console.log(error.response);
  }
};

// Add Comment
export const addComment = (postId, index, commentText) => async dispatch => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, {
      text: commentText
    });
    console.log("Comment have been successfully created", index, res.data);
    dispatch({
      type: UPDATE_SINGLE_POST,
      payload: { index: index, post: res.data }
    });
  } catch (error) {
    console.log(error);
    if (error.response) console.log(error.response);
  }
};

export const putPostToTop = post => dispatch => {
  console.log("Put Post To Top have been called", post);
  dispatch({
    type: PUT_SINGLE_POST_TO_TOP,
    payload: post
  });
};

export const hidePost = index => async dispatch => {
  dispatch({
    type: HIDE_POST,
    payload: { index }
  });
};
