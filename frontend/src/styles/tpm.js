import styled, { glob } from 'styled-components'

import { device } from './device'

const red = "rgb(254, 13, 46)"
const gray = "rgb(80, 80, 80)"

export const TopBar = styled.ul`
    width: 94%;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 3vh 3%;
    background-color: ${red};
    list-style: none;
    justify-content: space-between;
    height: 4vh;

    @media ${device.tablet} {
        flex-wrap: wrap;   
        height: fit-content;
        background-color: transparent;
        list-style: disc;
        width: fit-content;
        width: 80%;
        padding: 3vh 10%;
    }
    
`;

export const TopBarItem = styled.li`
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${props => props.hover ? '1.4vw' : '1.2vw'};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.1s;
    width: 100%;
    text-align: center;

    &:hover { font-size: 1.4vw }

    @media ${device.tablet} {
        font-size: 5vw;
        width: fit-content;
        margin: 2vw 8vw;
        text-align: left;

        &:hover{ font-size: 5vw }
    }
`;


export const InfoContainer = styled.div`
    width: 80%;
    padding: 0 10%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    margin: 3vh 0;

    div{
        background-color: rgb(243, 243, 243);
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${gray};
        width: 20vw;
        padding: 1vw 0;
        font-size: 1.5vw;
        font-family: Arial, Helvetica, sans-serif;
        min-height: 5vh;
    }

    select{
        background-color: transparent;
        padding: 1vh 1vw;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1vw;
        border: 0;
        outline: none;
    }

    @media ${device.tablet} {
        width: 100%;
        padding: 0;
        flex-direction: column;
        
        div{
            min-width: 70vw;
            font-size: 5vw;
            text-align: center;
            padding: 1vw 2vw;
            min-height: 10vw;
            background-color: transparent;
            border: 2px solid white;
            border-radius: 5vw;
            color: white;
            margin-bottom: 2vh;
        }

        select{
            color: white;
            font-size: 5vw;
            width: fit-content;
            text-align: right;
        }

    }
`;

export const Container = styled.div`
    width: 80%;
    padding: ${props => props.padding || '0 10%'};
    display: flex;
    align-items: center;
    flex-direction: column;

    h1{
        font-size: 1.5vw;
        font-family: Arial, Helvetica, sans-serif;
        color: ${gray};
    }

    @media ${device.tablet} {
        
        h1{
            font-size: 5vw;
            color: white;
        }

        button{
            background-color: white;
            border-radius: 5vw;
            color: black;
            width: 60%;
        }

    }
`;

export const SatusContainer = styled.div`
    width: 70%;
    padding: 0 15%;
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-top: 2vh;
    justify-content: space-between;

    div{
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
            font-family:Arial, Helvetica, sans-serif; 
            font-size: 1.2vw;
            color: ${gray};
            font-weight: bold;
            margin-right: 1vw;
        }
    }

    @media ${device.tablet} {
        width: 100%;
        padding: 0;
        div{
            span{
                font-size: 4vw;
                color: white;
            }
        }

    }
`;

export const Status = styled.div`
    width: 2vw;
    height: 2vw;
    background-color: ${props => props.color || 'red'};

    @media ${device.tablet} {
        width: 5vw;
        height: 5vw;
    }

`;

