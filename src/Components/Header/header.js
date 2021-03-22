import React from 'react'
import classes from './header.module.css'

class Header extends React.Component{

  constructor(props){
    super(props);
    this.state={
      teamData : [],
      codeDisplay: false,
      formDisplay: false,
      sessionCode: null
    }
    this.inputRef = React.createRef()
  }

  changeFormDisplayStatus(){
    this.setState({formDisplay: !this.state.formDisplay})
  }

  changeDisplay(){
    this.setState({codeDisplay: !this.state.codeDisplay})
  }

  getPlayers(id){
    console.log(id)
    fetch(`http://localhost:9000/getPlayersForTeam?id=${id}`).then(res=>{
        res.json().then(data=>{
            if(data!=undefined){
                console.log(data)
                this.props.changeAppPlayersData(data)
            }
        })
    })
  }

  onInputSearch(e){
    let value = e.target.value.toLowerCase()
    if(value.length <=1){
      this.props.changeAppPlayersData([])
    }
    else if(value.length > 1){
      this.props.teamNames.map(item=>{
        let name = item.name.toLowerCase().split(" ");

        if(value.length === 1){
          if(name[0][0] === value){
            this.getPlayers(item.id)
          }
        }

        else if(value.length === 2){
          if(name.length > 1){
            if(name[0][0]===value[0] &&  name[1][0] ===value[1]){
              this.getPlayers(item.id)
            }
          }
        }

        else if(value.length === 3){
          if(name.length > 2){
            if(name[0][0]===value[0] &&  name[1][0] ===value[1] && name[2][0] === value[2]){
              this.getPlayers(item.id)
            }
          }
        }

        else if(value.length > 3){
          if(item.name.toLowerCase().includes(value)){
            this.getPlayers(item.id)
          }
        }
      })
    }
  }

  addPlayerFormSubmit(e){
    e.preventDefault();
    if(Number(e.target.sessionCode.value) == this.state.sessionCode ){
        let ev = e.target
        let obj = {
          "id": window.localStorage.getItem('TotalPlayers')+1,
          "playerName": ev.playerName.value,
          "from": window.location.pathname.split("/").splice(3,)[1],
          "price":ev.price.value + "cr",
          "isPlaying": Boolean(ev.isPlaying.value),
          "description": ev.role.value,
          "teamId": window.location.pathname.split("/").splice(3,)[0],
          "photo": ev.image.value,
          "position": ev.position.value
        }

        fetch('http://localhost:9000/addPlayerDetails', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        })
        .then(response => response.json()
          .then(data => {
            console.log('Success:', data);
            ev.reset();
            this.props.history.push("/")
            this.setState({formDisplay: !this.state.formDisplay})
          })
          .catch((error) => {
            console.error('Error:', error);
          })
        )

    }
    else {
        alert('Please Enter the same session code')
    }
  }

  componentDidMount(){
    if(this.state.sessionCode === null){
      this.setState({sessionCode: Math.floor((Math.random()*1000000)+1)
      })
    }
  }

  render(){
    return(
        <header className={classes.header}>
          {this.state.formDisplay ? 
          <div>
            <div onClick={()=>this.changeFormDisplayStatus()} className={classes.addPlayerOverlay}>
            </div>
            <div className={classes.addPlayerForm}>
              <div onClick={()=>this.changeFormDisplayStatus()} className={classes.exitForm}>X</div>
              <p>Enter the Session code to Add a player. <br/>
                Find this by clicking " ? " on top right corner
              </p>
              <form className={classes.RealForm} onSubmit={(e)=>this.addPlayerFormSubmit(e)}>
                  <input type="text" name="sessionCode" placeholder="Session Code" required/>
                  <input type="text" name="playerName" placeholder="Enter Player Name" required/>
                  <input type="number" name="price" placeholder="Player Price min:1cr max: 18cr" min="1" max="18" required/>
                  <br/>
                  <label className={classes.label}>
                    <span>Playing Status</span>
                    <input type="radio" name="isPlaying" value="true" required/> yes
                    <input type="radio" name="isPlaying" value="false" required/> No
                  </label>
                  <input type="text" name="position" placeholder="position"required/>
                  <input type="text" name="role" placeholder="Player Role"required/>
                  <input type="text" name="image" placeholder="Enter player Image Url"required/>
                  <input className={classes.PlayerformSubmit} type="submit" name="add player" value="Add Player"/>
              </form>
            </div>
          </div>
          :
          null
          }
            <div className={classes.leftHeader}>
                <img src="https://pbs.twimg.com/profile_images/1304292122686713857/lrp_AtSy_400x400.jpg" alt="IPL"/>
                <h2>IPL</h2>
            </div>
            <div className={classes.rightHeader}>
            {this.props.page === "team"?
              <div className={classes.addPlayerDiv}>
                <button onClick={()=>this.changeFormDisplayStatus()} className={classes.addButton}>Add Player</button>
                
              </div>
            :
            null}
            {this.props.page === "home"?
            <div>
              <input className={classes.searchButton} ref={this.inputRef} onChange={(e)=>this.onInputSearch(e)} type="text" name="search Player" placeholder="Search For Team"/>
              <button onClick={()=>{
                this.props.changeAppPlayersData([]);
                console.log(this.inputRef.current.value = "")
              }} className={classes.resetButton}>Reset</button>
            </div>
            :
            null
            }
            <div className={classes.sessCodeDiv}>
              <button onClick={()=>{this.changeDisplay()}} className={classes.sessCode}> ?</button>
              {this.state.codeDisplay ?
                <div className={classes.codeDropDown}>
                  {this.state.sessionCode}
                </div>
                :
              null
              }
            </div>
            </div>
        </header>
    );
  }
}

export default Header;
