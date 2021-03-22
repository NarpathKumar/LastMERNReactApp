import React from 'react'
import classes from './homepage.module.css'
import TeamCard from '../../Components/TeamCards/teamcard';
import { Link } from 'react-router-dom';

import HomePlayerCard from '../../Components/HomePagePlayerCard/homeplayercard'

class HomePage extends React.Component{

    state = {
        teamData: [],
        playersData : [],
    }

    componentDidMount(){
        this.props.changePage("home")
        fetch('http://localhost:9000/getTeamDetails').then(res=>{
            res.json().then(data=>{
                this.setState({teamData: data})
                this.props.updateTeamNames(data);
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    render(){
        let toRender = <div></div> 
        if(this.state.teamData.length !=0){
            toRender = null;
            toRender = this.state.teamData.map(item=>{
                return <TeamCard key={item.id} data={item} />
            })
        }

        let cardRender = <div></div>
        if(this.props.appPlayersData.length!=0){
            cardRender = null;
            cardRender = this.props.appPlayersData.map(item=>{
               return <HomePlayerCard data={item}/>
            })
        }

        return(
            <div className={classes.MainDiv}>
                {this.props.appPlayersData!=undefined?
                    this.props.appPlayersData.length > 0?
                        <div className={classes.HomePagePlayersDiv}>
                            {cardRender}
                        </div>
                    :
                        toRender
                :
                null
                }
            </div>
        );
    }
    }

export default HomePage;
