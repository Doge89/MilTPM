import styled from 'styled-components'

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
`;