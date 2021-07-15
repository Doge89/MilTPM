import React, { useEffect } from 'react'
import MainContainer from '../components/common/MainContainer'
import UsersMain from '../components/users/UsersMain'
import { setRootStyle } from '../scripts'

function Users(){

    useEffect(() => {
        setRootStyle(true)
    }, [])

    return(
        <MainContainer>
            <UsersMain />
        </MainContainer>
    )

}

export default Users