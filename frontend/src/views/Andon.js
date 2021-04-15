import React, { useEffect } from 'react';

import MainContainer from '../components/common/MainContainer';
import Form from '../components/andon/Form'
import Timer from '../components/andon/Timer'

import { setRootStyle } from '../scripts'

function Andon({ location }){

    useEffect(() => {
        setRootStyle(true)
    }, [])


    return(
        <MainContainer>
            <Form location={location}>
                <Timer />
            </Form>
        </MainContainer>
    )
}

export default Andon;