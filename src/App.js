import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import { Provider } from "react-redux";
import store from "./store";
import "semantic-ui-css/semantic.min.css";
import { loadUser } from "./store/actions/auth";
import Layout from "./components/layout/Layout";


class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }


    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout {...this.props}>
                        <BaseRouter />
                    </Layout>
                </Router>
            </Provider>
        );
    }
}

export default App;
