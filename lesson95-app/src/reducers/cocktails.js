import {GET_COCKTAIL_INFO, GET_COCKTAILS, GET_MY_COCKTAILS} from "../actions/cocktail";

const initCocktails = {
    cocktails: [],
    myCocktails: [],
    cocktail: {}
};

const cocktailsReduces = (state = initCocktails, action) => {
    switch (action.type) {
        case GET_COCKTAILS: {
            return {...state, cocktails: action.data}
        }
        case GET_MY_COCKTAILS: {
            return {...state, myCocktails: action.data}
        }
        case GET_COCKTAIL_INFO: {
            return {...state, cocktail: action.data}
        }
        default: return state
    }
};

export default cocktailsReduces;