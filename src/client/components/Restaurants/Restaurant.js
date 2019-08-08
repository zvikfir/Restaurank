import React, { Component } from "react";
import { connect } from "react-redux";
import RestaurantActions from "./actions";
import AddReview from "./AddReview";
import Review from "./Review";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import CardDeck from "react-bootstrap/CardDeck";
import StarRatings from "react-star-ratings";
import {
  ToggleButton,
  ToggleButtonGroup,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import { Map } from "immutable";
import DropdownItem from "react-bootstrap/DropdownItem";

const topicOptions = {
  none: "None",
  bathroomQuality: "Bathroom Quality",
  staffKindness: "Staff Kindness",
  cleanliness: "Cleanliness",
  driveThruQuality: "Drive Thru Quality",
  deliverySpeed: "Delivery Speed",
  foodQuality: "Food Quality"
};

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: Map({
        creationDate: {
          type: "newest",
          timeLapseInDays: 7
        },
        topic: {
          name: "none",
          threshold: 0
        }
      })
    };
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.location.search);
    const restaurantId = params.get("id");

    this.props.loadRestaurantDetailsEventHandler(restaurantId);
  }

  sortReviews = () => {
    this.props.sortReviewsEventHandler({ ...this.state.sort.toJS() });
  };

  onCreationDateSortTypeChange = value => {
    this.setState(
      {
        sort: this.state.sort.setIn(["creationDate", "type"], value)
      },
      this.sortReviews
    );
  };

  onCreationDateTimeLapseChange = value => {
    this.setState(
      {
        sort: this.state.sort.setIn(["creationDate", "timeLapseInDays"], value)
      },
      this.sortReviews
    );
  };

  onTopicNameChange = val => {
    this.setState(
      {
        sort: this.state.sort.setIn(["topic", "name"], val)
      },
      this.sortReviews,
      () => {
        if (val == "none") {
          this.setState(
            {
              sort: this.state.sort.setIn(["topic", "threshold"], 0)
            },
            this.sortReviews
          );
        }
      }
    );
  };

  onTopicThresholdChange = val => {
    if (this.state.sort.getIn(["topic", "name"]) == "none") return;

    if (this.state.sort.getIn(["topic", "threshold"]) == val) {
      this.setState(
        { sort: this.state.sort.setIn(["topic", "threshold"], 0) },
        this.sortReviews
      );
    } else {
      this.setState(
        {
          sort: this.state.sort.setIn(["topic", "threshold"], val)
        },
        this.sortReviews
      );
    }
  };

  render() {
    if (!this.props.restaurant) {
      return (
        <Container>
          <p>Restaurant not found</p>
        </Container>
      );
    }
    return (
      <Container>
        <Jumbotron style={{ textAlign: "center" }}>
          <h1>{this.props.restaurant.name}</h1>
          <h3>{this.props.restaurant.location.label}</h3>
          <StarRatings
            rating={this.props.restaurant.rating}
            starRatedColor="blue"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="2px"
          />
        </Jumbotron>
        <Row>
          <ToggleButtonGroup
            toggle
            type="radio"
            name="creationDateSortType"
            defaultValue="newest"
            onChange={this.onCreationDateSortTypeChange}
          >
            <ToggleButton value="newest">From newest</ToggleButton>
            <ToggleButton value="oldest">From oldest</ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Row>
          <ToggleButtonGroup
            toggle
            type="radio"
            name="creationDateTimeLapse"
            defaultValue={7}
            onChange={this.onCreationDateTimeLapseChange}
          >
            <ToggleButton value={7}>Since Last Week</ToggleButton>
            <ToggleButton value={30}>Since Last Month</ToggleButton>
            <ToggleButton value={365}>Since Last Year</ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Row>
          <Dropdown>
            <DropdownButton
              onSelect={this.onTopicNameChange}
              title={topicOptions[this.state.sort.getIn(["topic", "name"])]}
            >
              {Object.keys(topicOptions).map(topic => (
                <Dropdown.Item key={`topic-${topic}`} eventKey={topic}>
                  {topicOptions[topic]}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Dropdown>
          <StarRatings
            rating={this.state.sort.getIn(["topic", "threshold"])}
            starRatedColor="blue"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="2px"
            changeRating={this.onTopicThresholdChange}
          />
        </Row>
        <Row>
          <CardDeck className="mx-auto">
            {this.props.filteredReviews.map((review, idx) => (
              <Review key={`review-${idx}`} review={review} />
            ))}
          </CardDeck>
        </Row>
        <br />
        <Row>
          <AddReview restaurantId={this.props.restaurant._id} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state["restaurants"].get("restaurant"),
    filteredReviews: state["restaurants"].get("filteredRestaurantReviews")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRestaurantDetailsEventHandler: restaurantId => {
      dispatch(RestaurantActions.loadRestaurantDetailsAction(restaurantId));
    },
    sortReviewsEventHandler: sort => {
      dispatch(RestaurantActions.sortRestaurantReviewsAction(sort));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
