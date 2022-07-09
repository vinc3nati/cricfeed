import { GiExpand, GiContract } from "react-icons/gi";
import logo from "../../assets/logo.png";
import { useFullScreen } from "../../hooks/useFullScreen";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

export const Navbar = () => {
  const { isFullScreen, toggleFullScreen } = useFullScreen();
  return (
    <nav className="navbar">
      <div className="main">
        <div className="logo">
          <img src={logo} alt="logo" className="img img-responsive" />
        </div>
        <ThemeSwitcher />
        <div className="nav-links" onClick={toggleFullScreen}>
          {isFullScreen ? (
            <GiContract className="nav-icon" title="Quit Full Screen" />
          ) : (
            <GiExpand className="nav-icon" title="Full Screen" />
          )}
        </div>
      </div>
    </nav>
  );
};
