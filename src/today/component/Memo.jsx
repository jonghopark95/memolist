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
import { useDispatch, useSelector } from "react-redux";
import { editMemoContent, editMemoPos, removeMemo } from "../state";

const Memo = ({ id }) => {
  const { title, desc, color } = useSelector((state) => {
    const index = state.memos.memo.findIndex((memo) => memo.id === id);
    return state.memos.memo[index];
  });
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const { clicked } = useClicked(wrapperRef);
  const { pos, handleMouseDown } = useMemoMove({ x: 50, y: 50 });

  return (
    <MemoWrapper
      color={color}
      ref={wrapperRef}
      left={`${pos.x}px`}
      top={`${pos.y}px`}
    >
      <MemoTitle
        value={title}
        onChange={(e) =>
          dispatch(editMemoContent({ id, title: e.target.value, desc }))
        }
      />
      <MemoDescription
        value={desc}
        onChange={(e) =>
          dispatch(editMemoContent({ id, title, desc: e.target.value }))
        }
      />
      {clicked && (
        <MemoHeader
          color={color}
          onMouseDown={handleMouseDown}
          onMouseUp={() =>
            dispatch(editMemoPos({ id, posX: pos.x, posY: pos.y }))
          }
        />
      )}
      {clicked && (
        <MemoDeleteBtn onClick={() => dispatch(removeMemo(id))}>
          <MemoDeleteSvg />
        </MemoDeleteBtn>
      )}
    </MemoWrapper>
  );
};

export default Memo;
