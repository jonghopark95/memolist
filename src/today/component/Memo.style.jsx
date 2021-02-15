import styled from "styled-components";

const MemoTitleHeight = "45px";
const MemoDeleteButtonH = "40px";

export const MemoWrapper = styled.div`
  position: absolute;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  padding: 15px;
  background-color: ${({ color }) => color.bg};
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
  background-color: ${({ color }) => color.hd};
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
  padding: 15px 0px;
  width: 100%;
  font-size: 15px;
  background-color: transparent;
`;

// export const MemoEditableDesc = styled(MemoDescription)``;

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
