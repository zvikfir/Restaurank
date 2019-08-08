import React, {Component} from "react";
import {connect} from "react-redux";
import GeoSuggest from "react-geosuggest";
import '../geosuggest.css';
import {GoogleApiWrapper} from "google-maps-react";
import UsersActions from "./actions";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Map} from 'immutable';

class EditProfile extends Component {
    constructor() {
        super();

        this.state = {
            profile: Map({
                username: "",
                location: ""
            })
        };
    }

    componentWillMount() {
        const {username, location} = this.props.user;
        this.setState({
            profile: Map({username, location})
        });
    }

    handleInput = event => {
        this.setState({
            profile: this.state.profile.set(event.target.name, event.target.value)
        });

        if (event.target.name === "username") {
            this.props.checkIfUsernameExistsEventHandler(event.target.value);
        }
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

    onSubmit = e => {
        // e.preventDefault();

        this.props.editProfileEventHandler({
            ...this.state.profile.toJS(),
            oldUsername: this.props.user.username
        });
    };

    render() {
        return (
            <Container>
                <hr/>
                <h3>Edit Profile</h3>
                <Form onSubmit={this.onSubmit}>
                    <FormLabel>Username:</FormLabel>
                    <Form.Control
                        type="text"
                        name="username"
                        value={this.state.profile.get("username")}
                        onChange={this.handleInput}
                    />
                    {this.props.usernameExists && <p>Username already exists</p>}
                    <FormLabel>Location: </FormLabel>
                    <GeoSuggest
                        ref={el => (this._geoSuggest = el)}
                        initialValue={this.state.profile.getIn(["location", "label"])}
                        onSuggestSelect={this.onSuggestSelect}
                        country="il"
                    />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <hr/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state["users"].get("user"),
        usernameExists: state["users"].get("usernameExists")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editProfileEventHandler: user => {
            dispatch(UsersActions.editProfileAction(user));
        },
        checkIfUsernameExistsEventHandler: username => {
            dispatch(UsersActions.checkIfUsernameExistsAction(username));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    GoogleApiWrapper({
        apiKey: "XXX"
    })(EditProfile)
);
