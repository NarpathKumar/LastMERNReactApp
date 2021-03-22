import React, { useMemo } from 'react'
import classes from './team.module.css'
import { Link } from 'react-router-dom';
import PlayerCard from '../../Components/PlayerCard/player'

class TeamPage extends React.Component{

    state = {
        teamDesc : {
            founded: 2008,
            founder: "Vijay Mallya",
            id: 1,
            image: "https://s3.india.com/wp-content/uploads/2017/02/Rcb.jpg",
            name: "Royal Challengers Bangalore",
            short: "RCB",
            topBatsman: "Virat Kohli",
            topBowler: "Jasprit Bumrah",
            _id: "605736352a6a3439647436ca",
        },
        teamPlayers: [
            {
                id: 1,
                description: "Batsman",
                playerName: "Virat Kohli",
                price: "8.00cr",
                teamId: "2",
                photo: "",
                position: "batsman",
                _id: "6057243b0cea674d44beab72"
            }
        ]
    }

    shouldComponentUpdate(props,state){
        console.log(state.teamDesc, state.teamPlayers)
        return true
    }

    componentDidMount(){
        this.props.changePage("team")
        let toDescData = undefined;
        const fetching = async ()=>{
            await fetch(`http://localhost:9000/getTeamById?id=${this.props.props.match.params.id}`).then(res=>{
                res.json().then(data=>{
                    toDescData = data 
                    
                })
            })
            .catch(err=>{
                console.log(err)
            })

            await fetch(`http://localhost:9000/getPlayersForTeam?id=${this.props.props.match.params.teamId}`).then(res=>{
                res.json().then(data=>{
                    if(data!=undefined && toDescData!=undefined){
                        this.setState({teamDesc: toDescData, teamPlayers: data})
                        window.localStorage.setItem('TotalPlayers', data.length)
                    }
                })
            })

            
        }
        fetching();
    }
    
    render(){

        return(
                <div className={classes.MainDiv}>
                        <div className={classes.AboutTeamDiv}>
                            {Object.keys(this.state.teamDesc).length != 0?
                                <div className={classes.ImageDiv}>
                                    <img className={classes.image} src={this.state.teamDesc.image} alt=""/>
                                </div>
                                :
                                <div></div>
                            }
                            {Object.keys(this.state.teamDesc).length != 0?
                                <div className={classes.DescriptionDiv}>
                                    <p className={classes.TeamDescPara}>Team Name: <span>{this.state.teamDesc.name}</span></p>
                                    <p className={classes.TeamDescPara}>Total Players: <span>{this.state.teamPlayers.length}</span></p>
                                    <p className={classes.TeamDescPara}>Top BatsMan: <span>{this.state.teamDesc.topBatsman}</span></p>
                                    <p className={classes.TeamDescPara}>Top Bowler: <span>{this.state.teamDesc.topBowler}</span></p>
                                </div>
                                :
                                <div></div>
                            }
                        </div>

                        {Object.keys(this.state.teamDesc).length != 0?
                            <div className={classes.PlayersDiv}>  
                                {this.state.teamPlayers.map(item=>{
                                    return <PlayerCard data={item} team={this.state.teamDesc.short} img={this.state.teamDesc.image}/>
                                })}
                            </div>
                            :
                            <div></div>
                        }
                    
                </div>
        );
    }
}

export default TeamPage;
