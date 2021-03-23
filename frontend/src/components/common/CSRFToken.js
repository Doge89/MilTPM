import React from 'react'
import Cookies from 'js-cookie'

const csrftoken = Cookies.get('csrftoken')

function CSRFToken(){
    return(
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    )
}

export default CSRFToken