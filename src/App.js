import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

import './App.css'

export default() => {
  
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () =>{
      
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListiner = () =>{
      if(window.scrollY > 30){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListiner);
    return () => {
      window.removeEventListener('scroll', scrollListiner);
    }
  })
  return (
    
    <div className='page'>

      <Header black={blackHeader}/>
      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className='lists'>
        {movieList.map((item,key)=>{
          return(
            <MovieRow key={key} title={item.title} items={item.items}/>
          )
        })}
      </section>
      <footer>
      Created by I. Fontes. Netflix inspered.
      </footer>
      {movieList.length <= 0 &&
      <div className='loading'>
        <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif' alt='loading'/>
      </div>}
    </div>
  );
}