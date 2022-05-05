//declare action types and variables 
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET-FILTER';

//initializes the movies list with movies 
export function setMovies(value) {
    console.log('SET_MOVIES action trigger');
    return {
        type: SET_MOVIES,
        value
    };
}

//sets filter to filter movies 
export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}