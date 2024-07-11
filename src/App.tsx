import { useEffect, useState } from "react";
import throttle from "lodash.throttle";

function App() {
  const [pos, setXPos] = useState({ x: 0, y: 0 });

  // throttle prevents this function to run lots of times per second
  // so this way we can avoid causing performance issues :D
  const handleMouseMove = throttle((e: MouseEvent) => {
    const mouseX = e.x;
    const mouseY = e.y;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // goes from 0 to 1
    // or could be from 0 to 100 if mouseX * 100! :)
    setXPos({ x: (mouseX * 1) / screenWidth, y: (mouseY * 1) / screenHeight });
  }, 50);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    console.log(pos);
  }, [pos]);

  return (
    <>
      <p
        style={{
          transform: `translate(${15 * pos.x}%, ${30 * pos.y}%)`,
          transition: `0.2s`,
          backgroundColor: "#CCCCFF",
          color: "#000000",
          padding: "1rem",
          borderRadius: ".3rem",
        }}
      >
        Move your mouse!
      </p>
    </>
  );
}

export default App;
