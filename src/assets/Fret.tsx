// 프렛 컴포넌트
interface FretProps {
  code: string;
  frequency: number;
  title:number;
  onClick: (frequency: number, code:string) => void;
}

export const Fret = ({ code, onClick, title, frequency }: FretProps) => {
  return (
    <div
      style={{
        width: "80px",
        height: "40px",
        backgroundColor: title===0 ?"black" :"#914b2f",
        border: "1px solid white",
        borderLeft: "3px solid silver",
        cursor: "pointer",
        textAlign: "center",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => onClick(frequency, code)}
    >
      {title===0 ?"개방현" :""}
    </div>
  );
};