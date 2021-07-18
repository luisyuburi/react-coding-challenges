import React, { useState, useContext, useEffect } from "react";

import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";

import "../styles/_discover.scss";
import { spotifyContext } from "../../../context/spotifyContext";

const Discover = () => {
  const { dataCategories, dataPlaylists, dataReleases } =
    useContext(spotifyContext);
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (dataCategories && dataCategories.categories) {
      const listCategories = dataCategories.categories.items.map((category) => {
        return category;
      });
      setCategories(listCategories);
    }

    if (dataPlaylists && dataPlaylists.playlists) {
      const listPlaylists = dataPlaylists.playlists.items.map((playlist) => {
        return playlist;
      });
      setPlaylists(listPlaylists);
    }

    if (dataReleases && dataReleases.albums) {
      const listNewReleases = dataReleases.albums.items.map((release) => {
        return release;
      });
      setNewReleases(listNewReleases);
    }
  }, [dataCategories, dataPlaylists, dataReleases]);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
      />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
    </div>
  );
};

export default Discover;
