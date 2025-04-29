import React, { useEffect } from "react";

type DarkModeHook = () => [boolean, (mode: boolean) => void];

const useDarkMode: DarkModeHook = () => {
  const getInitialMode = (): boolean => {
    const savedMode = window.localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  };

  const [isDark, setIsDark] = React.useState(getInitialMode);

  const setDarkMode = (mode: boolean) => {
    setIsDark(mode);
    window.localStorage.setItem("darkMode", JSON.stringify(mode));
  };

  useEffect(() => {
    const body = window.document.body;
    const classNames = {
      dark: "dark",
      light: "light",
    };

    if (isDark) {
      body.classList.add(classNames.dark);
      body.classList.remove(classNames.light);
    } else {
      body.classList.add(classNames.light);
      body.classList.remove(classNames.dark);
    }
  }, [isDark]);

  return [isDark, setDarkMode];
};

export default useDarkMode;