import styled from 'styled-components'

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
`;

export const TopBarItem = styled.ul`
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${props => props.hover ? '1.4vw' : '1.2vw'};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.1s;
    width: 100%;
    text-align: center;

    &:hover { font-size: 1.4vw }
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
        width: 17vw;
        padding: 1vw 0;
        font-size: 1.5vw;
        font-family: Arial, Helvetica, sans-serif;
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
`;

export const Status = styled.div`
    width: 2vw;
    height: 2vw;
    background-color: ${props => props.color || 'red'};
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
`;