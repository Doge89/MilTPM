import styled from 'styled-components'

import { device } from './device'

export const LayoutContainer = styled.div`
    display: flex;
    width: 100%;
    height: 80%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2vw;
        font-weight: bold;
        margin-bottom: 1vh;
    }

    @media ${device.tablet} {
        justify-content: flex-start;
        background-color: black;
        min-height: 84%;

        h1{
            font-size: 7vw;
            text-align: center;
            color: white;
        }
        
    }
`;

export const Plane = styled.div`
    position: relative;
    width: 75%;
    height: 80%;
    background-image: ${props => `url(${props.img})`};
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
`;

export const Indicator = styled.div`
    width: 2%;
    height: 12%;
    background-color: ${props => props.color};
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};

    @media ${device.tablet} {

        width: 80vw;
        height: fit-content;
        top: 0;
        left: 0;
        position: relative;
        display: flex;
        align-items: center;justify-content: center;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        padding: 1vh 0;
        margin-bottom: 1vh;

    }
`;

export const Legend = styled.div`
    width: 100%;
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    padding: 5px;

`

export const LegendContainer = styled.div`
    display: inline-flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 10px 20px;

    div{
        width: 40px;
        height: 40px;
        border-radius: 8px;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2)
    }

    span{
        text-align: left;
        margin-left: 5px;
        letter-spacing: normal;
        text-transform: uppercase;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
    }

`
