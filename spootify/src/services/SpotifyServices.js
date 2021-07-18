import React from "react";
import { authFetch, fetchData } from "./fetchData";

const SpotifyServices = {
  getTokenAuth: async () => {
    const response = await authFetch.fetch("", {
      method: "POST",
      body: "grant_type=client_credentials",
    });
    if (response && response.status === 200) {
      const responseJson = await response.json();
      return responseJson;
    }
    return false;
  },
  getCategories: async () => {
    const response = await fetchData.fetch("/browse/categories?locale=sv_US", {
      method: "GET",
    });
    if (response && response.status === 200) {
      const responseJson = await response.json();
      return responseJson;
    }
    return false;
  },
  getFeaturedPlaylists: async () => {
    const response = await fetchData.fetch("/browse/featured-playlists", {
      method: "GET",
    });
    if (response && response.status === 200) {
      const responseJson = await response.json();
      return responseJson;
    }
    return false;
  },
  getNewReleases: async () => {
    const response = await fetchData.fetch("/browse/new-releases", {
      method: "GET",
    });
    if (response && response.status === 200) {
      const responseJson = await response.json();
      return responseJson;
    }
    return false;
  },
};

export default SpotifyServices;
