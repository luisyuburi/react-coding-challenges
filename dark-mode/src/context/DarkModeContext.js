import React, { useState, createContext, useEffect } from "react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const darkModeContext = createContext();

const Themes = {
  dark: {
    color: "Orange",
    logo: faSun,
  },
  light: {
    color: "Black",
    logo: faMoon,
  },
};
const DarkModeProvider = (props) => {
  const initialScreenMode = localStorage.getItem("Theme");

  const [screenMode, setScreenMode] = useState(
    initialScreenMode ? initialScreenMode : "light"
  );
  const [options, setOptions] = useState(Themes[screenMode]);

  const toggleScreenMode = () => {
    const newScreenModeValue = screenMode === "light" ? "dark" : "light";
    setScreenMode(newScreenModeValue);
  };

  useEffect(() => {
    localStorage.setItem("Theme", screenMode);
    setOptions(Themes[screenMode]);
    if (screenMode === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [screenMode]);

  return (
    <darkModeContext.Provider
      value={{
        screenMode,
        setScreenMode,
        options,
        toggleScreenMode,
      }}
    >
      {props.children}
    </darkModeContext.Provider>
  );
};

export default DarkModeProvider;
