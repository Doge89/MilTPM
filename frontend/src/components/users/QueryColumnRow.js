import React, { useContext, useEffect } from 'react'

import { appContext } from '../../reducers/ProviderUsers'

import { Container } from '../../styles/common'
import RadioButton from '../common/RadioButton'

function QueryColumnRow({ subtitles, handleOneOptionRadio, value }){
    return(
        <Container 
            width="100%"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            padding="5px"
        >
            <RadioButton 
                label={subtitles}
                setChecked={handleOneOptionRadio}
                checked={value}
            />
        </Container>
    )

}

export default QueryColumnRow