import React, {Component} from "react";
import UsersActions from "./actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import GeoSuggest from "react-geosuggest";
import '../geosuggest.css';
import {GoogleApiWrapper} from "google-maps-react";
import Container from "react-bootstrap/Container";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import {Map} from "immutable";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: Map({
                username: "",
                password: "",
                image: null,
                location: null
            })
        };
    }

    componentDidMount() {
        this.props.checkTokenEventHandler();
    }

    handleInput = event => {
        this.setState({
            profile: this.state.profile.set(event.target.name, event.target.value)
        });

        if (event.target.name === "username") {
            this.props.checkIfUsernameExistsEventHandler(event.target.value);
        }
    };

    handleImage = event => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const image = fileReader.result;
            this.setState({profile: this.state.profile.set("image", image)});
        };
        fileReader.readAsDataURL(event.target.files[0]);
    };

    onSubmit = event => {
        const user = this.state.profile.toJS();
        this.props.registerEventHandler(user);
    };

    onSuggestSelect = suggest => {
        if (suggest) {
            // When the location string is empty, suggest is null
            this.setState({
                profile: this.state.profile.set("location", {
                    location: suggest.location,
                    label: suggest.label
                })
            });
        }
    };

    render() {
        if (this.props.userAuthenticated) {
            return <Redirect to="/restaurants"/>;
        }
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <FormLabel>Username</FormLabel>
                    <Form.Control
                        name="username"
                        type="text"
                        value={this.state.profile.get("username")}
                        onChange={this.handleInput}
                    />
                    {this.props.usernameExists && <p>Username already exists</p>}
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                        name="password"
                        value={this.state.profile.get("password")}
                        type="password"
                        onChange={this.handleInput}
                    />
                    <FormLabel>Profile Image </FormLabel>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={this.handleImage}
                    />
                    <br/>
                    <Image src={this.state.profile.get("image")} style={{width: 100, height: 100}}/>
                    <br/>
                    <FormLabel>Location</FormLabel>
                    <GeoSuggest
                        ref={el => (this._geoSuggest = el)}
                        onSuggestSelect={this.onSuggestSelect}
                        country="il"
                    />
                    <br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAuthenticated: state["users"].get("userAuthenticated"),
        usernameExists: state["users"].get("usernameExists")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkIfUsernameExistsEventHandler: username => {
            dispatch(UsersActions.checkIfUsernameExistsAction(username));
        },
        registerEventHandler: user => {
            dispatch(UsersActions.registerAction(user));
        },
        checkTokenEventHandler: () => {
            dispatch(UsersActions.checkUserTokenAction());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    GoogleApiWrapper({
        apiKey: "XXX"
    })(Register)
);
