import React, {useEffect, useState} from 'react';
import css from './Discover.module.css';
import {genres} from "../../assets";
import {SongCard} from "../SongCard/SongCard";
import {axiosService} from "../../services";
import {movieService} from "../../services/movieService";

const Discover = () => {

    const [selectedGenre, setSelectedGenre] = useState(genres[0].title);

    useEffect(()=>{
        movieService.getAllDiscoverGenre().then(value => console.log(value))
    },[])

    return (
        <div className={css.discover_container}>
            <div className={css.discover_block}>
                <div className={css.discover}>Discover {selectedGenre}</div>
                <select onChange={(e) => setSelectedGenre(e.target.value)} className={css.genres_selector}>
                    {genres.map(genre => (
                        <option key={genre.value}
                                className={css.genre}
                                value={genre.value}>{genre.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className={css.songs_container}>
                {[1, 2, 3, 4, 4, 5, 5, 5, 6, 6, 6].map((song, i) => (
                    <SongCard
                        key={i}
                        song={song}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
};

export {Discover};
