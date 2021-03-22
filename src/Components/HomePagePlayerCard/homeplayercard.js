import classes from './homeplayer.module.css'

const HomePlayerCard = (props)=>{
    return(
        <div className={classes.HomePagePlayerCardDiv}>
            <img src={props.data.photo} alt="player"/>
            <p>{props.data.playerName}</p>
        </div>
    );
}

export default HomePlayerCard;