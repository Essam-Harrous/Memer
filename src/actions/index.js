import { request, GraphQLClient } from 'graphql-request';
import axios from 'axios';
import history from '../history';

const _serverUrl = '/.netlify/functions/api/graphql';

//
export const saveMeme = (memeUrl, setState) => {
  setState({ isLoading: false });
  return { payload: memeUrl, type: 'SAVE_MEME' };
};

/*
  user actions
*/

//signUp
export const signUp = (userData, setLoading) => async (dispatch) => {
  const query = `mutation {
    signUp(firstName: "${userData.firstName}", lastName: "${userData.lastName}", password: "${userData.password}", email: "${userData.email}", username: "${userData.username}") {
      firstName
      lastName
      username
      token
      id
      avatar
    }
  }`;
  try {
    const res = await request(_serverUrl, query);
    console.log(res);
    dispatch({ type: 'SIGN_SUCCESS', payload: res.signUp });
    localStorage.setItem('token', res.signUp.token);
    setLoading(false);
    const modal = document.getElementById('close-signUp');
    modal.click();
  } catch (err) {
    console.log(err.response, err);
    setLoading(false);

    dispatch({
      type: 'ERROR_SIGN_UP',
      payload: { signUp: err.response.errors[0].message },
    });
  }
};

export const logIn = (userData, setLoading) => async (dispatch) => {
  console.log(userData);

  const query = `{
    logIn(password: "${userData.password}", ${userData.usernameEmail}) {
      firstName
      lastName
      username
      token
      id
      avatar
    }
  }`;
  try {
    const res = await request(_serverUrl, query);
    console.log(res);
    setLoading(false);
    const modal = document.getElementById('close-signIn');
    modal.click();
    dispatch({ type: 'SIGN_SUCCESS', payload: res.logIn });
    localStorage.setItem('token', res.logIn.token);
  } catch (err) {
    console.log(err.response, err);
    setLoading(false);
    dispatch({
      type: 'ERROR',
      payload: { signIn: err.response.errors[0].message },
    });
  }
};

export const logOut = () => {
  localStorage.removeItem('token');
  return {
    type: 'LOG_OUT',
    payload: {
      firstName: null,
      lastName: null,
      username: null,
      token: null,
      avatar: null,
    },
  };
};

/* 
  templates actions
*/

