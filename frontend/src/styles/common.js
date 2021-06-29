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

        .clock-container{
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 2.5vw;

            svg{
                margin-right: 2vw;
                cursor: pointer;
            }
        }
    }

    @media ${device.tablet} {
        #logo-mobile{
            display: block;
            width: 20vw
        }

        nav{
            background-color: transparent;
            background-image: url('');

            .row{
                display: none;
            }

            .clock-container{
                font-size: 7vw;
                margin-left: 5vw;

                svg{
                    margin-right: 5vw;
                    cursor: pointer;
                }
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
    background-color: ${props => props.backgroundColor ? props.backgroundColor : "white"}
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

        h1{
            font-size: 8vw;
        }

        h2{
            font-size: 4vw;
        }
    }
`;

export const NavbarMobile = styled.div`
    display: none;

    @media ${device.tablet}{
        width: 0;
        position: absolute;
        background-color: white;
        display: flex;
        flex-direction: column;
        transition: width 0.2s linear;
        background-color: black;
        top: 0;
        right: 0;
        overflow-x: hidden;
        z-index: 3;

        #navbar-content{
            width: 60vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 100%;
        }
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
        height: 10vw;
        width: 40vw;
        border-bottom-left-radius: 5vh;
        border-top-left-radius: 5vh;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s linear;
        z-index: 2;

        span{
            font-size: 4vw;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
        }

        img{
            width: 6vw;
            margin-left: 1vw;
        }
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

    @media ${device.tablet}{
        &.bg{
            background-size: contain;
            background-position: center;
        }

        &.login{
            background-color: rgb(31, 31, 31);
        }
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

    @media ${device.tablet} {
        font-size: 4vw;
        width: 85vw;
        height: 12vw;
        margin-bottom: 4vh;
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

    @media ${device.tablet} {
        font-size: 4vw;
        width: 85vw;
        height: 12vw;
        margin-bottom: 4vh;
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
    text-align: ${props => props.align || 'start'};
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

    @media ${device.tablet}{

        h1{ color: black }

        .btn-cancel{ 
            color: black; 
            border: 1px solid black;
        }

        

        span{
            font-size: 4vw;
            text-align: center;
            margin: 2vh 0;
        }

        div{
            width: 100%;
            justify-content: space-around;
            button{
                width: 40%;
                margin: 0;
            }  
        }
    }
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

    @media ${device.tablet}{
        .radio-button{
            width: 5vw;
            height: 5vw;
            border-radius: 5vw;
            
            div{
                width: 3.5vw;
                height: 3.5vw;
                border-radius: 3.5vw;
                background-color: ${props => props.checked ? 'black' : 'white'};
            }
        }

        span{
            color: white;
            font-size: 4vw;
        }
    }
`;

export const Footer = styled.footer`
    width: 100%;
    height: 15%;
    background-color: rgb(41, 41, 41);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    img{
        width: 10vw;
    }

    .info{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 33%;
        justify-content: center;

        a{
            color: white;
            font-size: 0.8vw;
            font-family: Arial, Helvetica, sans-serif;
            text-decoration: none;
            margin: 0 1vw;
            display: flex;
            flex-direction: row;
            align-items: center;

            img{
                width: 1.5vw;
                margin-right: 0.2vw;
            }
        }
    }

    .address{
        display: flex;
        flex-direction: column;

        span{
            color: white;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8vw;
        }
    }

    #qr{
        width: 4vw;
        margin-left: 1vw;
    }

    @media ${device.tablet}{
        flex-direction: column;
        padding: 5vh 0;
        height: fit-content;

        img{ width: 60vw; }

        .info{
            width: 100%;
            flex-direction: column;
            margin: 1vh 0;

            a{
                font-size: 5vw;
                margin: 0.5vh 0;

                img{ width: 8vw; }
            }
        }

        .address{
            span{
                font-size: 4vw;
            }
        }

        #qr{
            width: 40vw;
            margin: 2vh 0 0 0;
        }
    }
`