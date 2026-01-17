import { getLevelData, updateLevelData } from "../../api/levelApi";

const levelCalculateFunction = (level) => {
  const levelFormel = Math.floor((20 * level) ^ (2 - 40 * level + 55));

  return { levelFormel };
};

const checkLevelUp = (currentXp, needXp) => {
  let leveledUp;
  if (currentXp >= needXp) {
    leveledUp = true;
  } else {
    leveledUp = false;
  }

  return leveledUp;
};

export const levelFunction = async (message) => {
  const userId = message.author.id;
  const levelData = await getLevelData(userId);
  let newLevel;

  const userLevel = levelData.level ? levelData.level : 1;
  const userXp = levelData.xp ? levelData.xp : 0;

  const newXp = Math.floor(userXp + 1);
  const needXp = await levelCalculateFunction(userLevel);
  const leveledUp = await checkLevelUp(newXp, needXp.levelFormel);

  if (leveledUp) {
    newLevel = userLevel + 1;
  } else {
    newLevel = userLevel;
  }

  await updateLevelData(userId, newLevel, newXp);
};
