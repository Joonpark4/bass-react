import "./App.css";
import { Fret } from "./assets/Fret";

interface FretCodes {
  E: string[];
  A: string[];
  D: string[];
  G: string[];
}

function App() {
  const fretCodes: FretCodes = {
    G: ["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G"],
    D: ["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D"],
    A: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A"],
    E: ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"],
  };

  const baseFrequencies = {
    E: 41.2,  // 4번 줄 (E)
    A: 55.0,  // 3번 줄 (A)
    D: 73.4,  // 2번 줄 (D)
    G: 98.0   // 1번 줄 (G)
    // E: 82.4, // 4번 줄 (E)
    // A: 110.0, // 3번 줄 (A)
    // D: 146.8, // 2번 줄 (D)
    // G: 196.0, // 1번 줄 (G)
  };


  // 프렛 클릭 시 실행될 함수
  const handleFretClick = (frequency: number, code:string) => {
    console.log(`Fret code: ${code}`);
    const audioContext = new (window.AudioContext || window.AudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 500); // 0.5초 동안 재생
  };
  
    // 각 줄과 프렛에 대한 주파수 계산
    const calculateFrequency = (baseFreq: number, fret: number) => {
      return baseFreq * Math.pow(2, fret / 12);
    };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(13, 1fr)",
          border: "4px solid black",
        }}>
        {Object.keys(fretCodes).map((string) =>
          fretCodes[string as keyof typeof fretCodes].map((code, index) => {
            const baseFreq = baseFrequencies[string as keyof typeof baseFrequencies];
            const frequency = calculateFrequency(baseFreq, index);
            return (
              <Fret key={`${string}-${index}`} code={code} frequency={frequency} onClick={handleFretClick} title={index} />
            );
          })
        )}
      </div>
      <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(13, 1fr)",
        border: "4px solid white",
      }}
      >
        {Array.from({ length: 13 }).map((_, index) => (
          <div
            key={index}
            style={{
              width: "80px",
              height: "20px",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            { index === 3 || index === 5 || index === 7 || index === 9 ? "●" : index === 12 ? "●●" : ""}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
