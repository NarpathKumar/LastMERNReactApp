import React, { useMemo } from 'react'
import classes from './plaPage.module.css'
import { Link } from 'react-router-dom';

class PlayerPage extends React.Component{

    state = {
        latestData : {}
    }

    componentDidMount(){
        this.props.changePage("player")
        fetch(`http://localhost:9000/getPlayerById?id=${this.props.props.match.params.id}`).then(res=>{
            res.json().then(data=>{
                this.setState({latestData: data[0]})
            })
        })
    }
    
    render(){
        return(
            <div className={classes.MainDiv}>
                {Object.keys(this.state.latestData).length != 0?
                <div className={classes.ShadowDiv}>
                    <div className={classes.imageDiv}>
                        <img src={this.state.latestData.photo} alt=""/>
                        <p>{this.state.latestData.playerName}</p>
                    </div>
                    <div className={classes.PlayerDescDiv}>
                        <h2>About</h2>
                        <p className={classes.DescText}>Player Name: <span className={classes.DescSpan}>{this.state.latestData.playerName}</span></p>
                        <p className={classes.DescText}>Team: <span className={classes.DescSpan}>{this.props.props.match.params.team}</span></p>
                        <p className={classes.DescText}>Price: <span className={classes.DescSpan}>{this.state.latestData.price}</span></p>
                        <p className={classes.DescText}>Role: <span className={classes.DescSpan}>{this.state.latestData.description}</span></p>
                        <p className={classes.DescText}>Playing Status: <span className={classes.DescSpan}>{this.state.latestData.isPlaying?"Playing": "On-Bench"}</span></p>
                    </div>
                </div>
                :
                <div></div>
                }
            </div>
        );
    }
}

export default PlayerPage;
