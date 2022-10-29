import { useEffect, useState } from "react";
import { ColorBox } from "./components/ColorBox";
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
    <div className="grid h-screen place-items-center">
      <div>
        <h1 className="text-xl mb-2 font-bold">
          {[
            "C text-red-400",
            "O text-green-400",
            "L text-indigo-400",
            "O text-yellow-400",
            "R text-blue-400",
          ].map((color) => (
            <span className={color.split(" ")[1]}>{color.split(" ")[0]}</span>
          ))}{" "}
          Guessr
        </h1>
        <div className="p-2 bg-gray-200 w-auto rounded-md mb-2">
          correct <span className="bg-gray-300 p-1 rounded-xl">{wins}</span> |
          wrong <span className="bg-gray-300 p-1 rounded-xl">{loss}</span>
        </div>
        <div className="flex gap-4">
          <div>
            <ColorBox background={correctAns}>
              {selectedAns && (
                <p
                  className="text-white bg-black p-2 hover:cursor-copy"
                  onClick={() => {
                    navigator.clipboard.writeText(correctAns ? correctAns : "");
                    alert("copied color " + correctAns);
                  }}
                >
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
