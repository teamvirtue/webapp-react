import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import LineChart from '../LineChart';
import Axios from 'axios';


class WasherDryer extends Component {
    //http://localhost:8000/api-auth/login/?next=/appliance/auth/
    constructor() {
      super();
      this.state = {
        id : [],
        status : [],
        type_id : [],
        created : [],
        flat_id : [],
        energy_consumed : [],
        reading_time : [],
        water_reading : [],
        modified : [],
        room_id: [],
        url : [],
      }
    }
    componentDidMount() {
    // const configAuth = Axios.create({
    //     baseURL: 'http://localhost:8000/',
    //     url: 'appliance/1/',
    //     method: 'get',
    //     timeout: 1000,
    //     // auth: {
    //     //   username: 'matahara',
    //     //   password: 'katinar4e'
    //     // },
    //     responseType: 'json',
    //     responseEncoding: 'utf8',
    //   });
    //   Axios.request(configAuth)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
      Axios.get("http://localhost:8000/appliance/1/")
      .then((response) => {
        console.log(response);
        return response.data;
      }).then((data)=>{
        this.setState({
           id: data.appliance_id,
           status : data.appliance_status,
           type_id : data.appliance_type_id,
           created : data.created,
           flat_id : data.flat_id,
           energy_consumed : data.last_appliance_energy_consumed,
           reading_time : data.last_reading_time,
           water_reading : data.last_water_reading,
           modified : data.modified,
           room_id : data.room_id,
           url : data.url,
        })
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
    }



    render() {
		const classes = this.props;

        return (
        <div>
				<List>
            <Typography className={ classes.controlsTitle } type='subheading'>
  						{this.state.url}
  					</Typography>
					<Typography className={ classes.controlsTitle } type='subheading'>
						Chart
					</Typography>

					<LineChart />

					<Divider/>

					<div className='statusBar'>
						<div className='statusItem'>
							<h3>Feb</h3><h1>18</h1>
							<Typography type='subheading' gutterBottom>
								Last maintenance
							</Typography>
						</div>
						<div className='statusItem'>
							<Icon className={ classes.icon }>check_circle</Icon>
							<Typography type='subheading' gutterBottom>
								Operating normally
							</Typography>
						</div>
					</div>

				</List>
			</div>
        );
    }
}

export default WasherDryer;
