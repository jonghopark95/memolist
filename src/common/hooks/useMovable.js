import { useEffect, useState } from "react";

const useMovable = (ref) => {
  const [movable, setMovable] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = () => {
    setMovable(true);
  };

  const handleMouseUp = () => {
    setMovable(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    setPos({ x: pos.x + e.movementX, y: pos.y + e.movementY });
  };

  useEffect(() => {
    if (movable) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      ref.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
  }, [movable, handleMouseMove]);

  return { handleMouseDown, handleMouseUp };
};

export default useMovable;
