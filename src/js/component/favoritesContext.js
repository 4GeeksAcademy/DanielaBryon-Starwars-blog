import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";



const FavoritesContext = () => {
    const { store, actions } = useContext(Context);
}

useEffect(() => {
    actions.getAllCharacters();
})