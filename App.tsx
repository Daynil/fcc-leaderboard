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
				<div className="row" id="row-title">Leaderboard</div>
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
				<tr key={index}>
					<td>{index+1}</td>
					<td><img src={camper.img} className="camper-img" /><span className="username">{camper.username}</span></td>
					<td>{camper.recent}</td>
					<td>{camper.alltime}</td>
				</tr>
			);
		});
		return <tbody>{recentCampers}</tbody>
	}
	
	render() {
		return (
			<table id="table-wrapper">
				<thead>
					<tr>
						<td>#</td>
						<td>Camper</td>
						<td>Points in last 30 days</td>
						<td>All time points</td>
					</tr>
				</thead>
				{this.displayCampers()}
			</table>
		);
	}
}

export default App;