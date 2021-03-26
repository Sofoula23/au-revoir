import React from "react";
import ApartmentIcon from "@material-ui/icons/Apartment";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import EcoIcon from "@material-ui/icons/Eco";
import SpaIcon from "@material-ui/icons/Spa";
import PanoramaIcon from "@material-ui/icons/Panorama";
import PoolIcon from "@material-ui/icons/Pool";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";

const activityTypes = [
  {
    key: "outdoors",
    label: "Outdoors",
    icon: <WbSunnyIcon style={{ fill: "#eba834" }} />,
  },
  {
    key: "indoor",
    label: "Indoor",
    icon: <ApartmentIcon style={{ fill: "#abbac9" }} />,
  },
  {
    key: "ecoFriendly",
    label: "Eco Friendly",
    icon: <EcoIcon style={{ fill: "#72ea6e" }} />,
  },
  {
    key: "water",
    label: "Water",
    icon: <PoolIcon style={{ fill: "#5eade6" }} />,
  },
  {
    key: "cultural",
    label: "Cultural",
    icon: <LocalLibraryIcon style={{ fill: "#f5dc3b" }} />,
  },
  {
    key: "kidsFriendly",
    label: "Kids Friendly",
    icon: <ChildFriendlyIcon style={{ fill: "#824deb" }} />,
  },
  {
    key: "extreme",
    label: "Extreme",
    icon: <SportsHandballIcon style={{ fill: "red" }} />,
  },
  {
    key: "relaxed",
    label: "Relaxed",
    icon: <SpaIcon style={{ fill: "#f7c6f7" }} />,
  },
  {
    key: "sightseeing",
    label: "Sightseeing",
    icon: <PanoramaIcon style={{ fill: "#51ada1" }} />,
  },
];

export default activityTypes;
