import styled from 'styled-components'

export const LayoutContainer = styled.div`
    display: flex;
    width: 100%;
    height: 80%;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2vw;
        font-weight: bold;
        margin-bottom: 5vh;
    }
`;

export const Plane = styled.div`
    width: 75%;
    height: 80%;
    background-image: ${props => `url(${props.img})`};
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
`;

export const Indicator = styled.div`
    width: 2%;
    height: 13%;
    background-color: ${props => props.color};
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
`;