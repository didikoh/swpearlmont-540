import "@css/Menu.css";
import { useAppContext } from "@context/AppContext";
import SelectConcept from "@assets/menu/concept.webp";
import SelectLocation from "@assets/menu/location.webp";
import AiButton from "@assets/menu/Ai-Button.webp";
import Select360VR from "@assets/menu/360VR.webp";
import SelectRegister from "@assets/menu/register.webp";
import ShopImage from "@assets/menu/plot3a/shop.webp";
import TfmImage from "@assets/menu/plot3a/tfm.webp";
import ApartmentImage from "@assets/menu/plot3a/apartment.webp";
import HomeImage from "@assets/menu/plot3a/home.webp";

const Menu = () => {
  const {
    activeMenu,
    setActiveMenu,
    setSelectedOption,
    isFocused,
    resetCamRef,
    focusMeshRef,
    setChatVisible,
    chatVisible,
  } = useAppContext();

  const handleMenuClick = (menu: string) => {
    if (menu === "chatbot") {
      setChatVisible(!chatVisible);
      return;
    }
    if (activeMenu === menu) {
      setActiveMenu("main");
    } else {
      setActiveMenu(menu);
    }
  };

  return (
    <div className="menu">
      <div className={`menu-container ${isFocused ? "plot" : ""}`}>
        {isFocused ? (
          <>
            <button
              className="menu-btn"
              onClick={() => {
                if (resetCamRef.current) {
                  resetCamRef.current();
                }
                handleMenuClick("main");
              }}
            >
              <img src={HomeImage} alt="Home" />
              <span>Home</span>
            </button>
            <button
              className="menu-btn"
              onClick={() => {
                focusMeshRef.current("PLOT 3A-1_Floor_Blocking");
                setActiveMenu("plot3a");
                setSelectedOption("3a1");
              }}
            >
              <img src={ShopImage} alt="PLOT 3A-1" />
              <span>Shop</span>
            </button>
            <button
              className="menu-chatbot-btn"
              onClick={() => {
                handleMenuClick("chatbot");
              }}
            >
              <img src={AiButton} alt="Chatbot" />
            </button>
            <button
              className="menu-btn"
              onClick={() => {
                focusMeshRef.current("TFM(3A-2)");
                setActiveMenu("plot3a");
                setSelectedOption("3a2");
              }}
            >
              <img src={TfmImage} alt="PLOT 3A-2" />
              <span>TFM</span>
            </button>
            <button
              className="menu-btn"
              onClick={() => {
                focusMeshRef.current("Services Apartment(3A-3)_Blocking");
                setActiveMenu("plot3a");
                setSelectedOption("3a3");
              }}
            >
              <img src={ApartmentImage} alt="PLOT 3A-3" />
              <span>Apartment</span>
            </button>
          </>
        ) : (
          <>
            <button
              className={`menu-btn ${activeMenu === "concept" ? "active" : ""}`}
              onClick={() => {
                handleMenuClick("concept");
                setSelectedOption("explore");
              }}
            >
              <img src={SelectConcept} alt="Concept" />
              <span>Concept</span>
            </button>
            <button
              className={`menu-btn ${
                activeMenu === "location" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("location")}
            >
              <img src={SelectLocation} alt="Location" />
              <span>Location</span>
            </button>
            <button
              className="menu-chatbot-btn"
              onClick={() => {
                handleMenuClick("chatbot");
              }}
            >
              <img src={AiButton} alt="Chatbot" />
            </button>
            <button
              className={`menu-btn ${activeMenu === "360vr" ? "active" : ""}`}
              onClick={() => handleMenuClick("360vr")}
            >
              <img src={Select360VR} alt="360VR" />
              <span>360VR</span>
            </button>
            <button
              className={`menu-btn ${
                activeMenu === "register" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("register")}
            >
              <img src={SelectRegister} alt="Register" />
              <span>Register</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
