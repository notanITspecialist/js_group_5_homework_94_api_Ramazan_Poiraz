import axios from "axios";
import {push} from 'connected-react-router';

export const GET_COCKTAILS = 'GET_COCKTAILS';

export const GET_MY_COCKTAILS = 'GET_MY_COCKTAILS';

export const GET_COCKTAIL_INFO = 'GET_COCKTAIL_INFO';




const getCocktailsSuc = data => ({type: GET_COCKTAILS, data});

const getMyPublicationsSuc = data => ({type: GET_MY_COCKTAILS, data});

const getCocktailInfoSuc = data => ({type: GET_COCKTAIL_INFO, data});




export const addAppraisal = (id, appraisal) => async (dispatch, getState) => {
  const token = getState().authorization.user.token;
  await axios.post('http://localhost:8000/cocktail/appraisal', {id: id,appraisal: appraisal}, {headers: {'Authorization' : 'Token '+token}});

  dispatch(getCocktailInfo(id));
};

export const publishCocktail = id => async (dispatch, getState) => {
  const token = getState().authorization.user.token;
  await axios.post('http://localhost:8000/admin/cocktail/publish', {id: id}, {headers: {'Authorization' : 'Token '+token}});

  dispatch(getCocktailInfo(id));
};

export const getCocktails = () => async (dispatch, getState) => {
  const role = getState().authorization.user.role;

  if(role === 'admin'){
    const token = getState().authorization.user.token;
    const data = await axios.get('http://localhost:8000/admin/', {headers: {'Authorization' : 'Token '+token}});

    return dispatch(getCocktailsSuc(data.data))
  }

  const data = await axios.get('http://localhost:8000/cocktail/');

  dispatch(getCocktailsSuc(data.data));
};

export const getMyPublication = () => async (dispatch, getState) => {
  const token = getState().authorization.user.token;
  const data = await axios.get('http://localhost:8000/cocktail/myPublications', {headers: {'Authorization' : 'Token '+token}});
  dispatch(getMyPublicationsSuc(data.data));
};

export const getCocktailInfo = id => async (dispatch, getState) => {
  const user = getState().authorization.user;
  const data = await axios.get('http://localhost:8000/cocktail/'+id);

  const index = data.data.appraisals.findIndex(e => e.user === user._id);
  if(index !== -1) data.data.myAppraisal = data.data.appraisals[index].appraisal.toString();

  dispatch(getCocktailInfoSuc(data.data));
};

export const addCocktailAct = data => async (dispatch, getState) => {
  const token = getState().authorization.user.token;
  await axios.post('http://localhost:8000/cocktail', data, {headers: {'Authorization' : 'Token '+token}});
  dispatch(push('/myPublications'))
};