export const SelectorContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5vw;
        font-weight: bold;
        color: ${gray};
        margin-bottom: 1vw;
    }

    .machines{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    @media ${device.tablet} {
        width: 100vw;
        
        .machines{
            justify-content: space-around;
        }
        
        h1{
            font-size: 5vw;
            color: white;
        }

    }
`;

export const SelectorItem = styled.div`
    width: 10vw;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 7vh;
    background-color: ${red};
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 1vw;
    transition: all 0.1s;
    text-align: center;

    &:hover{ font-size: 1.15vw; }

    &.selected{ font-size: 1.15vw }

    @media ${device.tablet} {
        
        width: 40vw;
        font-size: 4vw;
        margin: 1vw 2vw;
        background-color: transparent;
        border: 2px solid white;
        min-height: 12vw;
        border-radius: 5vw;
        height: fit-content;
        
        &.selected{ font-size: 4vw }

        &:hover{ font-size: 4vw; }

    }
`;

export const Table = styled.div`
    width: ${props => props.width || '100%'};
    display: flex;
    flex-direction: column;
    margin: 3vh 0;
    align-items: ${props => props.alignItems || 'flex-start'};

    .machine{
        background-color: ${red};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 2vw;
        padding: 2vh 0;
        border: 2px solid black;
        margin-bottom: 1vw;
        width: 100%;
    }

    .table{
        width: ${props => props.tableWidth || '100%'};
        display: flex;
        flex-direction: column;
        border: 2px solid black;
    }

    .table-users{
        width: 100%;
        margin-left: -18%;
    }

    .table.margin{ margin-bottom: 2vh; }

    .table-header{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5vh;
        font-family: Arial, Helvetica, sans-serif;
        color: ${gray};
        font-size: 1.1vw;
        font-weight: bold;
        border-bottom: 2px solid black;
    }

    .table-row{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        height: ${props => props.heightRow || '5vh'};
        border-bottom: 2px solid black;
    }

    .table-column{
        width: ${props => props.widthColumn};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .border-none{ border: 0; }

    .flex-start{ align-items: flex-start }

    .table-mobile{ display: none; }

    @media ${device.tablet} {
        background-color: transparent;
        width: 85vw;
        margin-bottom: 0;
        align-items: center;
        ${props => props.mp && `margin: 1vh auto;`}

        &.table-mobile-white{
            background-color: white;
            width: 100vw;

            .table{ border: 0; }

            div, span{
                color: black;
                left: 0;
            }

        }

        &.table-users{
            margin-bottom: 2vh;

            div{ word-break: break-all; }

            .table{
                margin: 0 auto;
                .trash{
                    margin-left: -50%;
                    left: -68vw;
                }
            }
        }

        #table-mp-mobile{ border: 0; }

        .error{
            font-size: 4vw;
            text-align: center;
            margin: 1vh 0;
            
        }

        .table-desktop{ display: none }

        .table-mobile{ display: flex }
        
        .machine{
            font-size: 5vw;
            background-color: transparent;
            border: 0;
        }

        .table{
            border: 0;
            border-top: 2px solid black;
            ${props => props.mp && `
                border: 0;
                width: 100%;
            `}

            .table-header{
                color: white;
                font-size: 7vw;
                font-weight: bold;
                border-bottom: 0;
                justify-content: flex-start;
                padding: 2vw 0 2vw 5vw;
            }

            .table-row{
                border: 0;
                justify-content: space-around;
                min-height: 5vh;
                height: fit-content;
            }

            .table-column{
                width: 90%;
                padding: 0 5%;
                border-bottom: 1px solid white;
                margin-bottom: 2vh;
                ${props => props.mp && `align-items: flex-start;`}
                
                div{
                    justify-content: flex-start;
                }
            }

            .table-row:last-child{
                margin-bottom: 2vh;
            }
            
            #row-users-header{
                justify-content: flex-start;
                margin-top: 2vh;
            }

        }

        .table-schedule{
            flex-direction: column;
        }

    }

`;

export const PanelTableCell = styled.div`
    width: ${props => props.width};
    height: ${props => props.height || '100%'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.1vw;
    color: ${gray};
    background-color: ${props => props.bgColor || 'transparent'};
    cursor: ${props => props.pointer ? 'pointer' : 'default'};
    flex-shrink: 0;

    img{ width: 2vw; }

    span{
        font-family: Arial, Helvetica, sans-serif;
        color: ${red};
        font-size: 1vw;
        margin-left: 0.5vw;
        margin-top: 0.5vh;
    }

    div{
        background-color: white;
        position: relative;
        z-index: 1;
        left: -1vw;
        height: calc(100% - 6px);
        display: flex;
        align-items: center;
        transition: all 0.1s;
        span{
            color: ${gray};
            margin: 0;
            margin-top: 0.5vh;
            min-width: 5vw;
            text-align: center;
        }
    }

    &.header{ 
        font-weight: bold; 
        font-size: 1.2vw;
    }

    &.border{
        border-left: 2px solid black;
        border-right: 2px solid black;
    }

    &.border-right{ border-right: 2px solid black; }
    &.border-left{ border-left: 2px solid black; }
    &.border-bottom{ border-bottom: 2px solid black; }
    &.border-top{ border-top: 2px solid black; }

    &.clickable{
        cursor: pointer;
    }

    &.move-left{
        position: relative;
        left: 18%
    }

    .img-effect{
        position: relative;
        left: 2vw;
        z-index: 0;
        transition: all 0.1s;
        cursor: pointer;
    }

    .status-indicator{ display: none; }

    &.hover{
        .img-effect{
            left: 0vw;
        }
        div{
            left: 0vw;
        }
    }

    &:hover{
        .img-effect{
            left: 0vw;
        }
        div{
            left: 0vw;
        }
    }

    @media ${device.tablet} {
        font-size: 4vw;
        color: white;
        text-align: center;
        height: 4.5vh;
        background-color: transparent;
        
        &.cell-status{
            display: flex;
            align-items: center;
            justify-content: center;
        }

        img, .trash-label{ display: none; }

        .status-indicator{ 
            width: 30%;
            height: 100%;
            background-color: ${props => props.bgColor};
            display: block;
            margin-left: 2vw;
        }

        .trash-icon{
            display: inline;
            width: 8vw;
        }

        div{
            background-color: transparent;
            left: 0;
            
            span{
                font-size: 4vw;
                color: white;
            }
        }

        

        &.header{
            font-size: 5vw;
            color: white;
        }

        &.move-left{ left: 0; }
        
        &.border, &.border-right, &.border-left, &.border-bottom, &.border-top{
            border: 0;
        }

    }
`;

export const Card = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
    align-items: center;

    .card{
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color:${props => props.bgColor};
        border-radius: 0.5vw;
        align-items: center;
        padding: 3vh 1vw;

        h1{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 2vw;
            font-weight: bold;
            color: black;
            margin: 0;
            margin-bottom: 1vw;
        }

        .content{
            background-color: white;
            width: 90%;
            display: flex;
            flex-direction: column;
            padding: 2vh 2vw;
        }
    }  

    @media ${device.tablet} {
        width: 85vw;
        margin-top: 2vh;

        .card{
            h1{
                font-size: 6vw;
                text-align: center;
                margin-bottom: 3vh;
            }
        }

    }  
`;

export const CardInfo = styled.div`
    display: flex;
    flex-direction: ${props => props.column ? 'column' : 'row'};
    align-items: ${props => props.column ? 'flex-start' : 'center'};
    margin-bottom: 1vw;
    min-height: 5vh;
    width: ${props => props.width || '100%'};

    span, label{
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 1.2vw;
        margin-right: 1vw;
        width: ${props => props.widthLabel || (props.column ? '100%' : '10vw')};
    }

    input{
        border: 0;
        width: 100%;
        padding: 1vh 2vw;
        font-size: 1vw;
        font-family: Arial, Helvetica, sans-serif;
        min-height: 3vh;
        border-bottom: 1px solid black;
        outline: none;
    }

    textarea{
        border: 0;
        width: 96%;
        padding: 1vh 1vw;
        font-size: 1vw;
        font-family: Arial, Helvetica, sans-serif;
        min-height: 15vh;
        border: 1px solid black;
        outline: none;
        resize: none;
        margin-top: 0.5vw;
    }

    select{
        border: 0;
        width: 96%;
        padding: 1vh 1vw;
        font-size: 1vw;
        font-family: Arial, Helvetica, sans-serif;
        min-height: 3vh;
        border-bottom: 1px solid black;
        outline: none;
        resize: none;
        margin-top: 0.5vw;

        *{
            height: 3vh;
        }
    }

    div{
        width: 100%;
        padding: 1vh 2vw;
        font-size: 1vw;
        font-family: Arial, Helvetica, sans-serif;
        min-height: ${props => props.column ? '15vh' : '3vh'};
        display: flex;
        
        ${props => props.column ? `
            border: 1px solid black;
            align-items: flex-start;
            padding: 1vh 1vw;
            width: 96%;
            margin-top: 0.5vw;
            overflow-y: auto;
        `:`
            border-bottom: 1px solid black;
            align-items: center;
        `}
    }

    @media ${device.tablet} {
        flex-direction: column;
        align-items: center;
        margin-bottom: 2vh;

        &.margin-none{ margin-bottom: 0; }

        span,label{
            font-size: 4vw;
            width: 100%;
            margin-left: 5%;
        }

        #label-ports{ color: white }

        select{
            background-color: transparent;
            border-bottom: solid 1px white;
            color: white;
            font-size: 4vw;
            margin: 1vh 0;
        }

        .select-schedule{
            color: black;
            border-bottom: 1px solid black;
        }

        div{
            font-size: 4vw;
            width: 90%;
            margin: 0 auto;
            margin-top: ${props => props.column ? '1vh' : '0'};
            margin-bottom: 1vh;
        }

        input, textarea{
            font-size: 4vw;
            width: 90%;
        }

    } 
`;

export const HistorySearchContainer = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;

    input{
        font-size: 1vw;
        padding: 0.5vh 1vw;
        font-family: Arial, Helvetica, sans-serif;
        border-radius: 0.5vw;
        border: 1px solid black;
        height: 3vh;
        margin-right: 1vw;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button { 
        -webkit-appearance: none;
        appearance: none;
    }

    @media ${device.tablet} {
        margin: 2vh 0;

        input{
            font-size: 4vw;
            color: white;
            border-bottom: 1px solid white;
            margin-right: 5vw;
            outline: none;
            padding: 1vh 2vw;
            width: 50vw;
        }

        button{
            width: 25vw;
            margin: 0;
            border: 0;
            height: 14vw;
            position: relative;
            font-weight: bold;
            font-size: 5vw;
            margin-left: -10vw;
            box-shadow: 0px 0px 20px 10px rgba(0,0,0, 0.7)
        }
    } 
`;

export const CreateUserForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    padding: 2vh 2vw;

    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2vw;
        color: ${red};
        margin-bottom: 2vh;
    }

    span{
        width: 100%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1vw;
        margin-top: -1vw;
        margin-bottom: 1vw;
    }

    #message-err{
        width: 100%;
        text-align: center;
        margin-top: 2vh;
    }
    @media ${device.tablet} {
        margin-top: 5vh;

        h1{
            font-size: 5vw;
            color: black;
            font-weight: bold;
        }

        select{ color: black; }

        button{
            width: 100%;
            background-color: white;
            border: 2px solid black;
            color: black;
            border-radius: 5vw;
        }
        span{
            font-size: 3vw; 
            margin-bottom: 2vh;
            margin-top: 0.5vh;
        }

    } 
`;