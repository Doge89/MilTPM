import styled from 'styled-components'

import { device } from './device'

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

        .select-container{
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;

            label{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 1vw;
                margin-right: 0.5vw;
            }

            select{
                font-family: Arial, Helvetica, sans-serif;
                font-size: 1vw;
                background-color: white;
                border: 1px solid black;
                width: 100%;
                padding: 0.5vh 0;
            }
        }

        
    }

    @media ${device.tablet} {
        flex-direction: column;
        background-color: transparent;
        width: 80vw;
        margin: 0 auto;

        .column {
            align-items: flex-start;

            div{

                label{
                    color: white;
                    font-size: 3.5vw;
                    width: 40vw;
                    text-align: end;
                    margin-right: 5vw;
                }

                input{
                    background-color: transparent;
                    font-size: 3.5vw;
                    color: white;
                    border: 0;
                    border-bottom: 1px solid white;
                    padding: 2.5vw 2vw;
                    outline: none;
                }
            }

            .select-container{
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;

                label{
                    color: white;
                    font-size: 3.5vw;
                    width: 40vw;
                    text-align: end;
                    margin-right: 5vw;
                }

                select{
                    background-color: transparent;
                    font-size: 3.5vw;
                    color: white;
                    border: 0;
                    border-bottom: 1px solid white;
                    padding: 2.5vw 2vw;
                    outline: none;
                }
            }
        }
    }
`;

export const TableContainer = styled.div`
    width: 96%;
    margin: 2vh 2% 0 2%;
    padding : ${props => props.padding || '0'};
    height: fit-content;

    @media ${device.tablet} {
        width: 85vw;
        margin: 5vh auto 0 auto;
        background-color: rgba(100, 100, 100, 0.5);
        border-top-left-radius: 5vw;
        border-top-right-radius: 5vw;
        padding-top: 2vh;

        #table-header{
            display: none;
        }
    }
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
    background-color: ${props => props.backgroundColor ? props.backgroundColor : "white"};

    &.no-border-left{ border-left: 0 }

    @media ${device.tablet} {
        p{
            color: white;
            font-size: 4vw; 
        }

        .slash{
            display: none;
        }

        .second-input{
            display: none;
        }

        input, textarea{
            color: white;
            font-size: 4vw;
            background-color: transparent;
            padding: 0.5vh 2vw;
        }
    }
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

    .data-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 100%;

        .table-title-data{
            display: none;
        }

        .table-data-container{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }

    h1{
        display: none;
    }

    @media ${device.tablet} {
        flex-direction: column;
        border: 0;

        .table-row-data{
            width: 90%;
            border-bottom: 1px solid rgba(150, 150, 150, 150);
            flex-direction: column;
            height: fit-content;
            align-items: flex-start;
            padding-bottom: 2vh;

            h1{
                display: block;
                color: white;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: bold;
                font-size: 7vw;
            }            

            div{
                border: 0
            }
        }

        .data-container{
            flex-direction: column;

            .table-title-data{
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
                margin-bottom: 2vh;

                span{ font-size: 4vw; }
            }            
        }

        button{
            width: 70vw;
            height: 12vw;
            font-size: 4vw;
            margin: 2vh 0;
        }
    
        button:first-child{
            margin-top: 5vh;
        }
    }
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

    @media ${device.tablet} {
        .row{
            flex-direction: column;

            div{
                width: 100%;
                justify-content: center;
                margin-bottom: 2vh;
                height: 5vh;
                
                span{
                    font-size: 4vw;
                    margin-left: 2vw;
                }

                img{
                    width: 10vw
                }
            }
        }
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

export const ResumeRowContainer = styled.div`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-flow: row nowrap;
    font-family: Arial, sans-serif;

    div{
        width: 35%;
        padding: 5px;
        text-align: center;
        box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
        border-radius: 8px;

        h1{
            text-transform: uppercase;
            letter-spacing: normal;
            word-spacing: 0.01em;
            margin-bottom: 25px;
        }

        span{
            color: rgb(255, 13, 76);
            font-weight: bold;
            margin-bottom: 25px;
            font-size: 36px;
        }

    }

`

export const DeadTimeContainer = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    flex-flow: row wrap;
    font-family: Arial, sans-serif;


    h1{
        letter-spacing: normal;
        word-spacing: 0.01em;
        word-wrap: break-word;
        color: rgb(255, 13, 76);
        text-transform: uppercase;
    }

    span{
        font-size: 26px;
        font-variant: small-caps;
        letter-spacing: normal;
        font-weight: 500;
    }

`


