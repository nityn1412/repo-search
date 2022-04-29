import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {createBrowserHistory} from "history"
import {navPaths} from "../../AppConfig";
import RepoList from "../feature/RepoList";
import HeaderBar from "../reusable/Header";
import {Grid} from "@mui/material";

const AppRouter = (props) => {
    const history = props.history || createBrowserHistory()

    /* Route Definitions */
    const routeDefinitions = [
        {path: navPaths.home, component: RepoList, exact: true},
        {path: navPaths.repoSearch, component: RepoList, exact: true},
    ]

    /* Route Components */
    const routeComponents = routeDefinitions.map((routeDefinition, i) => {
        const Component = routeDefinition.component
        const withHeader = <Grid>
            <HeaderBar />
            <Component />
        </Grid>
        return <Route exact={routeDefinition.exact} path={routeDefinition.path} key={i} element={withHeader} />
    })

    return(
        <BrowserRouter history={history}>
            <Routes>
                {routeComponents}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
