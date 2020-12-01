import React, { Component } from 'react';

const IGM_API = "https://image.tmdb.org/t/p/w1280"

function getIMG(img){
    let img_url;
    img !== null ? img_url = IGM_API + img : img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png";
    return img_url;
}
 
export default class movie extends Component {

    getColor = (rate) => {
        let color;
        //console.log(typeof(rate), rate);
        rate < 6 ? color = 'red' : rate < 8 ? color = 'orange' : color = 'green';
        return color;
        
    }

    render() {

        const {id, title, poster_path, vote_average} = this.props.data;

        return (
            <div className="movie" title={title} onClick={this.props.openMovie.bind(this,id)}>
                <img style={img_style} src={getIMG(poster_path)} alt={title}/>
                <div className="info">
                    <div className="title">{title}</div>
                    <div className={'rating ' + this.getColor(vote_average)}>{vote_average}</div>
                </div>
            </div>
        )
    }
}

const img_style = {
    width: "100%"
}
