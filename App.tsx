import * as React from 'react';

class App extends React.Component<any, any> {
	
	constructor() {
		super();
		this.state = {
			topRecentCampers: [],
			topAlltimeCampers: []
		}
	}
	
	render() {
		return (
			<div id="page-wrapper">
				<div id="header">
					<a href="http://www.freecodecamp.com/">
						<img src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" id="fcc-logo"/>
					</a>
				</div>
				<Leaderboard />
			</div>	
		);
	}
}

class Leaderboard extends React.Component<any, any> {
	render() {
		return (
			<div id="table-wrapper">
				<div className="row" id="row-title">Leaderboard</div>
				<div className="row" id="row-category"></div>
			</div>
		);
	}
}

export default App;