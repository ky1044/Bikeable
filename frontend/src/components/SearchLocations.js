import React from "react"
import Autosuggest from 'react-autosuggest';
import './Search.css';
  

const getSuggestions = (value,locations) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return locations.filter(loc =>
        loc.toLowerCase().slice(0, inputLength) === inputValue
    );
  };


function shouldRenderSuggestions() {
    return true;
    }
  

const renderSuggestion = suggestion => (
    <div >
       {suggestion}
    </div>
  );

class SearchLocations extends React.Component{
    constructor() {
      super();
  
      // Autosuggest is a controlled component.
      // This means that you need to provide an input value
      // and an onChange handler that updates this value (see below).
      // Suggestions also need to be provided to the Autosuggest,
      // and they are initially empty because the Autosuggest is closed.
      this.state = {
        value: '',
        suggestions: []
      };
    }
    getSuggestionValue = suggestion => {
        this.props.handleLocationChange(suggestion);
        return suggestion}
  
    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue
      });
    };
  
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value,Object.keys(this.props.locationCoordinates).map((key,index)=>(
            key
            ))).filter((key,index)=>(index<5))
      });
    };
  
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
      const { value, suggestions } = this.state;
  
      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: 'Search Locations',
        value,
        onChange: this.onChange
      };
  
      // Finally, render it!
      return (
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          shouldRenderSuggestions={shouldRenderSuggestions}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      );
    }
  }
export default SearchLocations