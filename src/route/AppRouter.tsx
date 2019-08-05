import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import CourierPage from "../courier/CourierPage";

class AppRouter extends React.PureComponent {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <React.Fragment>
                <Router>
                    <Route component={CourierPage} path={"/courier"}/>
                </Router>
            </React.Fragment>
        )
    }
}

export default AppRouter;