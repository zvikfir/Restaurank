import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EditProfile from "./EditProfile";
import UsersActions from "./actions";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Row, CardDeck } from "react-bootstrap";
import Review from "../Restaurants/Review";

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      username: ""
    };
  }

  componentDidMount() {
    this.props.checkUserTokenEventHandler();
    let params = new URLSearchParams(this.props.location.search);

    if (!params.get("username") && this.props.user) {
      params.set("username", this.props.user.username);
    }

    this.setState({
      username: params.get("username")
    });

    this.props.loadUserProfileEventHandler(params.get("username"));
  }

  render() {
    if (!this.props.userProfile) {
      return (
        <Container style={{ textAlign: "center" }}>
          <br />
          You are not logged in. Please <a href="/#/login">login</a> or{" "}
          <a href="/#/register">register</a>
        </Container>
      );
    }
    return (
      <Container>
        <br />
        <Card style={{ width: "18rem" }} className="mx-auto">
          <Card.Img src={this.props.userProfile.image} />
          <Card.Body>
            <Card.Title>{this.props.userProfile.username}</Card.Title>
            <Card.Text>{this.props.userProfile.location.label}</Card.Text>
          </Card.Body>
        </Card>
        {this.props.user &&
          this.props.user.username === this.state.username && <EditProfile />}
        <CardDeck className="mx-auto">
          {this.props.userProfile.reviews.map((review, idx) => (
            <Row className="mx-auto" key={`review-${idx}`}>
              <Link to={`/details?id=${review.restaurant._id}`}>
                <h4>{review.restaurant.name}</h4>
              </Link>
              <Review key={`review-${idx}`} review={review} />
            </Row>
          ))}
        </CardDeck>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state["users"].get("user"),
    userProfile: state["users"].get("userProfile")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkUserTokenEventHandler: () => {
      dispatch(UsersActions.checkUserTokenAction());
    },
    loadUserProfileEventHandler: username => {
      dispatch(UsersActions.loadUserProfileAction(username));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
