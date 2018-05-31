import React, { Component } from 'react';

class Dimension extends Component {
	
	constructor(props) {
		super(props);
		this.handleClickUp = this.handleClickUp.bind(this);
		this.handleClickDown = this.handleClickDown.bind(this);
	}
	
	handleClickUp(){
		this.props.onClick(this.props.currVal+1);
	}
	
	handleClickDown(){
		this.props.onClick(this.props.currVal-1);
	}
	
	render() {
		return (
			<div>
				<button onClick={this.handleClickUp}>UP</button>
				<div>{this.props.currVal}</div>
				<button onClick={this.handleClickDown}>DOWN</button>
			</div>
		);
	}

}

export default Dimension;