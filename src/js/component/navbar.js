import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.jpg";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";


import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const { characterId } = useParams()
    const navigate = useNavigate()

    const favsCount = store.favorites.length



    return (

        <nav className="navbar bg-body-tertiary bg-black">

            <div className="container-fluid navbar-box">

                <ul className="navbar-nav d-flex flex-row">



                    <li className="nav-item me-lg-0">
                        <a className="nav-link" href="#">
                            <i className="tiktok-link text-white"><FaTiktok /></i>
                        </a>
                    </li>
                    <li className="nav-item me-lg-0">
                        <a className="nav-link" href="#">
                            <i className="insta-link text-white"><SiInstagram />
                            </i>
                        </a>
                    </li>
                    <li className="nav-item me-lg-0">
                        <a className="nav-link" href="#">
                            <i className="x-link text-white"><FaXTwitter /></i>
                        </a>
                    </li>
                    <li className="nav-item me-lg-0">
                        <a className="nav-link" href="#">
                            <i className="facebook-link text-white"><FaFacebook /></i>
                        </a>
                    </li>
                    <li className="nav-item me-lg-0">
                        <a className="nav-link" href="#">
                            <i className="youtube-link text-white separator-before"><FaYoutube /></i>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li className="nav-item me-3 me-lg-0 dropdown">
                        <i className=" text-white btn  dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Favorites: {favsCount}
                        </i>
                        <div className="dropdown-menu text-white" aria-labelledby="dropdownMenu2">
                            <strong>Favoritos:</strong>
                            <ul>
                                {store.favorites.map((favorite, index) => (
                                    <li key={index}>{favorite}<RiDeleteBin6Fill className="deleteIcon" onClick={() => actions.deleteFavorite(index)} /></li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>

                <div className="dropdown">

                </div>
                <div>
                    <Link to="/">
                        <img width="325" height="125" className="m-1" src={Logo} />
                    </Link>
                </div>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" list="suggestions" type="search" placeholder="Search" aria-label="Search"></input>
                    <datalist id="suggestions">
                        <option value="Luke SkyWalker"></option>
                        <option value="darth Vader"></option>
                        <option value="Tatooine"></option>
                        <option value="Sand Crawler"></option>
                        <option value="Obi Wan Kenobi"></option>
                    </datalist>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <ul className="nav nav-tabs nav-justified  pillsSize " id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link to="/characters"
                        data-mdb-tab-init
                        className="nav-link linkTexts"
                        id="ex3-tab-1"
                        href="#ex3-tabs-1"
                        role="tab"
                        aria-controls="ex3-tabs-1"
                        aria-selected="true"
                    >
                        CHARACTERS

                    </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link to="/planets"
                        data-mdb-tab-init
                        className="nav-link linkTexts"
                        id="ex3-tab-2"
                        href="#ex3-tabs-2"
                        role="tab"
                        aria-controls="ex3-tabs-2"
                        aria-selected="false"
                    >
                        PLANETS
                    </Link>
                </li>
                <li className="nav-item " role="presentation">
                    <Link to="/vehicles"
                        data-mdb-tab-init
                        className="nav-link linkTexts"
                        id="ex3-tab-2"
                        href="#ex3-tabs-2"
                        role="tab"
                        aria-controls="ex3-tabs-2"
                        aria-selected="false"
                    >
                        VEHICLES
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar; 