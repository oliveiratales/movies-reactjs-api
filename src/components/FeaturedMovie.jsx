import React from 'react';
import './FeaturedMovie.css';

export default ({item}) => {

  let firstDate = new Date(item.release_date);
  let genres = [];

  for(let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  let description = '';
  if (item && item.overview) {
    description = item.overview;
    if (description.length > 200) {
      description = description.substring(0, 200) + '...';
    }
  }

  let voteAverage = parseFloat(item.vote_average).toFixed(2);
  
  return (
    <section className="featured" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
        <div className="featured--vertical">
          <div className="featured--horizontal">
            <div className="featured--name"><h1>{item.title}</h1></div>
            <div className="featured--info">
              <div className="featured--points"><i class="fa-solid fa-star"></i> {voteAverage} /10</div>
              <div className="featured--year">{firstDate.getFullYear()}</div>
            </div>
            <div className="featured--description">{description}</div>
            <div className="featured--buttons">
              <a href={`/watch/${item.id}`} className="featured--watchbutton"> Assistir</a>
              <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
            </div>
            <div className="featured--genres"><strong>Gêneros: </strong> {genres.join(', ')}</div>
          </div>
        </div>
    </section>
  )
}