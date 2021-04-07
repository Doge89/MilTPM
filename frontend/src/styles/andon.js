import styled from 'styled-components'

import { device } from './device'

const red = "rgb(254, 13, 46)"

export const FormContainer = styled.div`
    display: flex;
    height: 84%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1{
        font-size: 1.5vw;
        font-family: Arial, Helvetica, sans-serif; 
        color: rgb(80, 80, 80);
    }

    form{
        display: flex;
        flex-direction: column;
        width: 40%;

        label{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1vw;
            font-weight: bold;
            color: rgb(80, 80, 80);
        }

        textarea{
            height: 20vh;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1vw;
            padding: 1vw 0.5vw;
            margin-bottom: 0.5vw;
        }

        input{
            height: 4vh;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1vw;
            padding: 0.2vw 0.5vw;
            margin-bottom: 0.5vw;
            margin: 1vw 0;
        }

        span{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1vw;
            margin-bottom: 0.5vw;
            font-weight: bold;
            color: rgb(80, 80, 80);
        }

        div{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .icon-container{
            flex-direction: row;
            justify-content: center;

            img{
                width: 4vw;
                margin-right: 1vw;
                position: relative;
                left: -4vw;
                margin-right: -4vw;
            }

            input{
                border: 2px solid ${red};
                border-radius: 0.5vw;
                color: ${red};
                width: 40%;
                padding: 0.5vw 0;
                text-align: center;
                font-size: 1.5vw;
                font-weight: bold;
            }

            input::-webkit-calendar-picker-indicator {
                display: none;
                -webkit-appearance: none;
            }
        }
        
    }

    @media ${device.tablet} {
        justify-content: flex-start;

        h1{
            font-size: 5vw;
            text-align: center;
            width: 80%;
            color: rgb(150, 150, 150)
        }

        form{
            width: 80%;
            
            label, span{
                font-size: 4vw;
                color: rgb(150, 150, 150)
            }

            textarea{
                height: 25vh;
                font-size: 4vw;
                padding: 1vh 2vw;
                margin: 2vh 0;
                background-color: transparent;
                color: white;
            }

            button{
                font-size: 4vw;
                width: 100%;
                margin-bottom: 2vh;
                height: 5vh;
            }
        }
    }
`;