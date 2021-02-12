import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editMemoContent } from "../../today/state";

const useClicked = (ref) => {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setClicked(true);
      } else {
        let title = ref.current.children[0].innerHTML;
        let desc = ref.current.children[1].innerHTML;
        dispatch(editMemoContent({ title, desc }));
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
