import React, {Component} from "react";
import {connect} from "react-redux";
import RestaurantActions from "./actions";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import StarRatings from "react-star-ratings";
import {Map} from "immutable";

class EditReview extends Component {
    constructor() {
        super();
    }

    componentWillMount = () => {
        const review = this.props.review;
        this.setState({
            review: Map({
                id: review._id,
                bathroomQuality: review.bathroomQuality,
                staffKindness: review.staffKindness,
                cleanliness: review.cleanliness,
                driveThruQuality: review.driveThruQuality,
                deliverySpeed: review.deliverySpeed,
                foodQuality: review.foodQuality,
                pictures: review.pictures,
                description: review.description
            })
        });
    };

    handleImage = e => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        files.forEach(image => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    review: this.state.review.update("pictures", pictures =>
                        pictures.push(reader.result)
                    )
                });
            };
            reader.readAsDataURL(image);
        });
    };

    handleDescription = e => {
        this.setState({
            review: this.state.review.set("description", e.target.value)
        });
    };

    handleRating = (name, val) => {
        if (
            (name === "deliverySpeed" || name === "driveThruQuality") &&
            this.state.review.get(name) === val
        ) {
            this.setState({review: this.state.review.set(name, 0)});
        } else {
            this.setState({review: this.state.review.set(name, val)});
        }
    };

    onSubmit = e => {
        const review = this.state.review.toJS();
        this.props.editReviewEventHandler(review);
        this.props.loadRestaurantDetailsEventHandler(this.props.review.restaurant);
    };

    render() {
        return (
            <Container>
                <h5>Edit Review</h5>
                <Form onSubmit={this.onSubmit}>
                    <Form.Row>
                        <FormLabel>Description </FormLabel>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={this.state.review.get("description")}
                            onChange={this.handleDescription}
                        />
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormLabel>Bathroom Quality</FormLabel>
                        </Col>
                        <Col>
                            <StarRatings
                                rating={this.state.review.get("bathroomQuality")}
                                starRatedColor="blue"
                                starHoverColor="blue"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                changeRating={val => this.handleRating("bathroomQuality", val)}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormLabel>Staff Kindness</FormLabel>
                        </Col>
                        <Col>
                            <StarRatings
                                rating={this.state.review.get("staffKindness")}
                                starRatedColor="blue"
                                starHoverColor="blue"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                changeRating={val => this.handleRating("staffKindness", val)}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormLabel>Cleanliness</FormLabel>
                        </Col>
                        <Col>
                            <StarRatings
                                rating={this.state.review.get("cleanliness")}
                                starRatedColor="blue"
                                starHoverColor="blue"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                changeRating={val => this.handleRating("cleanliness", val)}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormLabel>Drive-thru Quality</FormLabel>
                        </Col>
                        <Col>
                            <StarRatings
                                rating={this.state.review.get("driveThruQuality")}
                                starRatedColor="blue"
                                starHoverColor="blue"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                changeRating={val => this.handleRating("driveThruQuality", val)}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormLabel>Delivery Speed</FormLabel>
                        </Col>
                        <Col>
                            <StarRatings
                                rating={this.state.review.get("deliverySpeed")}
                                starRatedColor="blue"
                                starHoverColor="blue"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                changeRating={val => this.handleRating("deliverySpeed", val)}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <FormLabel>Food Quality</FormLabel>
                        </Col>
                        <Col>
                            <StarRatings
                                rating={this.state.review.get("foodQuality")}
                                starRatedColor="blue"
                                starHoverColor="blue"
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                changeRating={val => this.handleRating("foodQuality", val)}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={this.handleImage}
                            multiple="multiple"
                        />
                    </Form.Row>
                    {this.state.review.get("pictures").map((image, idx) => (
                        <Image
                            key={`review-image-${idx}`}
                            src={image}
                            style={{width: 100, height: 100}}
                            alt="review"
                        />
                    ))}
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
        userAuthenticated: state["users"].get("userAuthenticated")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editReviewEventHandler: review => {
            dispatch(RestaurantActions.editReviewAction(review));
        },
        loadRestaurantDetailsEventHandler: restaurantId => {
            dispatch(RestaurantActions.loadRestaurantDetailsAction(restaurantId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditReview);
