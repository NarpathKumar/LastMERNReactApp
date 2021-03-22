import React from 'react'
import classes from './App.module.css';

import Header from './Components/Header/header';
import HomePage from './Containers/HomePage/homepage';
import TeamPage from './Containers/TeamPage/team';
import PlayerPage from './Containers/PlayersPage/plaPage';

import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'

class App extends React.Component{

  state = {
    currentPage: "home",
    teamNames: [],
    searchedPlayersData : [],
    teamDetailForHeader: {},
    playerAddedFromForm: {}
  }

  updatePlayerAdded(data){
    this.setState({playerAddedFromForm: data})
  }

  changeTeamDetailForHeader(data){
    this.setState({teamDetailForHeader: data})
  }

  changeAppPlayersData(data){
    this.setState({searchedPlayersData: data})
  }

  changePage(arg){
    this.setState({currentPage : arg})
  }

  updateTeamNames(data){
    this.setState({teamNames: data})
  }

  render(){
    return(
        <div>
          <BrowserRouter>
            <Route render={(renProps)=>{
              return <Header history={renProps.history} page={this.state.currentPage} teamNames={this.state.teamNames} changeAppPlayersData={this.changeAppPlayersData.bind(this)} detailsForAddPlayer={this.state.teamDetailForHeader}/>
            }}/>
            <Route exact path="/" render={()=>{
              return <HomePage changePage={this.changePage.bind(this)} updateTeamNames={this.updateTeamNames.bind(this)} appPlayersData={this.state.searchedPlayersData}/>
            }}/>
            <Route exact path="/teamDetails/:id/:teamId/:teamShort" render={(renProps)=>{
              return <TeamPage changePage={this.changePage.bind(this)} props={renProps}  />
            }}
            />
            <Route exact path="/playerDetails/:id/:team" render={(renProps)=>{
              return <PlayerPage props={renProps} changePage={this.changePage.bind(this)}/>
            }}/>

          </BrowserRouter>
        </div>
    );
  }
}

export default App;
