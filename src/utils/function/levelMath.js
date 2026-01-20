export const levelCalculateFunction = (level) => {
  const levelFormel = Math.floor(20 * level ** 2 - 40 * level + 55);

  return { levelFormel };
};

export const checkLevelUp = (currentXp, needXp) => {
  let leveledUp;
  if (currentXp >= needXp) {
    leveledUp = true;
  } else {
    leveledUp = false;
  }

  return leveledUp;
};
