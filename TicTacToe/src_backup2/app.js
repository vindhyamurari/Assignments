import React from 'react'
import Board from './components/board'
import Input from './components/input'

/* const App=()=>{
    return(
        <>
            <h1 className="title">Tic Tac Toe</h1>
            <Input label="Player 1" value="o"></Input><br></br>
            <Input label="Player 2" value="x"></Input>
            <Board/>
        </>
    )
}
export default App */

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state={
            player1:'o',
            player2:'x'
        }
    }
    handleSavePlayerName=(name,label)=>{
        if(label==='Player 1'){
            this.setState({
                player1:name
            })
        }
        else{
            this.setState({
                player2:name
            })
        }
       
    }
    render(){
        console.log(this.state);
        return(
            <>
                <h1 className="title">Tic Tac Toe</h1>
                <Input label="Player 1" value="o" onSave={this.handleSavePlayerName}></Input><br/><br/>
                <Input label="Player 2" value="x" onSave={this.handleSavePlayerName}></Input>
                <Board player1={this.state.player1} player2={this.state.player2}/>
            </>
        )
    }
}
export default Game