require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY_TMDB;

const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) =>{
    const req = await fetch(`${API_BASE}${endpoint}`);
    return await req.json();
}

export default {

    getHomeList: async() => {

        return [
            {
                slug: 'originals',
                title: 'Netflix Originals',
                items: await basicFetch(`/discover/tv?with_network=213&language=en&api_key=${API_KEY}`),
            },
            {
                slug: 'trending',
                title: 'Recommend for you',
                items: await basicFetch(`/trending/all/week?language=en&api_key=${API_KEY}`),
            },
            {
                slug: 'toprated',
                title: 'Top',
                items: await basicFetch(`/movie/top_rated?language=en&api_key=${API_KEY}`),
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFetch(`/discover/movie?with_genres=28&language=en&api_key=${API_KEY}`),
            },
            {
                slug: 'comedy',
                title: 'Comedy',
                items: await basicFetch(`/discover/movie?with_genres=35&language=en&api_key=${API_KEY}`),
            },
            {
                slug: 'horror',
                title: 'Horror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=en&api_key=${API_KEY}`),
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=en&api_key=${API_KEY}`),
            },
            {
                slug: 'Documentary',
                title: 'Documentary',
                items: await basicFetch(`/discover/movie?with_genres=99&language=en&api_key=${API_KEY}`),
            }
        ]
    }, 
    getMovieInfo: async(movieId, type)=>{
        let info = {};
        
        if(movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=en&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=en&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }

        return info;
    }
}
