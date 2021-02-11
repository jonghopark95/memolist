import { useEffect, useState } from "react";

const useClicked = (ref) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setClicked(true);
      } else {
        setClicked(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref]);

  return clicked;
};

export default useClicked;
