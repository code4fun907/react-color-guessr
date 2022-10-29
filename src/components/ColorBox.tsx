export interface IColorBoxProps {
  background: string | undefined;
  children?: any;
}

export const ColorBox: React.FC<IColorBoxProps> = ({
  background,
  children,
}) => (
  <div
    className="w-56 h-56 flex justify-center items-center border-2 rounded-lg"
    style={{ background }}
  >
    {children}
  </div>
);
