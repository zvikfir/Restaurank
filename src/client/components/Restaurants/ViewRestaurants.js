import React, {Component} from "react";
import {connect} from "react-redux";
import RestaurantActions from "./actions";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import StarRatings from "react-star-ratings";
import {LinkContainer} from "react-router-bootstrap";

class ViewRestaurants extends Component {
    componentDidMount() {
        this.props.loadRestaurantsEventHandler();
    }

    render() {
        return (
            <Container>
                <ListGroup>
                    {this.props.restaurants &&
                    this.props.restaurants.map((dto, idx) => {
                        return (
                            <LinkContainer
                                to={`/details?id=${dto._id}`}
                                key={`restaurant-${idx}`}
                            >
                                <ListGroup.Item>
                                    <h3>{dto.name}</h3>
                                    <StarRatings
                                        rating={dto.rating}
                                        starRatedColor="blue"
                                        numberOfStars={5}
                                        name="rating"
                                        starDimension="20px"
                                        starSpacing="2px"
                                    />
                                    <p>{dto.location.label}</p>
                                </ListGroup.Item>
                            </LinkContainer>
                        );
                    })}
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        restaurants: state.restaurants.get("filteredRestaurants")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadRestaurantsEventHandler: () => {
            dispatch(RestaurantActions.loadRestaurantsAction());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewRestaurants);
