import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/_app.scss";
import { darkModeContext } from "../../../../context/DarkModeContext";

const ThemeChanger = () => {
  const { options, toggleScreenMode } = useContext(darkModeContext);

  const { color, logo } = options;

  return (
    <div>
      <button className="app__dark-mode-btn icon level-right">
        <FontAwesomeIcon
          icon={logo}
          color={color}
          onClick={() => toggleScreenMode()}
        />
      </button>
    </div>
  );
};

export default ThemeChanger;
