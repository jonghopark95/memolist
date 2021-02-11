import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing:border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }
    html{
        height:100%;
    }
    body{
        height:100%;
    }
    textarea{
        all: unset;
    }
`;

export default GlobalStyle;
