import styled from 'styled-components'

const red = "rgb(254, 13, 46)"
const gray = "rgb(80, 80, 80)"

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    padding: 2vh 5%;

    h1{
        font-family: 'Arial Black', Arial, Helvetica, sans-serif;
        font-size: 2vw;
        color: ${gray};
        margin-bottom: 2vh;
    }
`

export const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    

    .table-header{
        background-color: ${red};
        padding: 2vh 2vw;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .column{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .row{
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
`

export const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    label{
        font-family: Arial, Helvetica, sans-serif;
        color: white;
        font-size: 1vw;
        margin-right: 1vw;
    }

    select{
        width: 10vw;
        background-color: white;
        padding: 0.5vh 1vw;
        border: 0;
        font-size: 1vw;
        font-family: Arial, Helvetica, sans-serif;
        min-height: 2vh;
        border-bottom: 1px solid black;
        outline: none;
    }
`

export const TableRow = styled.div`
    display: flex;
    flex-direction: row;
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    width: calc(100% - 4px);
    min-height: 6vh;
    align-items: center;

    &.first-child{
        border-top: 2px solid black;
    }

    &:last-child{
        border-bottom: 2px solid black;
    }

    .label{
        height: 6vh;
        width: 40%;
        border-right: 2px solid black;
        display: flex;
        align-items: center;
        justify-content: center;

        span{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.2vw;
            font-weight: bold;
        }
    }

    .input-container{
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        input{
            border: 0;
            border-bottom: 1px solid black;
            width: 90%;
            padding: 0.5vh 2vw;
            outline: none;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1vw;
        }

        select{
            border: 0;
            border-bottom: 1px solid black;
            width: 96%;
            padding: 0.5vh 2vw;
            outline: none;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1vw;
        }
    }
`

export const SearcherContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    padding: 0 5%;
    margin-top: 2vh;

    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5vw;
        font-weight: bold;
        margin-bottom: 5vh;
    }

    .inputs-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`

export const HistoryTableContainer = styled.div`
    width: 90%;
    padding: 0 5%; 
    display: flex;
    flex-direction: column;
    padding-bottom: 5vh;
`