import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../store/appContext";
import Logo from "../../img/Logo.jpg";
import { FaYoutube, FaTiktok, FaSearch, FaFacebook } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";

import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchContainerRef = useRef(null);
    const [activeLink, setActiveLink] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const favsCount = store.favorites.length;

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            const results = store.data.filter(item => 
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredResults(results);
            setIsSearchActive(false);
        }
    };




    return (

        <nav className="navbar bg-body-tertiary">
            <div className="navbar-box">
                <div className="navbar-top">
                    <ul className="navbar-links">
                        <li className="nav-item me-lg-0">
                            <a className="nav-links" href="#">
                                <i className="tiktok-link text-white"><FaTiktok /></i>
                            </a>
                        </li>
                        <li className="nav-item me-lg-0">
                            <a className="nav-links" href="#">
                                <i className="insta-link text-white"><SiInstagram /></i>
                            </a>
                        </li>
                        <li className="nav-item me-lg-0">
                            <a className="nav-links" href="#">
                                <i className="x-link text-white"><FaXTwitter /></i>
                            </a>
                        </li>
                        <li className="nav-item me-lg-0">
                            <a className="nav-links" href="#">
                                <i className="facebook-link text-white"><FaFacebook /></i>
                            </a>
                        </li>
                        <li className="nav-item me-lg-0">
                            <a className="nav-links" href="#">
                                <i className="youtube-link text-white separator-before"><FaYoutube /></i>
                            </a>
                        </li>
                    </ul>
                    <div className="navbar-logo">
                        <Link to="/" onClick={() => setActiveLink(null)}>
                            <img width="315" height="125" className="logo-nav" src={Logo} alt="Star Wars Logo" />
                        </Link>
                    </div>
                    <div className="navbar-actions">
                        <div className="search-container" ref={searchContainerRef}>
                            <form onSubmit={handleSearch}>
                                <button
                                    className="search-btn"
                                    onClick={() => setIsSearchActive(true)}
                                    type="button"
                                >
                                    <FaSearch />
                                    {!isSearchActive && <span>Search</span>}
                                </button>
                                {isSearchActive && (
                                    <input
                                        className="search-input"
                                        type="text"
                                        placeholder="Search"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        autoFocus
                                    />
                                )}
                            </form>
                        </div>
                        <div className="nav-item me-lg-0 dropdown">
                            <button
                                className="favorites-nav btn dropdown-toggle"
                                type="button"
                                id="dropdownMenu2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Favorites: {favsCount}
                            </button>
                            <ul className="dropdown-menu text-white" aria-labelledby="dropdownMenu2">
                                {store.favorites.length === 0 ? (
                                    <li className="dropdown-item text-white">No favs yet</li>
                                ) : (
                                    store.favorites.map((favorite, index) => (
                                        <li key={index} className="dropdown-item">
                                            {favorite}
                                            <RiDeleteBin6Fill
                                                className="deleteIcon"
                                                onClick={() => actions.deleteFavorite(index)}
                                            />
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <ul className="nav nav-underline justify-content-center nav-justified pillsSize" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link
                        to="/characters"
                        className={`nav-link linkTexts ${activeLink === 'characters' ? 'active' : ''}`}
                        onClick={() => setActiveLink('characters')}
                        role="tab"
                    >
                        CHARACTERS
                    </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link
                        to="/planets"
                        className={`nav-link linkTexts ${activeLink === 'planets' ? 'active' : ''}`}
                        onClick={() => setActiveLink('planets')}
                        role="tab"
                    >
                        PLANETS
                    </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link
                        to="/vehicles"
                        className={`nav-link linkTexts ${activeLink === 'vehicles' ? 'active' : ''}`}
                        onClick={() => setActiveLink('vehicles')}
                        role="tab"
                    >
                        VEHICLES
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar; 