import { request, GraphQLClient } from 'graphql-request';
import axios from 'axios';

const _serverUrl = 'http://localhost:8080/graphql';

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
    const { data } = await axios.get('http://localhost:8080/auth', {
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
        likes
        disLikes
        tags
        user {
          id
          firstName
          lastName
          username
        }
        template {
          id
          tags
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

export const fetchMemes = () => async (dispatch) => {
  try {
    //initialize the graphQl query
    const query = `{
      memes {
        id
        memeUrl
        likes
        disLikes
        tags
        content
        user {
          id
          firstName
          lastName
          username
        }
        template {
          id
          tags
        }
      }
    }`;

    //post a request to the server to fetch all memes
    const response = await request(_serverUrl, query);
    console.log(response);
    dispatch({ type: 'FETCH_MEMES', payload: response.memes });
  } catch (err) {
    console.log(err);
  }
};
