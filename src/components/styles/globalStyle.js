import { createGlobalStyle } from "styled-components";
import NexonLv1GothicWoff from "../../common/fonts/NEXON Lv1 Gothic OTF.woff";
import NexonLv1GothicLightWoff from "../../common/fonts/NEXON Lv1 Gothic OTF Light.woff";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'NEXON Lv1 Gothic OTF';
        src: local('NEXON Lv1 Gothic OTF'), url(${NexonLv1GothicWoff}) format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'NEXON Lv1 Gothic Light OTF';
        src: url(${NexonLv1GothicLightWoff}) format('woff');
        font-weight:300px;
    }
    *{
        box-sizing:border-box;
        font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
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
