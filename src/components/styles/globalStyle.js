import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'NEXON Lv1 Gothic OTF Light';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF Light.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    *{
        box-sizing:border-box;
        font-family: "NEXON Lv1 Gothic OTF Light", sans-serif;
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
    #root{
        height:100%;
    }
`;

export default GlobalStyle;
