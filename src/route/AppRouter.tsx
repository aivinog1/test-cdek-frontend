import React from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import CourierPage from "../courier/CourierPage";
import OperatorPage from "../operator/OperatorPage";
import {Button} from "antd";

type paths = "/courier" | "/operator" | undefined

class AppRouter extends React.PureComponent<any, { readonly clicked: paths }> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            clicked: undefined
        }
    }

    render(): any {
        const clicked = this.state.clicked;
        return (
            <React.Fragment>
                <Router>
                    <Route component={CourierPage} path={"/courier"}/>
                    <Route component={OperatorPage} path={"/operator"}/>
                    {clicked &&
                    <Redirect push={true} to={clicked}/>
                    }
                </Router>
                <Button onClick={() => {
                    this.setState({
                        clicked: "/operator"
                    })
                }}>
                    Login as operator.
                </Button>
                <Button onClick={() => {
                    this.setState({
                        clicked: "/courier"
                    })
                }}>
                    Login as courier.
                </Button>
            </React.Fragment>
        )
    }
}

export default AppRouter;
