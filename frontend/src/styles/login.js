import styled from 'styled-components'

import { device } from './device'
const red = "rgb(254, 13, 46)"

export const FormContainer = styled.form`
    width: 40vw;
    background-color: rgba(254, 13, 46, 0.5);
    border-radius: 0.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2vw 0;
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.8), inset 0px 0px 2000px 5px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(1px);

    h1{
        color: white;
        font-family: 'Arial Black', arial;
        size: 2vw;
        margin: 0;
        margin-bottom: 1vw;
    }

    div{
        display: flex;
        align-items: center;
        flex-direction: column;

        label{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.8vw;
            margin: 1vh 0 ;
            color: white;
        }

        input{
            padding: 1vh 1vw;
            font-size: 1.5vw;
            border-radius: 0.5vw;
            font-family: Arial, Helvetica, sans-serif;
            border: 0;
        }
    }

    button{
        border: 0;
        cursor: pointer;
        background-color: rgb(240, 240, 240);
        font-family: Arial, Helvetica, sans-serif;
        margin-top: 2vh;
        padding: 1.4vh 5vw;
        font-size: 1.5vw;
        border-radius: 0.5vw;
        font-weight: bold;
        margin-bottom: 2vh
    }

    span{
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5vw;
        text-align: center;
    } 

    #mobile-title, #logo-mobile{ display: none }

    @media ${device.tablet} { 
        background-color: transparent;
        box-shadow: 0;
        box-shadow: 0px 0px 0 0 rgba(0,0,0,0), inset 0px 0px 0 0 rgba(255, 255, 255, 0);
        backdrop-filter: blur(0);
        align-items: flex-start;
        width: 90%;
        padding: 0 5%;
        min-height: 90%;
        padding-bottom: 10%;

        div{
            margin: 0 auto;
            margin-top: 4vh;

            label{ font-size: 4vw; }

            input{
                width: 60vw;
                height: 4vh;
                background-color: transparent;
                color: white;
                border: 2px solid white;
                border-radius: 4vw;
                text-align: center;
                font-size: 4vw;
                outline: none;
            }
        } 

        button{
            margin: 0 auto;
            margin-top: 5vh;
            width: 60vw;
            height: 7vh;
            border-radius: 4vw;
            font-size: 5vw;
        }

        h1{
            font-size: 12vw;
            width: 60vw;
            word-break: break-word;
        }



        #mobile-title{
            display: flex;
            border-radius: 4vw;
            background-color: ${red};
            color: white;
            width: 40vw;
            height: 7vh;
            font-size: 4vw;
            font-family: Arial, Helvetica, sans-serif;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            margin: 0;
        }

        #logo-mobile{
            display: flex;
            width: 100%;
            margin-bottom: 5vh;
            align-items: flex-start;

            img{
                width: 40vw;
            }
        }
    }
`;