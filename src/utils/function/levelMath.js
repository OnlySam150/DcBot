export const levelCalculateFunction = (level) => {
  const levelFormel = Math.floor(20 * level ** 2 - 40 * level + 55);

  return { levelFormel };
};

export const yLevelCalulate = (xp) => {
  let level;
  const a = 20;
  const b = -40;
  const c = 55 - xp;

  const diskriminante = b * b - 4 * a * c;

  if (diskriminante < 0) {
    return (level = 0);
  }

  const x = (-b + Math.sqrt(diskriminante)) / (2 * a);

  return (level = Math.floor(x));
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
