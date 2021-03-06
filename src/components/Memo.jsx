import React, { useEffect, useRef, useState } from "react";
import {
  Color,
  ColorChangeBtn,
  ColorPalette,
  ColorPaletteWrapper,
  FontColorChangeBtn,
  MemoCompleteBtn,
  MemoDeleteBtn,
  MemoDescription,
  MemoHeader,
  MemoTitle,
  MemoWrapper,
} from "./styles/Memo.style";
import { ReactComponent as MemoDeleteSvg } from "../assets/delete_memo.svg";
import { ReactComponent as CompleteSvg } from "../assets/checked.svg";
import { ReactComponent as ColorChangeSvg } from "../assets/palette.svg";
import { ReactComponent as FontColorChangeSvg } from "../assets/font.svg";
import useClicked from "../common/hooks/useClicked";
import useMemoMove from "../common/hooks/useMemoMove";
import { useDispatch, useSelector } from "react-redux";
import { doneMemo, editMemo, removeMemo } from "../todo/state";
import { memoColorPalette } from "./styles/commonStyle";

const Memo = ({ id }) => {
  const uid = useSelector((state) => state.login.uid) || undefined;
  const wrapperRef = useRef(null);
  const colorPaletteRef = useRef(null);
  const { clicked } = useClicked(wrapperRef);
  const { clicked: paletteClicked } = useClicked(colorPaletteRef);
  const {
    width,
    height,
    title,
    desc,
    bg,
    hd,
    posX,
    posY,
    status,
    color,
  } = useSelector((state) => {
    const index = state.data.memos.findIndex((memo) => memo.id === id);
    return state.data.memos[index];
  });
  const { displayName, photoURL } = useSelector((state) => state.login);
  const { pos, handleMouseDown } = useMemoMove({ x: posX, y: posY });
  const [colorPalette, setColorPalette] = useState(false);

  const dispatch = useDispatch();

  const handleSize = () => {
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    dispatch(editMemo({ id, uid, width, height }));
  };

  useEffect(() => {
    const setPos = () => {
      dispatch(editMemo({ id, uid, posX: pos.x, posY: pos.y }));
    };

    if (clicked) {
      wrapperRef.current.style.zIndex = 9998;
      window.addEventListener("mouseup", setPos);
    } else {
      wrapperRef.current.style.zIndex = 0;
      window.removeEventListener("mouseup", setPos);
    }
  }, [clicked, pos]);

  useEffect(() => {
    if (colorPalette && !paletteClicked) {
      setColorPalette(paletteClicked);
    }
  }, [paletteClicked]);

  return (
    <MemoWrapper
      ref={wrapperRef}
      w={width}
      h={height}
      left={`${pos.x}px`}
      top={`${pos.y}px`}
      color={bg}
      fontColor={color}
      onMouseUp={handleSize}
    >
      <MemoTitle
        value={title}
        onChange={(e) =>
          dispatch(editMemo({ id, title: e.target.value, desc, uid }))
        }
      />
      <MemoDescription
        value={desc}
        onChange={(e) =>
          dispatch(editMemo({ id, title, desc: e.target.value, uid }))
        }
      />
      {clicked && <MemoHeader color={hd} onMouseDown={handleMouseDown} />}
      {clicked && (
        <>
          {status !== "complete" && (
            <>
              <MemoCompleteBtn
                onClick={() => {
                  dispatch(editMemo({ id, uid, status: "complete" }));
                  dispatch(doneMemo({ title, displayName, photoURL, uid, bg }));
                }}
              >
                <CompleteSvg />
              </MemoCompleteBtn>

              <FontColorChangeBtn
                onClick={() => {
                  let changeColor;
                  if (color === "#fff") {
                    changeColor = "#000";
                  } else {
                    changeColor = "#fff";
                  }
                  dispatch(editMemo({ id, uid, color: changeColor }));
                }}
              >
                <FontColorChangeSvg />
              </FontColorChangeBtn>

              <ColorChangeBtn onClick={() => setColorPalette((prev) => !prev)}>
                <ColorChangeSvg />
                {colorPalette && (
                  <ColorPaletteWrapper ref={colorPaletteRef}>
                    <ColorPalette>
                      {memoColorPalette.map(({ bg, hd }) => (
                        <Color
                          key={bg}
                          bg={bg}
                          onClick={() =>
                            dispatch(editMemo({ id, uid, bg, hd }))
                          }
                        />
                      ))}
                    </ColorPalette>
                  </ColorPaletteWrapper>
                )}
              </ColorChangeBtn>
            </>
          )}

          <MemoDeleteBtn onClick={() => dispatch(removeMemo(id, uid))}>
            <MemoDeleteSvg />
          </MemoDeleteBtn>
        </>
      )}
    </MemoWrapper>
  );
};

export default Memo;
