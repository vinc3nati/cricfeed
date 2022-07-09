import { useEffect, useState } from "react";

export const useFullScreen = () => {
  const [isFullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen() ||
        document.documentElement.webkitRequestFullScreen() ||
        document.documentElement.mozRequestFullScreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen() ||
          document.webkitCancelFullScreen() ||
          document.mozCancelFullScreen();
      }
    }
  };

  document.documentElement.onfullscreenchange = (e) =>
    setFullScreen((prev) => !prev);

  return { isFullScreen, toggleFullScreen };
};
