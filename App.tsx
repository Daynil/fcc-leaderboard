/// <reference path="./node_modules/axios/axios.d.ts" />


import * as React from 'react';
import * as axios from 'axios';

class App extends React.Component<any, any> {
	
	constructor() {
		super();
		this.state = {
			topRecentCampers: [],
			topAlltimeCampers: []
		}
	}
	
	componentDidMount() {
		// Get top recent campers
		axios.get('http://fcctop100.herokuapp.com/api/fccusers/top/recent')
			.then( response => {
				var recentCampers = response.data as Array<Object>;
				recentCampers.forEach( recentCamper => {
					this.state.topRecentCampers.push(recentCamper);
				});
				this.setState({topRecentCampers: this.state.topRecentCampers});
			});
		// Get top alltime campers
		axios.get('http://fcctop100.herokuapp.com/api/fccusers/top/alltime')
			.then( response => {
				var alltimeCampers = response.data as Array<Object>;
				alltimeCampers.forEach( alltimeCamper => {
					this.state.topAlltimeCampers.push(alltimeCamper);
				});
				this.setState({topAlltimeCampers: this.state.topAlltimeCampers});
			});
	}
	
	render() {
		return (
			<div id="page-wrapper">
				<div id="header">
					<a href="http://www.freecodecamp.com/">
						<img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" id="fcc-logo"/>
					</a>
				</div>
				<Leaderboard 
					topRecentCampers={this.state.topRecentCampers}
					topAlltimeCampers={this.state.topAlltimeCampers} />
			</div>	
		);
	}
}

class Leaderboard extends React.Component<any, any> {
	
	displayCampers() {
		let recentCampers = this.props.topRecentCampers.map((camper, index) => {
			return (
				<div>
					{camper.username}
				</div>
			);
		});
		return <div>{recentCampers}</div>
	}
	
	render() {
		return (
			<div id="table-wrapper">
				<div className="row" id="row-title">Leaderboard</div>
				<div className="row" id="row-category"></div>
				{this.displayCampers()}
			</div>
		);
	}
}

export default App;