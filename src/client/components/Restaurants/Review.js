import React, {Component} from "react";
import {connect} from "react-redux";
import RestaurantActions from "./actions";
import EditReview from "./EditReview";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import StarRatings from "react-star-ratings";
import Card from "react-bootstrap/Card";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Carousel, Image} from "react-bootstrap";

class Review extends Component {
    constructor() {
        super();

        this.state = {
            editMode: false
        };
    }

    onClickDelete = () => {
        this.props.deleteReviewEventHandler(this.props.review._id);
        window.location.reload(true);
    };

    render() {
        return (
            <Container>
                <Card style={{width: "25rem"}} className="mx-auto">
                    <Carousel>
                        {this.props.review.pictures.map((pic, idx) => (
                            <Carousel.Item key={`carousel-item-${idx}`}>
                                <Image src={pic} style={{height: 150, margin: "auto", display: "block"}}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Card.Body>
                        <Card.Title>{this.props.review.description}</Card.Title>
                        <Row>
                            <Col>Bathroom Quality</Col>
                            <Col>
                                <StarRatings
                                    rating={this.props.review.bathroomQuality}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Staff Kindness</Col>
                            <Col>
                                <StarRatings
                                    rating={this.props.review.staffKindness}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Cleanliness</Col>
                            <Col>
                                <StarRatings
                                    rating={this.props.review.cleanliness}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Drive Thru Quality</Col>
                            <Col>
                                <StarRatings
                                    rating={this.props.review.driveThruQuality}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Delivery Speed</Col>

                            <Col>
                                <StarRatings
                                    rating={this.props.review.deliverySpeed}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                            </Col>
                        </Row>
                        <Row/>
                        <Row>
                            <Col>Food Quality</Col>
                            <Col>
                                <StarRatings
                                    rating={this.props.review.foodQuality}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="20px"
                                    starSpacing="2px"
                                />
                            </Col>
                        </Row>
                        <br/>
                        <Card.Text>
                            Written by {this.props.review.reviewer.username}
                        </Card.Text>
                        {this.props.user &&
                        this.props.review.reviewer.username ===
                        this.props.user.username &&
                        !this.state.editMode && (
                            <ButtonToolbar>
                                <ButtonGroup className="mr-2">
                                    <Button onClick={this.onClickDelete}>Delete</Button>
                                </ButtonGroup>
                                <ButtonGroup className="mr-2">
                                    <Button
                                        onClick={() =>
                                            this.setState({editMode: !this.state.editMode})
                                        }
                                    >
                                        Edit
                                    </Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        )}
                    </Card.Body>
                </Card>

                {this.state.editMode && <EditReview review={this.props.review}/>}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state["users"].get("user")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteReviewEventHandler: reviewId => {
            dispatch(RestaurantActions.deleteReviewAction(reviewId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Review);
