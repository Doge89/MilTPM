import styled from 'styled-components'

import { device } from './device' 

const red = "rgb(254, 13, 46)"

export const TopBarContainer = styled.header`
    width: 100%;
    height: 16%;

    #logo-mobile{
        display: none;
    }

    nav{
        width: 94%;
        height: 100%;
        padding: 0 3%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-image: url(${props => props.img});
        background-repeat: no-repeat;
        background-size: cover;

        .row{
            display: flex;
            align-items: center;
            flex-direction: row;
            width: 55vw;
            justify-content: space-between;
        }
    }

    @media ${device.tablet} {
        #logo-mobile{
            display: block;
            width: 20vw
        }

        nav{
            background-color: black;
            background-image: url('');

            .row{
                display: none;
            }
        }
    }
    
`;

export const Textarea = styled.textarea`
    height: ${props => props.height};
    border: ${props => props.border || '0'};
    font-size: ${props => props.size || '1vw'};
    padding: ${props => props.padding || '0.2vw'};
    width: 100%;
    appearance: none;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    
    height: 100%;

    &.border-bottom{
        border: 0;
        border-bottom: 1px solid rgb(83, 83, 83);
    }
    &.text-align{ text-align: center; }
`;

export const Input = styled.input`
    font-size: ${props => props.size || '1vw'};
    padding: ${props => props.padding || '0.2vw'};
    width: ${props => props.width || '100%'};
    margin: ${props => props.margin || '0'};
    border: ${props => props.border || '0'};
    border-radius: ${props => props.borderRadius || '0'};
    appearance: none;
    font-family: Arial, Helvetica, sans-serif;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
    }

    &.border-bottom{
        border: 0;
        border-bottom: 1px solid rgb(83, 83, 83);
    }
    &.text-align{ text-align: center; }
`;

export const Label = styled.label`
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${props => props.size || '1vw'};
    margin: ${props => props.margin || ' 0 0.5vw 0 0'};
    color: ${props => props.color};
    width: ${props => props.width};
`;

export const Image = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    cursor: pointer;
`;

export const ClockContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 3vw;
        color: white;
        margin: 0;
    }

    h2{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.2vw;
        color: white;
        margin: 0;
    }

    @media ${device.tablet}{
        &#clock-desktop{ display: none; }
    }
`;

export const NavbarMobile = styled.div`
    display: none;
    @media ${device.tablet}{
        width: 60vw;
        position: absolute;
        left: 100vw;
        height: 90vh;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: transform 0.2s linear;
        background-color: black;
        top: 0;
        padding: 5vh 0;
    }
`

export const ClockSlide = styled.div`
    display: none;

    @media ${device.tablet}{
        display: flex;
        position: absolute;
        top: 5vh;
        right: 0;
        background-color: white;
        height: 5vh;
        width: 40vw;
        border-bottom-left-radius: 5vh;
        border-top-left-radius: 5vh;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 4vw;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        transition: transform 0.2s linear;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    padding: ${props => props.padding || '0'};
    margin: ${props => props.margin || '0'};
    cursor: ${props => props.cursor || 'default'};
    background-color: ${props => props.bgColor || 'transparent'};
    border-radius: ${props => props.borderRadius || '0'};

    &.border-right{ border-right: ${props => props.borderRight || '1px solid rgba(80, 80, 80, 0.5)'} }
    &.border-bottom{ border-bottom: ${props => props.borderBottom || '1px solid rgba(80, 80, 80, 0.5)'} }
    &.border-left{ border-left: ${props => props.borderLeft || '1px solid rgba(80, 80, 80, 0.5)'} }
    &.border-top{ border-top: ${props => props.borderTop || '1px solid rgba(80, 80, 80, 0.5)'} }
    &.bg{
        background-image: url(${props => props.img});
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }

    h2, p{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1vw;
        margin: ${props => props.marginText || '0'};
        font-weight: normal;
        text-align: center;
    }
`;

export const Title = styled.h1`
    font-size: ${props => props.size};
    color: ${props => props.color};
    font-style: ${props => props.fontStyle || 'normal'};
    font-weight: ${props => props.weight || 'bold'};
    margin: ${props => props.margin || '0'};
    font-family: ${props => `${props.black ? "'Arial Black', " : ''}Arial, Helvetica, sans-serif`};
`

export const ButtonPrimary = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: ${props => props.size || '1vw'};
    background-color: ${red};
    margin: 1vw 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    border: 0;
    cursor: pointer;
    border-radius: 0.5vw;
    font-weight: bold;

    &.size-effect{
        transition: all 0.1s;
        font-size: 1.2vw;
    }
`

export const ButtonSecondary = styled.button`
    width: ${props => props.width};
    height: ${props => props.height};
    font-size: ${props => props.size || '1vw'};
    background-color: white;
    margin:  ${props => props.margin || '1vw 0'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${red};
    font-family: Arial, Helvetica, sans-serif; 
    border: 1px solid ${red};
    cursor: pointer;
    border-radius: 0.5vw;
    font-weight: bold;

    &:hover{
        &.size-effect{
            transition: all 0.1s;
            font-size: 1.2vw;
        }
        
    }
`

export const Text = styled.span`
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin || '0'};
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${props => props.size || '1vw'};
    color: ${props => props.color};
    font-weight: ${props => props.weight || 'normal'};
`
export const Next = styled.span`
    background-color: ${red};
    color: white;
    font-size: 1.2vw;
    padding: 1vh 1vw;
    position: absolute;
    top: 2vh;
    right: 2vw;
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const RadioButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: ${props => props.width};

    .radio-button{
        width: 1.5vw;
        height: 1.5vw;
        border-radius: 1.5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 1px solid black;
        background-color: white;

        div{
            width: 1vw;
            height: 1vw;
            border-radius: 1vw;
            background-color: ${props => props.checked ? red : 'white'};
        }
    }

    span{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1vw;
        color: ${props => props.color || 'black'};
        margin-left: 1vw;
    }
`;