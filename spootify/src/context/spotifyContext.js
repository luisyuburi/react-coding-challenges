import React, { createContext, useState, useEffect } from "react";

import SpotifyServices from "../services/SpotifyServices";

export const spotifyContext = createContext();

const SpotifyProvider = (props) => {
  const [dataCategories, setDataCategories] = useState(null);
  const [dataReleases, setDataReleases] = useState(null);
  const [dataPlaylists, setDataPlaylists] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const authApp = async () => {
      const responseToken = await SpotifyServices.getTokenAuth();
      if (responseToken.access_token) {
        setToken(responseToken.access_token);
      }
    };

    const fetchCategories = async () => {
      const responseCategories = await SpotifyServices.getCategories();
      if (responseCategories) {
        setDataCategories(responseCategories);
      }
    };

    const fetchFeaturedPlaylists = async () => {
      const responsePlaylists = await SpotifyServices.getFeaturedPlaylists();
      if (responsePlaylists) {
        setDataPlaylists(responsePlaylists);
      }
    };
    const fetchNewReleases = async () => {
      const responseNewReleases = await SpotifyServices.getNewReleases();
      if (responseNewReleases) {
        setDataReleases(responseNewReleases);
      }
    };

    authApp();
    fetchCategories();
    fetchNewReleases();
    fetchFeaturedPlaylists();

    // fetchCategories();
  }, []);

  localStorage.setItem("access_token", token);

  return (
    <spotifyContext.Provider
      value={{
        token,
        dataCategories,
        dataPlaylists,
        dataReleases,
      }}
    >
      {props.children}
    </spotifyContext.Provider>
  );
};

export default SpotifyProvider;
