import React, { useState, useEffect } from 'react';

const movie_api = 'https://api.themoviedb.org/3/movie/';
const api_key = '?api_key=ff2f3e6f1f0dbc3345bd73d3cb31b5ff';
const IGM_API = "https://image.tmdb.org/t/p/w1280";

export default function MovieInfo(props) {

    const [dataM, setDATA] = useState(null);

    useEffect(() => {
        fetch(movie_api + props.popup + api_key)
            .then(resp => {
                resp = resp.json()
                .then(data => {
                    setDATA(data);
                });
            });
    },[]);

    useEffect(() => {
        console.log(dataM);
    }, [dataM]);

    const getIMG = img => {
        let img_url;
        img !== null ? img_url = IGM_API + img : img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png";
        return img_url;
    }


    return (
        <div className="movie-page">
                 <div className="popup">
                     <button 
                    className="btn btn-danger"
                    onClick={props.closePOPUP}
                    >
                        Close
                    </button>
                    <img src={dataM === null ? '' : getIMG(dataM.poster_path)} alt=""/>
                    <h1>
                        {dataM === null ? 'Title' : dataM.title}
                    </h1>
                    <p>
                        {dataM === null ? 'Overview' : dataM.overview}
                    </p>
                </div>
            </div>
    )
}