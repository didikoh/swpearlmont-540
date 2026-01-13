import { useEffect, useState } from "react";
import Model from "./components/MyScene";
// import UI from "./components/UI";
// import Chat from "./components/Chat";
// import { useAppContext } from "@context/AppContext";
// import ImageInfo from "./components/ImageInfo";
import "./App.css";

const App = () => {
  // const { chatVisible, setChatVisible } = useAppContext();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (progress >= 101) {
      setIsLoading(false);
    }
  }, [progress]);

  return (
    <div className="app">
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-screen-spinner"></div>
          <div>Loading map...</div>
          <div className="loading-progress-bar">
            <div
              className="loading-progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-progress-text">
            Total Loaded:{Math.round(progress)}%
          </div>
        </div>
      )}
      <Model onProgress={setProgress} />
      {/* <UI /> */}
      {/* <ImageInfo /> */}
      {/* {chatVisible && <Chat onClose={() => setChatVisible(false)} />} */}
    </div>
  );
};

export default App;
