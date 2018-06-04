import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMinusSquare from '@fortawesome/fontawesome-free-solid/faMinusSquare';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';

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
				<FontAwesomeIcon onClick={this.handleClickDown} icon={faMinusSquare} className="dim-but" />
				<span className="dim-txt" >{this.props.currVal}</span>
				<FontAwesomeIcon onClick={this.handleClickUp} icon={faPlusSquare} className="dim-but" />
			</div>
		);
	}

}

export default Dimension;