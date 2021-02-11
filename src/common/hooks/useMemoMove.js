import { useEffect, useState } from "react";

const useMemoMove = ({ x, y }) => {
  const [dragable, setDragable] = useState(false);
  const [pos, setPos] = useState({ x, y });
  const [rel, setRel] = useState(null);

  const handleMouseDown = (e) => {
    setDragable(true);
    const { clientX, clientY } = e;
    setRel({ x: clientX, y: clientY });
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setDragable(false);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { x: oldClientX, y: oldClientY } = rel;
      const { x: oldX, y: oldY } = pos;
      let newX = oldX - (oldClientX - clientX);
      let newY = oldY - (oldClientY - clientY);
      if (newX < 50) newX = 50;
      if (newY < 50) newY = 50;

      setPos({ x: newX, y: newY });
    };

    if (dragable) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  }, [dragable]);

  return { pos, handleMouseDown };
};

export default useMemoMove;
