import React, { useRef, useState } from "react";
import {
  MemoDeleteBtn,
  MemoDescription,
  MemoHeader,
  MemoTitle,
  MemoWrapper,
} from "./Memo.style";
import { ReactComponent as MemoDeleteSvg } from "../../assets/delete_memo.svg";
import useClicked from "../../common/hooks/useClicked";
import useMemoMove from "../../common/hooks/useMemoMove";

const Memo = ({ title, desc }) => {
  const [value, setValue] = useState({ title, desc });
  const wrapperRef = useRef(null);
  const { pos, handleMouseDown } = useMemoMove({ x: 50, y: 50 });
  const clicked = useClicked(wrapperRef);

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  return (
    <MemoWrapper ref={wrapperRef} left={`${pos.x}px`} top={`${pos.y}px`}>
      <MemoTitle name="title" value={value.title} onChange={handleChange} />
      <MemoDescription name="desc" value={value.desc} onChange={handleChange} />
      {clicked && <MemoHeader onMouseDown={handleMouseDown} />}
      {clicked && (
        <MemoDeleteBtn>
          <MemoDeleteSvg />
        </MemoDeleteBtn>
      )}
    </MemoWrapper>
  );
};

export default Memo;