//add template action
export const addTemplate = (template, setLoading) => async (dispatch) => {
  try {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(template.imageData);
    fileReader.onload = async (e) => {
      //creating the query for the graphql
      const query = `mutation {
        addTemplate(tags: [${template.tags}], templateData: "${e.target.result}") {
          templateUrl
          id
          tags
        }
      }`;
      //create the authorization header
      const client = new GraphQLClient(_serverUrl, {
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`,
        },
      });

      //post the request to the server
      client
        .request(query)
        .then((res) => {
          dispatch({ type: 'ADD_TEMPLATE', payload: res.addTemplate });
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          setLoading(false);
        });
    };
  } catch (err) {
    console.log(err.response);
    setLoading(false);
    dispatch({
      type: 'ERROR',
      payload: { addTemplate: err.response.errors[0].message },
    });
  }
};

//get templates
export const getTemplates = () => async (dispatch) => {
  try {
    const query = `{
      templates {
        templateUrl
        tags
        id
      }
    }`;
    console.log('i am in action');
    const response = await request(_serverUrl, query);
    dispatch({ type: 'GET_TEMPLATES', payload: response.templates });
    console.log(response);
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
};

export const checkToken = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/.netlify/functions/api/auth', {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(data);
    if (data.err) {
      localStorage.removeItem('token');
    } else {
      const userObj = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        token: localStorage.getItem('token'),
        avatar: data.avatar,
      };
      dispatch({ type: 'SIGN_SUCCESS', payload: userObj });
    }
  } catch (err) {
    console.log(err);
  }
};

/* 
  memes
*/

//add meme
export const addMeme = (memeObj, setState) => async (dispatch) => {
  try {
    //initialize query params
    let queryParams = ``;
    if (memeObj.templateId) {
      queryParams = `memeUrl: "${memeObj.memeUrl}", content: "${memeObj.content}", tags: [${memeObj.tags}], templateId: "${memeObj.templateId}"`;
    } else {
      queryParams = `memeUrl: "${memeObj.memeUrl}", content: "${memeObj.content}", tags: [${memeObj.tags}], templateUrl: "${memeObj.templateUrl}"`;
    }
    //initialize the graphQl query
    const query = `mutation {
      addMeme(${queryParams}) {
        id
        memeUrl
        peopleLikes
        peopleDisLikes
        tags
        content
        user {
          avatar
          id
          firstName
          lastName
          username
        }
        template {
          id
          tags
        }
        comments {
          id
          content
          user {
            avatar
            id
            firstName
            lastName
            username
          }
        }
      }
    }`;
    console.log('query', query);

    //initialize the graphQl request
    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    //post the request to the server
    const response = await client.request(query);
    console.log('add meme response', response);
    setState({
      isLoading: true,
      isSaved: true,
      isPostMeme: true,
    });
    dispatch({ type: 'ADD_MEME', payload: response.addMeme });
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch({
      type: 'ERROR',
      payload: { addMeme: err.response.errors[0].message },
    });
  }
};

//fetch the last memes
export const fetchLastMemes = () => async (dispatch) => {
  try {
    //initialize the graphQl query
    const query = `{
      lastMemes {
        id
        memeUrl
        peopleLikes
        peopleDisLikes
        tags
        content
        user {
          avatar
          id
          firstName
          lastName
          username
        }
        template {
          id
          tags
        }
        comments {
          id
          content
          user {
            avatar
            id
            firstName
            lastName
            username
          }
        }
      }
    }`;

    //post a request to the server to fetch all memes
    const response = await request(_serverUrl, query);
    console.log(response);
    dispatch({ type: 'FETCH_LAST_MEMES', payload: response.lastMemes });
  } catch (err) {
    console.log(err.response);
  }
};
//fetch the custom memes
export const fetchCustomMemes = (tags) => async (dispatch) => {
  try {
    console.log(tags);
    //initialize the graphQl query
    const query = `{
      customMemes(tags: [${tags}]) {
        id
        memeUrl
        peopleLikes
        peopleDisLikes
        tags
        content
        user {
          avatar
          id
          firstName
          lastName
          username
        }
        template {
          id
          tags
        }
        comments {
          id
          content
          user {
            avatar
            id
            firstName
            lastName
            username
          }
        }
      }
    }`;

    console.log(query);
    //post a request to the server to fetch all memes
    const response = await request(_serverUrl, query);
    console.log(response);
    dispatch({ type: 'FETCH_CUSTOM_MEMES', payload: response.customMemes });
    history.push('/customMemes');
  } catch (err) {
    console.log(err.response);
  }
};

//fetch my memes
export const fetchMyMemes = () => async (dispatch) => {
  try {
    //initialize the graphQl query
    const query = `{
      myMemes {
        id
        memeUrl
        peopleLikes
        peopleDisLikes
        tags
        content
        user {
          avatar
          id
          firstName
          lastName
          username
        }
        template {
          id
          tags
        }
        comments {
          id
          content
          user {
            avatar
            id
            firstName
            lastName
            username
          }
        }
      }
    }`;

    //initialize the graphql client
    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    //post a request to the server to fetch all memes
    const response = await client.request(query);
    console.log(response);
    dispatch({ type: 'FETCH_MY_MEMES', payload: response.myMemes });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: 'ERROR', payload: err.response.errors[0].message });
  }
};

//add like
export const addLike = (meme, userId) => async (dispatch) => {
  try {
    const query = `mutation{
      addLike(memeId: "${meme.id}", receiverId: "${meme.user.id}") {
        id
      }
    }`;
    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    const response = await client.request(query);
    dispatch({
      type: 'ADD_LIKE',
      payload: { memeId: meme.id, userId: userId },
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

//remove like
export const removeLike = (meme, userId) => async (dispatch) => {
  try {
    const query = `mutation{
      removeLike(memeId: "${meme.id}") {
        id
      }
    }`;
    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    const response = await client.request(query);
    dispatch({
      type: 'REMOVE_LIKE',
      payload: { memeId: meme.id, userId: userId },
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

//add disLike
export const addDisLike = (meme, userId) => async (dispatch) => {
  try {
    const query = `mutation{
      addDisLike(memeId: "${meme.id}", receiverId: "${meme.user.id}") {
        id
      }
    }`;
    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    const response = await client.request(query);
    dispatch({
      type: 'ADD_DIS_LIKE',
      payload: { memeId: meme.id, userId: userId },
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

//remove disLike
export const removeDisLike = (meme, userId) => async (dispatch) => {
  try {
    const query = `mutation{
      removeDisLike(memeId: "${meme.id}") {
        id
      }
    }`;
    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    const response = await client.request(query);
    dispatch({
      type: 'REMOVE_DIS_LIKE',
      payload: { memeId: meme.id, userId: userId },
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

//select current meme
export const selectMeme = (memeData) => {
  console.log(memeData);
  return { type: 'SELECT_MEME', payload: memeData };
};

//add comment
export const addComment = (data, setLoading) => async (dispatch) => {
  try {
    const query = `mutation {
      addComment(memeId: "${data.memeId}", receiverId: "${data.receiverId}", content: "${data.content}") {
        id
        content
        user {
          avatar
          id
          firstName
          lastName
          username
        }
      }
    }`;

    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    const response = await client.request(query);

    //setLoading state to the addComment component
    setLoading(false);

    //dispatch the action to the reducer
    dispatch({ type: 'ADD_COMMENT', payload: response.addComment });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

//fetch user notifications from the server
export const fetchNotifications = () => async (dispatch) => {
  try {
    const query = `{
      notifications {
        id
        type
        sender {
          id
          firstName
          lastName
          username
          avatar
        }
        meme {
          id
          memeUrl
          peopleLikes
          peopleDisLikes
          tags
          content
          user {
            avatar
            id
            firstName
            lastName
            username
          }
          template {
            id
            tags
          }
          comments {
            id
            content
            user {
              avatar
              id
              firstName
              lastName
              username
            }
          }
        }
      }
    }`;

    const client = new GraphQLClient(_serverUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    });

    const response = await client.request(query);
    console.log(response);

    //dispatch the response to the reducer
    dispatch({ type: 'FETCH_NOTIFICATIONS', payload: response.notifications });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: 'ERROR', payload: err.response.errors[0].message });
  }
};

export const fetchTags = () => async (dispatch) => {
  try {
    const query = `{
      fetchTags {
        tags
      }
    }`;

    const response = await request(_serverUrl, query);
    console.log(response);
    dispatch({ type: 'FETCH_TAGS', payload: response.fetchTags.tags });
  } catch (err) {
    console.log(err);
  }
};
