import React from 'react'

class input extends React.Component{
    constructor(props){
        super(props)
        this.state={
            player:props.value
        }
    }
    handleChange=(e)=>{
        this.setState({player:e.target.value})
    }
    handleSave=()=>{
        console.log(this.state.player);
        this.props.onSave(this.state.player,this.props.label)
    }
    render(){
        return(
            <>
            <label>{this.props.label}</label>
            <input type="text" placeholder={this.props.label} value={this.state.player} onChange={this.handleChange}></input>
            <button onClick={this.handleSave}>SAVE</button>
            </>
        )
    }
}

export default input