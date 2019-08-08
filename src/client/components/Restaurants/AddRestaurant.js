import React, {Component} from "react";
import {connect} from "react-redux";
import RestaurantActions from "./actions";
import GeoSuggest from "react-geosuggest";
import '../geosuggest.css';
import {GoogleApiWrapper} from "google-maps-react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Map} from "immutable";

class AddRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: Map({name: "", location: null})
        };
    }

    handleInput = (inputName, val) => {
        this.setState({
            restaurant: this.state.restaurant.set(inputName, val)
        });
    };

    onSuggestSelect = suggest => {
        if (suggest) {
            // When the location string is empty, suggest is null
            this.setState({
                restaurant: this.state.restaurant.set("location", {
                    location: suggest.location,
                    label: suggest.label
                })
            });
        }
    };

    onSubmit = event => {
        this.props.addRestaurantEventHandler(this.state.restaurant.toJS());
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formRestaurantName">
                        <Form.Label column={2}>Restaurant Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.restaurant.get("name")}
                            onChange={e => this.handleInput("name", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formRestaurantLocation">
                        <Form.Label column={2}>Location</Form.Label>
                        <GeoSuggest
                            ref={el => (this._geoSuggest = el)}
                            onSuggestSelect={this.onSuggestSelect}
                            country="il"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        addRestaurantEventHandler: restaurant => {
            dispatch(RestaurantActions.addRestaurantAction(restaurant));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    GoogleApiWrapper({
        apiKey: "AIzaSyANADsw_-6DHTmkiQOjbTriFK46KLnI7PM"
    })(AddRestaurant)
);
