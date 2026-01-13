import "@css/Amenities.css";
import amenityAll from "@assets/amenities/amenity_all.webp";
import amenityCommercial from "@assets/amenities/amenity_commercial.webp";
import amenityEducation from "@assets/amenities/amenity_education.webp";
import amenityMedical from "@assets/amenities/amenity_medical.webp";
import amenityRts from "@assets/amenities/amenity_rts.webp";
import amenityDistance from "@assets/amenities/amenity_distance.webp";
import { useAppContext } from "@context/AppContext";

export type AmenityType =
  | "all"
  | "commercial"
  | "medical"
  | "education-private"
  | "education-public"
  | "rts"
  | "distance" 
  | null;

interface AmenityButton {
  id: AmenityType;
  label: string;
  image: string;
  alt: string;
}

const amenityButtons: AmenityButton[] = [
  {
    id: "commercial",
    label: "COMMERCIAL",
    image: amenityCommercial,
    alt: "commercial",
  },
  {
    id: "medical",
    label: "MEDICAL",
    image: amenityMedical,
    alt: "medical",
  },
  {
    id: "education-private",
    label: "EDUCATION (PRIVATE)",
    image: amenityEducation,
    alt: "education-private",
  },
  {
    id: "education-public",
    label: "EDUCATION (PUBLIC)",
    image: amenityEducation,
    alt: "education-public",
  },
  {
    id: "rts",
    label: "LRT STATION",
    image: amenityRts,
    alt: "rts-station",
  },
  {
    id: "all",
    label: "SHOW ALL",
    image: amenityAll,
    alt: "show-all",
  }
];

const Amenities = () => {
  const { isFocused , setDistanceVisible,distanceVisible, activeAmenity, setActiveAmenity } = useAppContext();

  const handleAmenityClick = (amenity: AmenityType) => {
    if (activeAmenity === amenity) {
      setActiveAmenity(null)
    } else {
      setActiveAmenity(amenity)
    }
  };

  return (
    <>
      {!isFocused && (
        <div className="amenities">
          <div className="amenities-container">
            {amenityButtons.map((button) => (
              <button
                key={button.id}
                className={`amenity ${activeAmenity === button.id ? "active" : ""
                  }`}
                onClick={() => handleAmenityClick(button.id)}
              >
                <img src={button.image} alt={button.alt} />
                <span>{button.label}</span>
              </button>
            ))}
            <hr />
            <button
              className={`amenity ${distanceVisible ? "active" : ""
                }`}
              onClick={() => setDistanceVisible(!distanceVisible)}
            >
              <img src={amenityDistance} alt="distance" />
              <span>DISTANCE</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Amenities;
