export interface IColorBoxProps {
  background: string | undefined;
  children?: any;
  copyText?: string;
}

export const ColorBox: React.FC<IColorBoxProps> = ({
  background,
  children,
  copyText,
}) => (
  <div
    className="w-56 h-56 flex justify-center items-center border-2 rounded-lg hover:cursor-copy"
    style={{ background }}
    onClick={() => {
      navigator.clipboard.writeText(copyText ? copyText : "");
      if (copyText) alert("copied color " + copyText);
    }}
  >
    {children}
  </div>
);
