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