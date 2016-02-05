/// <reference path="./node_modules/axios/axios.d.ts" />


import * as React from 'react';
import * as axios from 'axios';

class App extends React.Component<any, any> {
	
	constructor() {
		super();
		this.state = {
			topRecentCampers: [],
			topAlltimeCampers: [],
			sorting: {recent: true, pointsRecent: true}
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
	
	changeSort(sortby: string) {
		if (sortby == 'recent') this.setState({sorting: {recent: true, pointsRecent: this.state.sorting.pointsRecent}});
		else this.setState({sorting: {recent: false, pointsRecent: this.state.sorting.pointsRecent}});
	}
	
	sortCampers(sortBy: string) {
		if (sortBy == 'recent') this.setState({sorting: {recent: this.state.sorting.recent, pointsRecent: true}});
		else this.setState({sorting: {recent: this.state.sorting.recent, pointsRecent: false}});
	}
	
	render() {
		return (
			<div id="page-wrapper">
				<div id="header">
					<a href="http://www.freecodecamp.com/">
						<img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" id="fcc-logo"/>
					</a>
				</div>
				<div className="row" id="row-title">
					Leaderboard
					<span id="sorting">
						<span className={this.state.sorting.recent ? 'selected' : 'unselected'} id="recent"
							onClick={() => this.changeSort('recent')}>Recent</span>
						<span className={!this.state.sorting.recent ? 'selected' : 'unselected'} id="alltime" 
							onClick={() => this.changeSort('alltime')}>All time</span>
					</span>
				</div>
				<Leaderboard 
					topRecentCampers={this.state.topRecentCampers}
					topAlltimeCampers={this.state.topAlltimeCampers}
					sorting={this.state.sorting}
					sortCampers={(sortBy) => this.sortCampers(sortBy)} />
			</div>	
		);
	}
}

class Leaderboard extends React.Component<any, any> {
	
	displayCampers() {
		let campersToDisplay = this.props.sorting.recent ? this.props.topRecentCampers : this.props.topAlltimeCampers;
		let sortedCampersToDisplay;
		if (this.props.sorting.pointsRecent) sortedCampersToDisplay = campersToDisplay.sort(this.sortCampersRecent);
		else sortedCampersToDisplay = campersToDisplay.sort(this.sortCampersAlltime);
		
		let campers = sortedCampersToDisplay.map((camper, index) => {
			let stripe = index % 2 > 0 ? "pure-table-odd" : "";
			let userLink = `http://www.freecodecamp.com/${camper.username}`;
			return (
				<tr key={index} className={stripe}>
					<td>{index+1}</td>
					<td>
						<img src={camper.img} className="camper-img" />
						<a href={userLink} className="username">{camper.username}</a>
					</td>
					<td>{camper.recent}</td>
					<td>{camper.alltime}</td>
				</tr>
			);
		});
		return <tbody>{campers}</tbody>
	}
	
	sortCampersRecent(a, b) {
		if (a.recent > b.recent) return -1;
		if (a.recent < b.recent) return 1;
		return 0;
	}
	
	sortCampersAlltime(a, b) {
		if (a.alltime > b.alltime) return -1;
		if (a.alltime < b.alltime) return 1;
		return 0;
	}
	
	sortCampers(sortBy: string) {
		this.props.sortCampers(sortBy);
	}
	
	getDescIcon(column: string) {
		if (column == 'recent') {
			if (this.props.sorting.pointsRecent) return <i className="fa fa-sort-desc"></i>
		} else {
			if (!this.props.sorting.pointsRecent) return <i className="fa fa-sort-desc"></i>
		}
	}
	
	render() {
		return (
			<table id="table-wrapper" className="pure-table">
				<thead>
					<tr>
						<td>#</td>
						<td>Camper</td>
						<td className='sorting-col' 
							onClick={() => this.sortCampers('recent')}>Points in last 30 days {this.getDescIcon('recent')}</td>
						<td className='sorting-col' 
							onClick={() => this.sortCampers('alltime')}>All time points {this.getDescIcon('alltime')}</td>
					</tr>
				</thead>
				{this.displayCampers()}
			</table>
		);
	}
}

export default App;