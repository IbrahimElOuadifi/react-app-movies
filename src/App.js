import React, {useState, useEffect} from 'react';
import Movie from './components/movie';
import MovieInfo from './components/movieInfo';
import './App.css';

//const api_url = "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff2f3e6f1f0dbc3345bd73d3cb31b5ff";
const api_url = "https://api.themoviedb.org/3/discover/movie?api_key=ff2f3e6f1f0dbc3345bd73d3cb31b5ff&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=";
const query_api = "https://api.themoviedb.org/3/search/movie?api_key=ff2f3e6f1f0dbc3345bd73d3cb31b5ff&query=";


export default function App() {

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [pageAPI, setPAge] = useState(1);
  const [popup, setPOPUP] = useState(null);
 
  // useEffect(() => {
  //   getMovies(api_url);
  // }, []);

  useEffect(() => {
    query === "" ? getMovies(api_url + pageAPI) : getMovies(query_api+query);
  }, [query, pageAPI]);

  const onChange = e =>  {
    setQuery(e.target.value);
    //console.log(query_api+e.target.value);
  }

  const openMovie = id => {
    console.log(id);
    setPOPUP(id);
  }

  const getMovies = api => {
    fetch(api)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMovies(data.results);
    });
  }

  const closePOPUP = () => {
    setPOPUP(null)
  }

  return (
    <div className="App">
      <nav className="nav">
        <ul>
          <li 
            className="btn" 
            onClick={() => {
              (pageAPI <= 1) ? alert('First Page!') : setPAge(pageAPI - 1);
            }}
          >
            Previous
          </li>
          <li className="btn">{'Page : ' + pageAPI}</li>
          <li 
            className="btn" 
            onClick={() => {
              setPAge(pageAPI + 1);
            }}
          >
            Next
          </li>
        </ul>
        <div className="search-bar">
            <input type="text" onChange={onChange} placeholder="Search..."/>
        </div>
      </nav>
      <div className="main-page">
        <div className="movies-container">
          {
            movies.length !== 0 ?
              movies.map((movie) => {
                return (<Movie key={movie.id} data={movie} openMovie={openMovie}/>);
              })
            :
              <div className="alert alert-warning" role="alert"> No Movie found! </div>
          }
        </div>
      </div>
      {
        popup != null ?
          <MovieInfo popup={popup} closePOPUP={closePOPUP}/>
        :
          console.log(null)
      }
    </div>
  )
}