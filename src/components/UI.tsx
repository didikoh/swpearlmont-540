import Menu from "./Menu";
import Amenities from "./Amenities";
import logo from "@assets/common/logo.png";
import { useAppContext } from "@context/AppContext";

const UI = () => {
  const { resetCamRef } = useAppContext();
  return (
    <div className="ui">
      <Amenities />
      <div className="logo" onClick={() => resetCamRef.current?.()}>
        <img src={logo} alt="Logo" />
      </div>
      <div className="demo-text">DEMO</div>
      <Menu />
    </div>
  );
};

export default UI;
