import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import "../css/ImageInfo.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const ImageInfo = () => {
  const { activeMenu, setActiveMenu } = useAppContext();
  const [imgArrays, setImgArrays] = useState<any[]>([]);
  const [imgSrc, setImgSrc] = useState<any>(null);

  useEffect(() => {
    switch (activeMenu) {
      case "concept":
        setImgArrays(["Concept/Concept1.png", "Concept/Concept2.png"]);
        break;
      case "location":
        setImgArrays(["Location/Location1.png", "Location/Location2.png"]);
        break;
      case "360vr":
        setImgArrays(["360VR/360Location.png"]);
        break;
      case "register":
        setImgArrays(["Register/Register.png"]);
        break;
      default:
        break;
    }
  }, [activeMenu]);

  useEffect(() => {
    setImgSrc(imgArrays[0]);
  }, [imgArrays]);

  const nextPage = () => {
    setImgSrc((prevSrc: any) => {
      const currentIndex = imgArrays.indexOf(prevSrc);
      const nextIndex = (currentIndex + 1) % imgArrays.length;
      return imgArrays[nextIndex];
    });
  };

  const prevPage = () => {
    setImgSrc((prevSrc: any) => {
      const currentIndex = imgArrays.indexOf(prevSrc);
      const prevIndex =
        (currentIndex - 1 + imgArrays.length) % imgArrays.length;
      return imgArrays[prevIndex];
    });
  };

  return (
    <>
      {(activeMenu == "concept" ||
        activeMenu == "location" ||
        activeMenu == "register" ||
        activeMenu == "360vr") && (
        <div className="imageInfo">
          <div
            className="imageInfo-overlay"
            onClick={() => setActiveMenu("")}
          ></div>
          {imgArrays.length > 1 && (
            <button className="btn" onClick={() => nextPage()}>
              <FaChevronLeft />
            </button>
          )}
          <img
            src={import.meta.env.BASE_URL + imgSrc}
            alt={imgSrc}
            className="images"
          />
          {imgArrays.length > 1 && (
            <button className="btn" onClick={() => prevPage()}>
              <FaChevronRight />
            </button>
          )}
          <button
            className="close"
            onClick={() => {
              setActiveMenu("");
            }}
          >
            <MdClose />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageInfo;
