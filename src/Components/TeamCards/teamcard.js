import classes from './teamcard.module.css'
import { Link } from 'react-router-dom'

const TeamCard = (props)=>{
    return(
        <Link to={`/teamDetails/${props.data._id}/${props.data.id}/${props.data.short}`} className={classes.TeamCard}>
            <div>
                <div className={classes.TeamImageDiv}>  
                    <img className={classes.image} src={props.data.image} alt={props.data.short}/>
                    <p className={classes.TeamYear}>{props.data.founded}</p>
                </div>
                <div className={classes.DescriptionDiv}>
                    <h4 className={classes.TeamName}>{props.data.name}</h4>
                    <p className={classes.Description}>Founded By <span className={classes.TeamFounder}>{props.data.founder}</span></p> 
                </div>
            </div>
        </Link>
    );
}

export default TeamCard;
