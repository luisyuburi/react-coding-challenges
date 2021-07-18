import config from "../config";

const url = config.api;
const { authUrl, baseUrl, clientId, clientSecret } = url;

const httpAuthHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
};

const token = localStorage.getItem("access_token");

const httpHeaders = {
  Authorization: "Bearer " + token,
};

export const authFetch = {
  fetch: async (url, options) => {
    const headers = new Headers({
      ...httpAuthHeaders,
    });
    return fetch(authUrl + url, {
      ...options,
      headers: headers,
      data: "grant_type=client_credentials",
    });
  },
};

export const fetchData = {
  fetch: async (url, options) => {
    const headers = new Headers({
      ...httpHeaders,
    });
    return fetch(baseUrl + url, {
      ...options,
      headers: headers,

      data: "grant_type=client_credentials",
    });
  },
};
