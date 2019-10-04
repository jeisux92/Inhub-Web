import React, { lazy, Suspense } from "react";
import {
    Route,
    BrowserRouter,
    Redirect,
    Switch
} from "react-router-dom";

const AuthLayout = lazy(() => import('./layouts/Auth'));
const AdminLayout = lazy(() => import('./layouts/Admin'));

const App = () => {
    return (
        <BrowserRouter >
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/auth" component={AuthLayout} />
                    <Route path="/admin" component={AdminLayout} />
                    <Redirect from="/" to="/auth" />
                </Switch>
            </Suspense>
        </BrowserRouter >
    );
}


export default App;