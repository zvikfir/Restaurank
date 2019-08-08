import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import UsersActions from "./actions";
import {connect} from "react-redux";

export default function withAuth(ComponentToProtect) {
    const component = class extends Component {
        componentDidMount() {
            this.props.checkUserTokenEventHandler();
        }

        render() {
            if (this.props.isAuthenticating) {
                return null;
            }
            if (!this.props.isAuthenticating && !this.props.userAuthenticated) {
                return <Redirect to="/login"/>;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    };

    const mapStateToProps = state => {
        return {
            userAuthenticated: state["users"].get("userAuthenticated"),
            isAuthenticating: state["users"].get("isAuthenticating")
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            checkUserTokenEventHandler: () => {
                dispatch(UsersActions.checkUserTokenAction());
            }
        };
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(component);
}
