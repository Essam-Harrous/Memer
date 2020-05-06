import { request, GraphQLClient } from 'graphql-request';

export const saveMeme = (memeUrl) => {
  return { payload: memeUrl, type: 'SAVE_MEME' };
};

export const addMeme = (memeData) => async (dispatch) => {};

export const signUp = (userData) => async (dispatch) => {
  const query = `mutation {
    signUp(firstName: "${userData.firstName}", lastName: "${userData.lastName}", password: "${userData.password}", email: "${userData.email}", username: "${userData.username}") {
      firstName
      lastName
      username
      token
    }
  }`;
  try {
    const res = await request('http://localhost:8080/graphql', query);
    console.log(res);
    dispatch({ type: 'SIGN_SUCCESS', payload: res.signUp });
  } catch (err) {
    console.log(err.response, err);
    dispatch({
      type: 'SIGN_UP_FAILED',
      payload: { errMessage: err.response.errors[0].message },
    });
  }
};

export const logIn = (userData) => async (dispatch) => {
  console.log(userData);
  const query = `{
    logIn(password: "${userData.password}", ${userData.usernameEmail}) {
      firstName
      lastName
      username
      token
    }
  }`;
  try {
    const res = await request('http://localhost:8080/graphql', query);
    console.log(res);
    dispatch({ type: 'SIGN_SUCCESS', payload: res.logIn });
  } catch (err) {
    console.log(err.response, err);
    dispatch({
      type: 'LOG_IN_FAILED',
      payload: { errMessage: err.response.errors[0].message },
    });
  }
};
