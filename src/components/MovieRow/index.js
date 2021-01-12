import React, {useState} from 'react';
import './movieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default({title,items}) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () =>{
        if(scrollX < 0){
            setScrollX(scrollX+Math.round(window.innerWidth/2));
        }
    }
    
    const handleRightArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2); //New scroll position
        let listW = (items.results.length*150)+70;                //Max scroll position

        if((window.innerWidth - listW) > x){
            x = (window.innerWidth - listW)
        }
        
        setScrollX(x);
    }
    
    return(
        <div className='movieRow'>
            <h2>{title}</h2>
            <div className='movieRow--left'>
                <NavigateBeforeIcon className='navigateBeforeLeft' style={{fontSize:50}} onClick={handleLeftArrow}/>
            </div>
            <div className='movieRow--right'>
                <NavigateNextIcon className='navigateBeforeRight' style={{fontSize:50}} onClick={handleRightArrow}/>
            </div>
            <div className='movieRow--listarea'>
                <div className='movieRow--list' style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}> 
                    {items.results.length > 0 && items.results.map((item,key)=>{
                        return(
                            <div key={key} className='movieRow--item'>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}