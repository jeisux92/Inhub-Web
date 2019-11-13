import React, { lazy, Suspense, useEffect } from "react";
import {
    Route,
    BrowserRouter,
    Redirect,
    Switch,
} from "react-router-dom";
import { connect } from "react-redux";
import Loading from "components/Loading/Loading";
import Modal from "components/Modal/Modal";
import { authCheckState } from "./store/actions/auth";


const AuthLayout = lazy(() => import('./layouts/Auth'));
const AdminLayout = lazy(() => import('./layouts/Admin'));



const loading = (<Modal fullWindow>
    <Loading />
</Modal>);


const App = props => {
    const { onCheckAuth } = props;
    useEffect(() => {
        onCheckAuth();
    }, [onCheckAuth])


    let routes = <>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        {window.location.pathname.indexOf("admin") === -1 ? <Redirect from="/" to="/auth" /> : null}
    </>;

    if (props.isAuthenticated) {
        routes = <>
            <Route path="/admin" component={AdminLayout} />
            <Redirect from="/" to="/admin" />
        </>
    }
    return (
        <BrowserRouter >
            <Suspense fallback={loading}>
                <Switch>
                    {routes}
                </Switch>
            </Suspense>
        </BrowserRouter >
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token != null
});

const mapDispatchToProps = dispatch => ({
    onCheckAuth: () => dispatch(authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);