import React from 'react'
import Cell from './cell'
import Table from './moveTable'

let movesArray=[]
class Board extends React.Component{
    constructor(props){
        super(props)
        this.state={
            current:'o',
            cells:[null,null,null,null,null,null,null,null,null]
        }
        this.reset=this.reset.bind(this)
    }
    handleClick=(id)=>{
        let currentValue=this.state.cells[id]
        if(findWinner(this.state.cells) || currentValue)
            return
        let nextValue=this.state.current==='o'?'x':'o'
        let newCells=[...this.state.cells]
        newCells[id]=this.state.current
        this.setState({
            current:nextValue,
            cells:newCells
        })
        let moves={
        slno:0,moveBy:'',movePosition:0
        }
        moves.slno=(this.state.cells.filter((i)=>i!==null).length)+1
        moves.moveBy=(this.state.current).toUpperCase()
        moves.movePosition=id+1
        movesArray.push(moves)
    }
    reset=()=>{
        this.setState({
            current:'o',
            cells:[null,null,null,null,null,null,null,null,null]
        })
        movesArray=[]
    }

    render(){
        let status
        let remaining=this.state.cells.filter((i)=>i!==null)
        let winner=findWinner(this.state.cells)
        if(remaining.length===this.state.cells.length && !(winner))
            status=`It's a Tie :(`
        else if(winner)
            status=(winner.winValue).toUpperCase()+' Wins :)'
        else
            status='Next Move ' +this.state.current.toUpperCase()
        return (
            <>
                <h3 className="status">{status}</h3>
                <table className="main">
                    <tr>
                        <td>
                             <div className="board">
                            {this.state.cells.map((value,id)=>
                            <Cell id={id} value={value} onCellClick={this.handleClick} onWin={winner?winner.winLine:null}/>
                            )}
                            </div>
                        </td>
                        <td>
                            <div><Table movesArray={movesArray}/></div>
                        </td>
                    </tr>
                </table>
                <br/>
                <button className="reset" onClick={this.reset}>RESET</button>
            </>  
        )
    }
}
function findWinner(cells){
    const winnerIndxes=[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for(let line of winnerIndxes){
        if(cells[line[0]] && cells[line[0]]===cells[line[1]] && cells[line[0]]===cells[line[2]])
            return {winValue:cells[line[0]],
                    winLine:line}
    }
    return null
}
export default Board