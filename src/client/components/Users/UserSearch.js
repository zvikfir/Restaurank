import React, {Component} from "react";
import {connect} from "react-redux";
import UsersActions from "./actions";
import Autosuggest from "react-autosuggest";
import {List, Map} from "immutable";

class UserSearch extends Component {
    constructor() {
        super();
        this.state = {
            search: Map({
                suggestions: List(),
                query: ""
            })
        };
    }

    // Autosuggest will call this function every time you need to update suggestions.
    onSuggestionsFetchRequested = ({value}) => {
        this.props.loadSearchUsernamesEventHandler(value);
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
    };

    onSuggestionSelected = (
        event,
        {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}
    ) => {
        this.setState({search: this.state.search.set("query", "")});
        window.location.href = `/#/profile?username=${suggestionValue}`;
        window.location.reload(true);
    };

    render() {
        const inputProps = {
            placeholder: "Users Search",
            value: this.state.search.get("query"),
            onChange: (e, {newValue}) => {
                this.setState({search: this.state.search.set("query", newValue)});
            }
        };

        return (
            <div>
                <Autosuggest
                    suggestions={this.props.usernames}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={val => val}
                    renderSuggestion={suggestion => <div>{suggestion}</div>}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        usernames: state["users"].get("search")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadSearchUsernamesEventHandler: query => {
            dispatch(UsersActions.loadSearchUsernamesAction(query));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSearch);
