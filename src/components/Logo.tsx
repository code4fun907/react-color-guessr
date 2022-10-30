export const Logo = () => (
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
);
