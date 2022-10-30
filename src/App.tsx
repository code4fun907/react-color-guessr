import { useEffect, useState } from "react";
import { ColorBox } from "./components/ColorBox";
import { Logo } from "./components/Logo";
import { WelcomeModal } from "./components/WelcomeModal";
import {
  getStoredLoss,
  getStoredWins,
  resetStoredLoss,
  resetStoredWins,
  setStoredLoss,
  setStoredWins,
} from "./localStorage";
import { generateRandomHexColor, pickRandomFromArray } from "./utils";

export const App: React.FC = () => {
  const [correctAns, setCorrectAns] = useState<string>();
  const [allAns, setAllAns] = useState<string[]>();
  const [[wins, loss], setWinsLoss] = useState<[number, number]>([0, 0]);
  const [selectedAns, setSelectedAns] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>(true);

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

  const restoreWinLossData = () => {
    const storedWins = getStoredWins();
    const storedLoss = getStoredLoss();

    if (storedWins) setWinsLoss((old) => [storedWins, old[1]]);
    if (storedLoss) setWinsLoss((old) => [old[0], storedLoss]);
  };

  useEffect(() => {
    restoreWinLossData();
    resetGame();
  }, []);

  useEffect(() => {
    chooseCorrect();
  }, [allAns]);

  useEffect(() => {
    setStoredWins(wins);
    setStoredLoss(loss);
  }, [wins, loss]);

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
    <div className="grid h-screen place-items-center">
      <WelcomeModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
      <div>
        <Logo />
        <div className="py-2 px-4 bg-gray-200 w-auto rounded-md mb-2 flex items-center justify-between">
          <div>
            correct{" "}
            <span className="bg-gray-300 p-1 rounded-xl text-">{wins}</span> |
            wrong <span className="bg-gray-300 p-1 rounded-xl">{loss}</span>
          </div>
          <button
            className="bg-green-400 px-2 py-1 rounded-md hover:bg-green-600"
            onClick={() => {
              resetStoredWins();
              resetStoredLoss();
              window.location.reload();
            }}
          >
            reset
          </button>
        </div>
        <div className="flex gap-4">
          <div>
            <ColorBox background={correctAns} copyText={correctAns}>
              {selectedAns && (
                <p className="text-white bg-black p-2 hover:cursor-copy">
                  {correctAns}
                </p>
              )}
            </ColorBox>
            <div className="flex flex-col gap-2 mt-2">
              {allAns?.map((ans) => (
                <button
                  key={ans}
                  onClick={() => handleGuess(ans)}
                  disabled={!!selectedAns}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-200"
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
          <div>
            <ColorBox background={selectedAns}>
              {selectedAns && (
                <p className="text-white bg-black p-2">
                  {selectedAns === correctAns ? "CORRECT" : "WRONG"}
                </p>
              )}
            </ColorBox>
            {selectedAns && (
              <div className="mt-2 flex flex-col">
                <button
                  className="px-4 py-2 bg-green-400 rounded-md hover:bg-green-600"
                  onClick={resetGame}
                >
                  continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
