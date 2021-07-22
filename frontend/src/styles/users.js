import styled from "styled-components";

import { device } from "./device";

export const UserContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;
    margin: 20px 0;
    

    *{
        font-family: Arial, Helvetica, sans-serif;
    }
`

export const UserOption = styled.div`

    display: flex;
    margin-top: ${props => props.marginTop};
    margin-bottom: ${props => props.marginTop};
    background-color: rgb(254, 13, 43);
    border-radius: 8px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);

    div{
        padding: 20px;
        border: ${props => props.border};
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s ease-in-out;
        transform: scale(1);

        span{
            color: white;
            font-weight: bold;
            letter-spacing: normal;
            text-transform: uppercase;
            font-size: 20px;
            margin: 0 20px;
        }

        &:hover{
            transition: all 0.2s ease-in;
            transform: scale(1.2);
            background-color: #FF3C61;
        }

    }

`

export const AddUserForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;

    div{
        margin: 0 15px;
        padding: 5px
    }

    label{
        font-weight: bold;
        font-size: 20px;
        letter-spacing: normal;
        margin-right: 5px;
        cursor: default;
    }
    
    input{
        padding: 5px;
        font-size: 20px;
        border-radius: 8px;
        border: 1px solid black;
        letter-spacing: normal;
        word-spacing: 0.01em;
    }

`

export const UserInContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;

    div{
        width: 100%;
        margin: 20px 0;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;

        h1{
            text-align: center;
            text-transform: uppercase;
            font-size: 25px;
            color: rgb(254, 13, 43);
            letter-spacing: normal;
            word-spacing: 0.01em;
        }

    }

`

export const FormUserIn = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;
    margin-top: 20px;
    padding: 5px;

    h1{
        text-align: center;
        letter-spacing: normal;
        word-spacing: 0.01em;
        word-break: break-all;
        font-size: 25px;
        color: rgb(254, 13, 43);

    }

    form{
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
        padding: 5px;

        label{
            color: rgb(254, 13, 43);
            font-weight: bold;
            font-size: 18px;
            letter-spacing: normal;
            margin-right: 15px;
            text-indent: initial;
        }

        input{
            border-radius: 8px;
            border: 1px solid black;
            padding: 10px;
            font-size: 18px;
            letter-spacing: normal;
        }

        button{
            border-radius: 8px;
            border: 1px solid black;
            box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
            background-color: rgb(254, 13, 43);
            color: white;
            font-weight: bold;
            letter-spacing: normal;
            word-spacing: normal;
            cursor: pointer;
            padding: 10px;
            margin-left: 10px;
        }

    }

`

export const QueryForm = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row ;
    font-family: Arial, Helvetica, sans-serif;
    padding: 10px;
    margin: 10px 0

    

`

export const QuerySearchColumn = styled.div`
    width: 33.3%;
    display: flex;
    align-items: center;
    flex-flow: column wrap;
    justify-content: center;
    padding: 5px;

    .query-form{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column wrap;
        margin: 10px 0;
        padding: 5px;
    }
    .header{
        font-size: 25px;
        color: rgb(254, 13, 43);
        text-transform: uppercase;
        text-align: center;
        letter-spacing: normal;
        word-spacing: 0.01em;
        word-break: break-word;

    }
    .label{
        margin-right: 10px;
        letter-spacing: normal;
        font-size: 16px;
        color: rgb(254, 13, 43);
        font-weight: bold;
    }
`   
