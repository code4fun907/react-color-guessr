const WINSKEY = "cg_wins";
const LOSSKEY = "cg_loss";

export const getStoredWins = () => {
  const winCount = localStorage.getItem(WINSKEY);
  if (!winCount) return null;

  return parseInt(winCount);
};

export const setStoredWins = (value: number) => {
  localStorage.setItem(WINSKEY, value.toString());
  return value;
};

export const resetStoredWins = () => setStoredWins(0);

export const getStoredLoss = () => {
  const lossCount = localStorage.getItem(LOSSKEY);
  if (!lossCount) return null;

  return parseInt(lossCount);
};

export const setStoredLoss = (value: number) => {
  localStorage.setItem(LOSSKEY, value.toString());
  return value;
};

export const resetStoredLoss = () => setStoredLoss(0);
