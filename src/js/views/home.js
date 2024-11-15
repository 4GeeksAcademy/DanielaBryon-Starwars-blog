import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { Context} from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const navigate = useNavigate();
	

	useEffect(() => {
		actions.getCharacters();
		actions.getPlanets();
	}, [])



	useEffect(() => {
		console.log(store.getCharacters)
	},[ store.characters])



	return (
		<div className="container">
			<h1 className="tittle">Welcome to Star Wars Blog</h1>
		</div>
	)
}