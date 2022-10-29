import { useEffect, useState } from "react";
import { generateRandomHexColor, pickRandomFromArray } from "./utils";

export const App: React.FC = () => {
  const [correctAns, setCorrectAns] = useState<string>();
  const [allAns, setAllAns] = useState<string[]>();
  const [[wins, loss], setWinsLoss] = useState<[number, number]>([0, 0]);
  const [selectedAns, setSelectedAns] = useState<string>();

  const resetGame = () => {
    setSelectedAns("");
    setAllAns([
      generateRandomHexColor(),
      generateRandomHexColor(),
      generateRandomHexColor(),
    ]);
  };

  const chooseCorrect = () =>
    setCorrectAns(pickRandomFromArray(allAns ? allAns : []));

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    chooseCorrect();
  }, [allAns]);

  const incrementWin = () => setWinsLoss((old) => [old[0] + 1, old[1]]);
  const incrementLoss = () => setWinsLoss((old) => [old[0], old[1] + 1]);

  const handleGuess = (ans: string) => {
    if (ans === correctAns) {
      incrementWin();
      setSelectedAns(ans);
    } else {
      incrementLoss();
      setSelectedAns(ans);
    }
  };

  return (
    <div className="app">
      W:{wins} - L:{loss}
      <div className="color-box" style={{ background: correctAns }}>
        {selectedAns && correctAns}
      </div>
      {allAns?.map((ans) => (
        <button
          key={ans}
          onClick={() => handleGuess(ans)}
          disabled={!!selectedAns}
        >
          {ans}
        </button>
      ))}
      <div className="color-box" style={{ background: selectedAns }}></div>
      {selectedAns && (
        <div>
          <p>{selectedAns === correctAns ? "CORRECT" : "WRONG"}</p>
          <button onClick={resetGame}>reset game</button>
        </div>
      )}
    </div>
  );
};
