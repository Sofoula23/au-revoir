const getPlaceImageUrl = (place, defaultImageUrl) => {
  if (!place.photos.length) {
    return defaultImageUrl;
  }
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
};

export default getPlaceImageUrl;
