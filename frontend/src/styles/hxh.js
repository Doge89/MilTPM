import styled from 'styled-components'

export const InfoContainer = styled.div`
    width: 90%;
    background-color: rgb(243, 243, 243);
    padding: 1vw 5%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;

    .column{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
`;

export const TableContainer = styled.div`
    width: 96%;
    margin: 2vh 2% 0 2%;
    padding : ${props => props.padding || '0'};
    height: fit-content;
`;

export const Cell = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    border-left: 1px solid rgb(83, 83, 83);
    border-top: ${props => props.borderTop};
    width: ${props => props.width};

    &.no-border-left{ border-left: 0 }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    border-left: 1px solid rgb(83, 83, 83);
    border-right: 1px solid rgb(83, 83, 83);
    border-bottom: ${props => props.borderBottom};
    padding: ${props => props.padding || '0'};
`;


export const IconsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 5vw 10%;

    .row{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        margin-bottom: 1vw;
        justify-content: center;
    }
`;

export const SearcherContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 2vh;

    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5vw;
        font-weight: bold;
    }

    input{
        font-size: 1vw;
        padding: 0.5vh 1vw;
        font-family: Arial, Helvetica, sans-serif;
        border-radius: 0.5vw;
        border: 1px solid black;
        height: 3vh;
        margin-right: 1vw;
        margin-bottom: 2vh;
    }
`;



