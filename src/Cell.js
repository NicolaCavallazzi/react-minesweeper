import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFlag from '@fortawesome/fontawesome-free-solid/faFlag'
import faBomb from '@fortawesome/fontawesome-free-solid/faBomb'

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			x: props.posX,
			y: props.posY,
			value: 0, //0..8 => number of close bombs, B=> bomb
			stat: 0 //0=>undiscovered, 1=>discovered, 2=>flagged
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleRightClick = this.handleRightClick.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			value: nextProps.value,
			stat: nextProps.stat
		});
	}
	
	handleClick(e) {
		this.props.onClick(this.state.x, this.state.y);
	}
	
	handleRightClick(e) {
		e.preventDefault();
		this.props.onRightClick(this.state.x, this.state.y);
	}
	
	render() {
		const cl = "cell cell-state-" + this.state.stat + " cell-value-" + this.state.value;
		var val = (this.state.stat === 0 || this.state.value === 0) ? " " : this.state.value
		if(this.state.stat === 2)
			val = <FontAwesomeIcon icon={faFlag} />;
		if(val==="B")
			val = <FontAwesomeIcon icon={faBomb} />;
		return <div className={cl} onClick={this.handleClick} onContextMenu={this.handleRightClick} >{val}</div>
		
	}
}

export default Cell;