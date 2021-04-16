import styled from 'styled-components'

import { device } from './device'

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

    @media ${device.tablet} {
        h1{
            font-size: 5vw;
            color: white;
            text-align: center;
        }
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

    @media ${device.tablet} {
        background-color: transparent;
        align-items: center;

        .btn-container{
            flex-direction: row;
            justify-content: space-around;
            margin-top: 2vh;

            button{
                width: 30vw;
                background-color: white;
                color: black;
                border-radius: 5vw;
            }

            button:first-child{
                background-color: transparent;
                border: 2px solid white;
                border-radius: 5vw;
                color: white;
            }
        }

        .table-header{
            flex-direction: column;
            padding: 2vh 8vw;
            width: 82%;
            border-top-right-radius: 5vw;
            border-top-left-radius: 5vw;
            background-color: rgba(100, 100, 100, 0.5);

            .column{
                div{
                    width: 100%;
                    margin-bottom: 1vh;
                    span{
                        font-size: 5vw;
                    }
                    
                    .radio-button{
                        width: 5vw;
                        height: 5vw;
                        border-radius: 5vw;
                        margin: 0;
                        div{
                            width: 3.5vw;
                            height: 3.5vw;
                            border-radius: 3.5vw;
                            margin: 0;
                        }
                    }

                    .input{
                        flex-direction: column;
                        align-items: flex-start;
                        label, input{
                            font-size: 4vw;
                        }
                        label{
                            width: 100%;
                            margin: 0;
                            margin-bottom: 0.5vh;
                        }
                        input{
                            padding: 1vh 2vw;
                            background-color: transparent;
                            color: white;
                            border-bottom: 1px solid white;
                        }
                        
                    }

                    #fecha{ display: none }
                }
            }

            .row{
                flex-direction: column;
            }
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
        width: ${props => props.width || '10vw'};
        background-color: white;
        padding: 0.5vh 1vw;
        border: 0;
        font-size: 1vw;
        font-family: Arial, Helvetica, sans-serif;
        min-height: 2vh;
        border-bottom: 1px solid black;
        outline: none;
    }

    @media ${device.tablet} {
        flex-direction: column;
        align-items:flex-start;
        width: 100%;
        
        label{
            font-size: 4vw;
            margin-bottom: 0.5vh;
        }

        select{
            width: 105%;
            font-size: 4vw;
            padding: 1vh 2vw;
            background-color: transparent;
            color: white;
            border-bottom: 1px solid white;
        }


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

    @media ${device.tablet} {
        border: 0;
        border-bottom: 1px solid white;
        flex-direction: column;
        align-items: flex-start;
        padding: 2vw;
        width: 90%;

        .label{
            border: 0;
            width: 100%;
            align-items: center;
            justify-content: flex-start;

            span{
                color: white;
                font-size: 5vw;
            }
        }

        .input-container{
            width: 100%;
            align-items: flex-start;
            
            input, select{
                background-color: transparent;
                color: white;
                font-size: 4vw;
                border-bottom: 1px solid rgb(83, 83, 83)
            }

            span{
                color: white;
                font-size: 4vw;
            }
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

    @media ${device.tablet} {
        h1{
            color: white;
            font-size: 7vw;
            text-align: center;
        }

        .inputs-container{
            flex-direction: column;

            div{ width: 80%; }

            label{ color: white; }

            input{
                color: white;
                background-color: transparent;
                border-bottom: 1px solid white;
            }
        }
    }
`

export const HistoryTableContainer = styled.div`
    width: 90%;
    padding: 0 5%; 
    display: flex;
    flex-direction: column;
    padding-bottom: 5vh; 
`