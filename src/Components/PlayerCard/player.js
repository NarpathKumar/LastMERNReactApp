import classes from './player.module.css'
import { Link } from 'react-router-dom'

const PlayerCard = (props)=>{
    return(
        <Link to={`/playerDetails/${props.data._id}/${props.team}`} className={classes.LinkAdjust}>
            <div className={classes.PlayerCard}>
                <div className={classes.TopDiv}>
                    <div className={classes.PlayerPosDiv}>
                        <p><span>{props.data.position}</span>: {props.data.playerName}</p>
                    </div>
                    <div className={classes.PlayerCardAbout}>
                        <div className={classes.FlagDiv}>
                            {props.team}
                            <img src={props.img} alt="India"/>
                        </div>
                        <div className={classes.PlayerImageDiv}>
                            <img className={classes.PlayerImage} src={props.data.photo} alt=""/>
                        </div>
                    </div>
                </div>
                <div className={classes.AfterDescDiv}>
                    <p>Price: <span>{props.data.price}</span></p>
                    <p>Playing Status: <span>{props.data.isPlaying?"Playing": "On-Bench"}</span></p>
                    <p>Role: <span>{props.data.description}</span></p>
                </div>
            </div>
        </Link>
    );
}

export default PlayerCard;
