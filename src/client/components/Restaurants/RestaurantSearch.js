import React, {Component} from "react";
import {connect} from "react-redux";
import RestaurantActions from "./actions";
import Autosuggest from "react-autosuggest";
import GeoSuggest from "react-geosuggest";
import '../geosuggest.css';
import {GoogleApiWrapper} from "google-maps-react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {theme} from "./theme.css";
import StarRatings from "react-star-ratings";
import {Map} from 'immutable';

class RestaurantSearch extends Component {
    constructor() {
        super();

        this.state = {
            search: Map({
                showAdvancedSearch: false,
                query: Map({
                    name: "",
                    location: null,
                    minimumScore: 0,
                    closerBetterScale: 0.5 // 0 for closer, 1 for better
                })
            })
        };
    }

    componentDidMount() {
        this.props.loadRestaurantsEventHandler();
    }

    onSuggestSelect = suggest => {
        const location = suggest ? suggest.location : null;
        // When the location string is empty, suggest is null
        this.setState(
            {
                search: this.state.search.setIn(["query", "location"], location)
            },
            () => {
                this.props.filterRestaurantsEventHandler(
                    this.state.search.get("query").toJS()
                );
            }
        );
    };

    onMinimumScoreChange = val => {
        let minimumScore = this.state.search.getIn(["query", "minimumScore"]) === val ? 0 : val;
        this.setState(
            {
                search: this.state.search.setIn(["query", "minimumScore"], minimumScore)
            },
            () =>
                this.props.filterRestaurantsEventHandler(
                    this.state.search.get("query").toJS()
                )
        );
    };

    onCloserBetterScaleChange = e => {
        this.setState(
            {
                search: this.state.search.setIn(
                    ["query", "closerBetterScale"],
                    e.target.value
                )
            },
            () => {
                this.props.filterRestaurantsEventHandler(
                    this.state.search.get("query")
                );
            }
        );
    };

    // Autosuggest will call this function every time you need to update suggestions.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState(
            {
                search: this.state.search.setIn(["query", "name"], value)
            },
            () =>
                this.props.filterRestaurantsEventHandler(
                    this.state.search.get("query").toJS()
                )
        );
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
    };

    onSuggestionSelected = (
        event,
        {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}
    ) => {
        window.location.href = `/#/details?id=${suggestion._id}`;
    };

    render() {
        const inputProps = {
            value: this.state.search.getIn(["query", "name"]),
            onChange: (e, {newValue}) => {
                this.setState({
                    search: this.state.search.setIn(["query", name], newValue)
                });
            }
        };

        return (
            <Container>
                {/* <Row>
          <Image
            src={require("./logo.png")}
            style={{ height: 200 }}
            className="mx-auto"
          />
        </Row> */}
                <Row className="justify-content-md-center">
                    <Col>
                        <Autosuggest
                            suggestions={Array.from(this.props.filteredRestaurants)}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            onSuggestionSelected={this.onSuggestionSelected}
                            getSuggestionValue={val => val.name}
                            renderSuggestion={suggestion => <div>{suggestion.name}</div>}
                            inputProps={inputProps}
                            alwaysRenderSuggestions={true}
                            theme={theme}
                        />
                    </Col>
                    <Col>
                        <Row>
                            <Button
                                onClick={() =>
                                    this.setState({
                                        search: this.state.search.update(
                                            "showAdvancedSearch",
                                            sas => !sas
                                        )
                                    })
                                }
                                variant="dark"
                                style={{background: "#651313"}}
                            >
                                Advanced Search
                            </Button>
                        </Row>
                        {this.state.search.get("showAdvancedSearch") && (
                            <div>
                                <br/>
                                <Row>
                                    <GeoSuggest
                                        ref={el => (this._geoSuggest = el)}
                                        onSuggestSelect={this.onSuggestSelect}
                                        country="il"
                                    />
                                </Row>
                                <Row>
                                    <label>Minimum Rating</label>
                                    <StarRatings
                                        rating={this.state.search.getIn(["query", "minimumScore"])}
                                        starRatedColor="blue"
                                        starHoverColor="blue"
                                        numberOfStars={5}
                                        name="rating"
                                        starDimension="20px"
                                        starSpacing="2px"
                                        changeRating={this.onMinimumScoreChange}
                                    />
                                </Row>
                                <Row>
                                    <label>Closer</label>
                                    <input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        value={this.state.search.getIn([
                                            "query",
                                            "closerBetterScale"
                                        ])}
                                        onChange={this.onCloserBetterScaleChange}
                                    />
                                    <label>Better</label>
                                </Row>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        filteredRestaurants: state["restaurants"].get("filteredRestaurants")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        filterRestaurantsEventHandler: query => {
            dispatch(RestaurantActions.filterRestaurantsAction(query));
        },
        loadRestaurantsEventHandler: () => {
            dispatch(RestaurantActions.loadRestaurantsAction());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    GoogleApiWrapper({
        apiKey: "XXX"
    })(RestaurantSearch)
);
