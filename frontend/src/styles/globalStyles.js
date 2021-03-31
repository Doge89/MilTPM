import { createGlobalStyle } from 'styled-components';

import NameOfYourFontWoff from './nameOfYourFont.woff';
import NameOfYourFontWoff2 from './nameOfYourFont.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'Font Name';
        src: url(${NameOfYourFontWoff}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;