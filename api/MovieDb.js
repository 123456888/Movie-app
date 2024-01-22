import axios from "axios";
import { apiKey } from "../constants/index";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMovies = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovies = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMovies = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

const movieDetails = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCredits = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const movieSimilar = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const personDetails = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMovie = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
const searchMovie = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    }
    catch (error) {
        console.log("error", error);
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMovies)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovies)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMovies)
}
export const fetchMovieDetails = id => {
    return apiCall(movieDetails(id));
}
export const fetchMovieCredits = id => {
    return apiCall(movieCredits(id));
}
export const fetchSimilarMovie = id => {
    return apiCall(movieSimilar(id));
}
export const fetchPersonDetails = id => {
    return apiCall(personDetails(id));
}
export const fetchPersonMovies = id => {
    return apiCall(personMovie(id));
}
export const searchMovies = params => {
    return apiCall(searchMovie, params);
}