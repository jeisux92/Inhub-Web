import React, { lazy, Suspense } from "react";
import {
    Route,
    BrowserRouter,
    Redirect,
    Switch
} from "react-router-dom";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";

const AuthLayout = lazy(() => import('./layouts/Auth'));
const AdminLayout = lazy(() => import('./layouts/Admin'));



const loading = (<Modal fullWindow>
    <Loading />
</Modal>);
const App = () => {
    return (
        <BrowserRouter >
            <Suspense fallback={loading}>
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