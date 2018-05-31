import React, { Component } from 'react';
import './App.css';
import Cell from './Cell'
import Dimension from './Dimension'
import GameStats from './GameStats'

const dirs = [[0,1], [1,0], [1,1], [-1,1], [0,-1], [-1,0], [-1,-1], [1,-1]];

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			gameState: 0,
			width: 10,
			height: 10,
			nBombs: 10,
			mat: [],
			cssGrid: "auto auto auto auto auto auto auto auto auto auto"
		}
		
		this.aCellWasClicked = this.aCellWasClicked.bind(this);
		this.aCellWasRightClicked = this.aCellWasRightClicked.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.placeBombs = this.placeBombs.bind(this);
		this.countCloseBombs = this.countCloseBombs.bind(this);
		this.checkVictory = this.checkVictory.bind(this);
		this.revealCells = this.revealCells.bind(this);
		this.changeWidth = this.changeWidth.bind(this);
		this.changeHeight = this.changeHeight.bind(this);
		this.changeBombs = this.changeBombs.bind(this);
	}
	
	resetGame() {
		var res = [];
		for(var i=0; i < this.state.height; i++) {
			for(var j=0; j < this.state.width; j++) {
				res.push({y: i, x: j, value: 0, stat: 0});
			}
		}
		// eslint-disable-next-line
		this.setState({mat: res, gameState: 0});
	}
	
	placeBombs() {
		var res = [];
		for(var i=0; i < this.state.height; i++) {
			for(var j=0; j < this.state.width; j++) {
				res.push({y: i, x: j, value: 0, stat: 0});
			}
		}
		var bombs = this.state.nBombs;
		while(bombs > 0) {
			var done = false;
			while(!done) {
				var rand = Math.round(Math.random()*(this.state.width*this.state.height-1));
				if(res[rand].value === 0) {
					res[rand].value = "B";
					done = true;
				}
			}
			bombs--;
		}
		
		for(i=0; i < this.state.height; i++) {
			for(j=0; j < this.state.width; j++) {
				if(res[this.state.width*i+j].value !== "B")
					res[this.state.width*i+j].value = this.countCloseBombs(j, i, res);
			}
		}
		
		this.setState({mat: res});
		return res;
	}
	
	countCloseBombs(x, y, mat, flags = false) {
		const ww = this.state.width;
		const hh = this.state.height;
		var c = 0;
		[[0,1], [1,0], [1,1], [-1,1], [0,-1], [-1,0], [-1,-1], [1,-1]].map(function(coords){
			var nx = x+coords[0];
			var ny = y+coords[1];
			if(nx >= 0 && ny >= 0 && nx < ww && ny < hh) {
				if((!flags && mat[ny*ww+nx].value === "B") || (flags && mat[ny*this.state.width+nx].stat === 2))
					c++;
			}
			return null;
		});
		return c;
	}
	
	aCellWasClicked(x, y) {
		var newMat = this.state.mat;
		if(this.state.gameState === 0){
			this.setState({gameState: 1});
			newMat = this.placeBombs();
		}
		if(this.state.gameState < 2){
			if(newMat[this.state.width*y+x].value === 0 && newMat[this.state.width*y+x].stat === 0){
				newMat = this.revealCells(x, y, newMat);
			}else if(newMat[this.state.width*y+x].value !== "B" && newMat[this.state.width*y+x].stat === 0){
				newMat[this.state.width*y+x].stat = 1;
			}else if(newMat[this.state.width*y+x].value === "B" && newMat[this.state.width*y+x].stat === 0){
				newMat[this.state.width*y+x].stat = 1;
				this.setState({gameState: 2});
			}else if(newMat[this.state.width*y+x].value !== "B" && newMat[this.state.width*y+x].stat === 1){
				var neigh = [];
				for(var d of dirs){
					var nx = d[0]+x;
					var ny = d[1]+y;
					if(nx >= 0 && ny >= 0 && nx < this.state.width && ny < this.state.height){
						neigh.push(ny*this.state.width+nx);
					}
				}
				var youLoose = false;
				const flags = neigh.filter(n=>(newMat[n].stat === 2)).length;
				if(flags === newMat[this.state.width*y+x].value){
					for(var n of neigh){
						if(newMat[n].stat === 0){
							newMat[n].stat = 1;
							if(newMat[n].value === "B"){
								youLoose = true;
							}else if(newMat[n].value === 0){
								newMat = this.revealCells(n%this.state.width, Math.floor(n/this.state.width), newMat);
							}
						}
					}
					if(youLoose)
						this.setState({gameState: 2});
				}
			}
		}
		this.setState({mat: newMat});
	}
	
	aCellWasRightClicked(x, y) {
		if(this.state.gameState === 1){
			if(this.state.mat[this.state.width*y+x].stat !== 1){
				let newMat = this.state.mat;
				newMat[this.state.width*y+x].stat = newMat[this.state.width*y+x].stat === 2 ? 0 : 2;
				this.setState({mat: newMat});
			}
		}
	}
	
	checkVictory(){
		if(this.state.gameState === 1){
			const mat = this.state.mat;
			const win = mat.every(cell => {
				return ((cell.value !== "B" && cell.stat === 1) || (cell.value === "B" && (cell.stat === 0 || cell.stat === 2)))
			});
			if(win){
				this.setState({gameState: 3});
			}
		}
	}
	
	revealCells(x, y, mat) {
		var newMat = mat;
		var checked = [];
		var toCheck = [[x, y]];
		while(toCheck.length > 0){
			var ntc = [];
			for(var pos of toCheck){
				newMat[this.state.width*pos[1]+pos[0]].stat = 1;
				if(newMat[this.state.width*pos[1]+pos[0]].value === 0){
					for(var mov of [[0,1], [1,0], [1,1], [-1,1], [0,-1], [-1,0], [-1,-1], [1,-1]]){
						const nx = pos[0]+mov[0];
						const ny = pos[1]+mov[1];
						const pres = checked.concat(toCheck).concat(ntc).some(val => {
							return (val[0]===nx && val[1]===ny);
						});
						if(nx >= 0 && ny >= 0 && nx < this.state.width && ny < this.state.height && !pres)
							ntc.push([nx, ny]);
					}
				}
			}
			checked = checked.concat(toCheck);
			toCheck = ntc;
		}
		return newMat;
	}
	
	changeWidth(value){
		if(value < 5)
			value = 5;
		var newGrid = [];
		var bombs = this.state.nBombs;
		for(var i = 0; i < value; i++){
			newGrid.push("auto");
		}
		if(this.state.width*this.state.height-1 < bombs)
			bombs = this.state.width*this.state.height-1;
		if(bombs < 0)
			bombs = 0;
		this.setState({width: value, cssGrid: newGrid.join(" "), nBombs: bombs});
	}
	changeHeight(value){
		if(value < 5)
			value = 5;
		var bombs = this.state.nBombs;
		if(this.state.width*this.state.height-1 < bombs)
			bombs = this.state.width*this.state.height-1;
		if(bombs < 0)
			bombs = 0;
		this.setState({height: value, nBombs: bombs});
	}
	changeBombs(value){
		if(value <= this.state.width*this.state.height)
			this.setState({nBombs: value});
	}

	componentDidMount() {
    this.resetGame();
  }
	
	componentDidUpdate(prevProps, prevState) {
    if(prevState.width !== this.state.width || prevState.height !== this.state.height || prevState.nBombs !== this.state.nBombs){
			this.resetGame();
		}
		this.checkVictory();
  }
	
  render() {
		var bb = this.state.mat;
		return (
			<div className="main">
				<GameStats gameState={this.state.gameState} />
				<br />
				<div className="map" style={{gridTemplateColumns: this.state.cssGrid}}>
					{
						bb.map(b =>
							<Cell key={"cell-" + b.y + "-" + b.x} gameState={this.state.gameState} posY={b.y} posX={b.x}
								stat={b.stat} value={b.value} onClick={this.aCellWasClicked}
								onRightClick={this.aCellWasRightClicked} />
						)
					}
				</div>
				<br />
				<button onClick={this.resetGame} >RESET</button>
				<hr />
				<Dimension onClick={this.changeWidth} currVal={this.state.width} />
				<hr />
				<Dimension onClick={this.changeHeight} currVal={this.state.height} />
				<hr />
				<Dimension onClick={this.changeBombs} currVal={this.state.nBombs} />
			</div>
		)
  }
	

}

export default App;
