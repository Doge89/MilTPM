import React, { useEffect, useState } from 'react';

import MainContainer from '../components/common/MainContainer';
import Form from '../components/andon/Form'
import Timer from '../components/andon/Timer'

function Andon({ location }){

    return(
        <MainContainer>
            <Form location={location}>
                <Timer />
            </Form>
        </MainContainer>
    )
}

export default Andon;