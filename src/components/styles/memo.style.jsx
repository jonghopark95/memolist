import styled from "styled-components";

const MemoTitleHeight = "45px";
const MemoDeleteButtonH = "40px";

export const MemoWrapper = styled.div`
  position: absolute;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  min-width: 300px;
  min-height: 200px;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  padding: 15px 15px 45px 15px;
  background-color: ${({ color }) => color};
  border: 1px solid #605e5e;
  -webkit-box-shadow: 0px 0px 48px -26px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 48px -26px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 48px -26px rgba(0, 0, 0, 0.4);
  resize: both;
  overflow: hidden;
`;

export const MemoHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: ${({ color }) => color};
  cursor: move;
`;

export const MemoTitle = styled.textarea`
  height: ${MemoTitleHeight};
  line-height: ${MemoTitleHeight};
  background-color: transparent;
  font-size: 25px;
  font-weight: bold;
`;

export const MemoDescription = styled.textarea`
  height: calc(100% - ${MemoTitleHeight} - ${MemoDeleteButtonH});
  line-height: 25px;
  padding: 15px 0px;
  width: 100%;
  font-size: 17px;
  background-color: transparent;
  overflow: hidden;
`;

export const MemoDeleteBtn = styled.button`
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: ${MemoDeleteButtonH};
  height: ${MemoDeleteButtonH};
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const MemoCompleteBtn = styled(MemoDeleteBtn)`
  right: 90px;
`;

export const ColorChangeBtn = styled(MemoDeleteBtn)`
  right: 45px;
`;

export const ColorPaletteWrapper = styled.div`
  position: absolute;
  bottom: 45px;
  right: 0px;
  width: 130px;
  height: 130px;
  padding: 10px;
  z-index: 9999;
  border-radius: 10px;
  background-color: white;
`;

export const ColorPalette = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 25% 25% 25% 25%;
`;

export const Color = styled.div`
  background-color: ${({ bg }) => bg};
  cursor: pointer;
  :hover {
    transform: scale(1.5);
    transition: 0.2s;
  }
`;
