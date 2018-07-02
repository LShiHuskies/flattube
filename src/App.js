import React, { Component } from 'react';
import Adapter from './Adapter';
import TVShowList from './Components/TVShowList';
import Filter from './Components/Filter';
import Search from './Components/Search';
import SelectedShowContainer from './Components/SelectedShowContainer';
import './App.css';

class App extends Component {

  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
  }

  componentDidMount = () => {
    Adapter.getShows().then(shows => this.setState({shows}))
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => this.setState({
      selectedShow: show,
      episodes
    }))
  }

  render = () => {
    return (
      <div>
        <Search handleSearch={this.handleSearch} search={this.state.searchTerm}/>
        {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} episodes={this.state.episodes}/> : <div/>}
        <TVShowList shows={this.state.shows} searchTerm={this.state.searchTerm} selectShow={this.selectShow}/>
        <Filter />
      </div>
    );
  }
}

export default App;
