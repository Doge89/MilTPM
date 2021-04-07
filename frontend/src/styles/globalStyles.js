import { createGlobalStyle } from 'styled-components';

import ArialBlack from '../assets/fonts/arial-black.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Arial Black';
        src: url(${ArialBlack});
    }
`;