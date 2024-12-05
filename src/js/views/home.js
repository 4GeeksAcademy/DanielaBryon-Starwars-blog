import React, { useState, useEffect, useContext } from "react";
import Carrousel1 from "../../img/Carrousel1.jpg";
import Carrousel2 from "../../img/Carrousel2.jpg";
import Carrousel3 from "../../img/Carrousel3.jpg";
import Carrousel4 from "../../img/Carrousel4.jpg";
import Carrousel5 from "../../img/Carrousel5.jpg";
import Carrousel6 from "../../img/Carrousel6.jpg";
import { Context } from "../store/appContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";


import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const params = useParams();
	const [likedCharacters, setLikedCharacters] = useState([]);
    const [likedPlanets, setLikedPlanets] = useState([]);

	const handleLikeToggle = (item, type, event) => {
        event.stopPropagation();  // evita redireccionar al hacer clic en el botón

        if (type === "character") {
            if (likedCharacters.includes(item.uid)) {
                setLikedCharacters((prev) => prev.filter((id) => id !== item.uid));
            } else {
                setLikedCharacters((prev) => [...prev, item.uid]);
                actions.addFavorites(item.name); 
            }
        } else if (type === "planet") {
            if (likedPlanets.includes(item.uid)) {
                setLikedPlanets((prev) => prev.filter((id) => id !== item.uid));
            } else {
                setLikedPlanets((prev) => [...prev, item.uid]);
                actions.addFavorites(item.name); 
            }
        }
    };


	useEffect(() => {
		actions.getPlanets()
		actions.getCharacters()
	}, [])


	useEffect(() => {
		console.log(store.characters)
	}, [store.characters])




	return (
		<div className="home-sw">
			<h1 className="home-sw-title">The force is with you</h1>

			
			<div className="carousel-container">
				<div id="carouselSW" className="carousel slide carousel-fade">
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src={Carrousel1} className="d-block caro-img" alt="Slide 1" />
						</div>
						<div className="carousel-item">
							<img src={Carrousel2} className="d-block caro-img" alt="Slide 2" />
						</div>
						<div className="carousel-item">
							<img src={Carrousel3} className="d-block caro-img" alt="Slide 3" />
						</div>
						<div className="carousel-item">
							<img src={Carrousel4} className="d-block caro-img" alt="Slide 4" />
						</div>
						<div className="carousel-item">
							<img src={Carrousel5} className="d-block caro-img" alt="Slide 5" />
						</div>
						<div className="carousel-item">
							<img src={Carrousel6} className="d-block caro-img" alt="Slide 6" />
						</div>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselSW" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselSW" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div className="databank-container">
				<div className="card-list-container">

					<h2 className="section-title">Characters
						<Link to="/characters" className="see-more-link">
							<button className="btn-see-more">All Characters</button>
						</Link>
					</h2>

					<div className="card-list">
						{store.characters.slice(0, 14).map((character, index) => (
							<div className="card-item" key={index} onClick={() => navigate(`/characterSingle/${character.uid}`)}>
								<img
									src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
									className="card-img"
									
								/>
								<div className="card-content">
									<h5 className="card-title">{character.name}</h5>
									<div className="card-actions">
										<button className="like-button" onClick={(e) => handleLikeToggle(character, "character", e)} // Detiene la navegación
										>
											{likedCharacters.includes(character.uid) ? <FaHeart className="heart-cards" color="red" /> : <FaRegHeart />}
										</button>
									</div>

								</div>
								
							</div>
						))}
					</div>

				</div>

				<div className="card-list-container">

					<h2 className="section-title">Planets
						<Link to="/planets" className="see-more-link">
							<button className="btn-see-more">All Planets</button>
						</Link>
					</h2>

					<div className="card-list">
						{store.planets.slice(0, 14).map((planet, index) => (
							<div className="card-item" key={index} onClick={() => navigate(`/planets/${planet.uid}`)}>
								<img
									src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
									className="card-img"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src = "https://i.etsystatic.com/23313394/r/il/42204a/2316127314/il_fullxfull.2316127314_93m1.jpg";
									}}
									alt={planet.name}
								/>
								<div className="card-content">
									<h5 className="card-title">{planet.name}</h5>
									<div className="card-actions">
										<button className="like-button" onClick={(e) => handleLikeToggle(planet, "planet", e)} // Detiene la navegación
										>
											{likedPlanets.includes(planet.uid) ? <FaHeart className="heart-cards" color="red" /> : <FaRegHeart />}
										</button>
									</div>
								</div>
								

							</div>
						))}
					</div>

				</div>
			</div>
		</div>


	)
};