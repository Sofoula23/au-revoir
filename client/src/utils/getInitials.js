export const getInitials = (name) => {
  const nameSplit = name.split(" ");
  const initials = [nameSplit[0][0]];
  if (nameSplit.length > 1) {
    initials.push(nameSplit[1][0]);
  }
  return initials.join("").toUpperCase();
};
