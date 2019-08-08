import React, {Component} from "react";
import UsersActions from "./actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Container from "react-bootstrap/Container";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Map} from 'immutable';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: Map({
                username: "",
                password: ""
            })
        };
    }

    componentDidMount() {
        this.props.checkTokenEventHandler();
    }

    handleInput = event => {
        this.setState({
            credentials: this.state.credentials.set(event.target.name, event.target.value)
        });
    };

    onSubmit = event => {
        event.preventDefault();
        const {username, password} = this.state.credentials.toJS();
        this.props.loginEventHandler(username, password);
    };

    render() {
        if (this.props.userAuthenticated) {
            return <Redirect to="/restaurants"/>;
        }
        return (
            <Container>
                <br/>
                <Form onSubmit={this.onSubmit}>
                    <FormLabel>Username</FormLabel>
                    <Form.Control
                        name="username"
                        type="text"
                        value={this.state.credentials.get("username")}
                        onChange={this.handleInput}
                    />
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                        name="password"
                        value={this.state.credentials.get("password")}
                        type="password"
                        onChange={this.handleInput}
                    />
                    <br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <p>{this.props.loginMessage}</p>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAuthenticated: state["users"].get("userAuthenticated"),
        loginMessage: state["users"].get("loginMessage")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginEventHandler: (username, password) => {
            dispatch(UsersActions.loginAction(username, password));
        },
        checkTokenEventHandler: () => {
            dispatch(UsersActions.checkUserTokenAction());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
