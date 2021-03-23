import React from 'react'
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Hxh from './views/Hxh'
import HxhHistory from './views/HxhHistory'
import Login from './views/Login'
import Andon from './views/Andon'
import Tpm from './views/Tpm'
import Mp from './views/Mp'

import ProviderHXH from './reducers/ProviderHXH'
import ProviderTPM from './reducers/ProviderTPM'
import ProviderMP from './reducers/ProviderMP'

function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/hxh" >
                    <ProviderHXH>
                        <Hxh />
                    </ProviderHXH>
                </Route>
                <Route exact path="/hxh/historial" >
                    <ProviderHXH>
                        <HxhHistory />
                    </ProviderHXH>
                </Route>
                <Route exact path="/" >
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/mp" >
                    <ProviderMP>
                        <Mp />
                    </ProviderMP>
                </Route>
                <Route exact path="/login" >
                    <Login />
                </Route>
                <Route exact path="/andon" component={Andon} />
                <Route exact path="/tpm" >
                    <ProviderTPM>
                        <Tpm />
                    </ProviderTPM>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router