import React, { useEffect, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  editMemoContent,
  editMemoPos,
  editMemoSize,
  removeMemo,
} from "../state";

const Memo = ({ id }) => {
  const { width, height, title, desc, color, posX, posY } = useSelector(
    (state) => {
      const index = state.data.memos.findIndex((memo) => memo.id === id);
      return state.data.memos[index];
    }
  );

  const uid = useSelector((state) => state.login.uid) || undefined;

  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { clicked } = useClicked(wrapperRef);
  const { pos, handleMouseDown } = useMemoMove({ x: posX, y: posY });

  const handleSize = () => {
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    dispatch(editMemoSize({ id, uid, width, height }));
  };

  return (
    <MemoWrapper
      ref={wrapperRef}
      w={width}
      h={height}
      left={`${pos.x}px`}
      top={`${pos.y}px`}
      color={color}
      onMouseUp={handleSize}
    >
      <MemoTitle
        value={title}
        onChange={(e) =>
          dispatch(editMemoContent({ id, title: e.target.value, desc, uid }))
        }
      />
      <MemoDescription
        value={desc}
        onChange={(e) =>
          dispatch(editMemoContent({ id, title, desc: e.target.value, uid }))
        }
      />
      {clicked && (
        <MemoHeader
          color={color}
          onMouseDown={handleMouseDown}
          onMouseUp={() =>
            dispatch(editMemoPos({ id, uid, posX: pos.x, posY: pos.y }))
          }
        />
      )}
      {clicked && (
        <MemoDeleteBtn onClick={() => dispatch(removeMemo(id, uid))}>
          <MemoDeleteSvg />
        </MemoDeleteBtn>
      )}
    </MemoWrapper>
  );
};

export default Memo;
