import React from "react";
import "./App.scss";
import {connect} from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";
import Routes from "./Routes";
import UserSearch from "../Users/UserSearch";
import checkToken from "../Users/checkToken";
import {Container, Image, Row} from "react-bootstrap";

class App extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="/">RestauRank</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <LinkContainer to="/restaurants">
                                    <Nav.Link>Restaurants</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/search">
                                    <Nav.Link>Search Restaurant</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/add">
                                    <Nav.Link>Add Restaurant</Nav.Link>
                                </LinkContainer>
                            </Nav>
                            <Nav>
                                <LinkContainer to="/profile">
                                    <UserSearch/>
                                </LinkContainer>
                                <LinkContainer to="/profile">
                                    <Nav.Link>Profile</Nav.Link>
                                </LinkContainer>
                                {!this.props.userAuthenticated && (
                                    <Nav>
                                        <LinkContainer to="/login">
                                            <Nav.Link>Login</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/register">
                                            <Nav.Link>Register</Nav.Link>
                                        </LinkContainer>
                                    </Nav>
                                )}
                                {this.props.userAuthenticated && (
                                    <Nav.Link href="/api/users/logout">Logout</Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    <Row>
                        <Image
                            src={require("../../../../logo.png")}
                            style={{height: 200}}
                            className="mx-auto"
                        />
                    </Row>

                    <Routes/>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAuthenticated: state["users"].get("userAuthenticated")
    };
};

export default connect(
    mapStateToProps,
    null
)(checkToken(App));
