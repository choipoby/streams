import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// this returns a function
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts()); // dispatch the returned function and wait the response
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach(id => dispatch(fetchUser(id)));
};

// this returns a function
export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({
    type: "FETCH_POSTS",
    payload: response.data
  });
};

// this returns a function
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};

// memoize example : I would not try to use it.
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data
//   });
// });
