import type { AmenityType } from "@/components/Amenities";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AppContext = createContext<any>(undefined);

export const AppProvider = ({ children }: any) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seqProgress, setSeqProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [photoIndex, setPhotoIndex] = useState(0);
  const focusMeshRef = useRef<any>(null);
  const resetCamRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false); // 跟踪相机是否处于聚焦模式
  const [selectedStore, setSelectedStore] = useState<any>(null); // 跟踪选中的商店数据
  const [distanceVisible, setDistanceVisible] = useState(true); // 跟踪距离圆是否可见
  const [activeAmenity, setActiveAmenity] = useState<null | AmenityType>(null);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [demoImageIndex, setDemoImageIndex] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化检查窗口大小
  }, []);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isLoading,
        setIsLoading,
        seqProgress,
        setSeqProgress,
        activeMenu,
        setActiveMenu,
        selectedOption,
        setSelectedOption,
        focusMeshRef,
        resetCamRef,
        photoIndex,
        setPhotoIndex,
        isFocused,
        setIsFocused,
        selectedStore,
        setSelectedStore,
        distanceVisible,
        setDistanceVisible,
        activeAmenity,
        setActiveAmenity,
        chatVisible,
        setChatVisible,
        demoImageIndex,
        setDemoImageIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
