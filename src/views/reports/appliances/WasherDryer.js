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
    var token = "";
      // Axios.get("http://localhost:8000/users/")
      // .then((response) => {
      //   console.log(response);
      //   return response.data;
      // });
      // })
      Axios.post("http://localhost:8000/api/auth/token/", "username=martin&password=katinar4e ")
      .then((response) => {
          var data = response.data;
          token = data.token;
          console.log(token);
          const instance = Axios.create({
            baseURL: 'http://localhost:8000',
            headers: {'Authorization': 'JWT ' + token},
          });
          console.log(instance.defaults);
          instance.get('/users?ID=2', {
            timeout: 5000
          }).then((response) => {
            console.log(response.data);
            //return response.data;
          });
          instance.get('/appliance/1/', {
            timeout: 5000
          }).then((response) => {
            console.log(response.data);
            this.setState({
               id : response.data.appliance_id,
               status : response.data.appliance_status,
               type_id : response.data.appliance_type_id,
               created : response.data.created,
               flat_id : response.data.flat_id,
               energy_consumed : response.data.last_appliance_energy_consumed,
               reading_time : response.data.last_reading_time,
               water_reading : response.data.last_water_reading,
               modified : response.data.modified,
               room_id : response.data.room_id,
               url : response.data.url,
            })
            console.log(this.state);
            return this.state;
          });
      });
    }




    render() {
		const classes = this.props;

        return (
        <div>
				<List>
            <Typography className={ classes.controlsTitle } type='subheading'>
            {this.state.id}
            {this.state.status}
            {this.state.type_id}
  					{this.state.flat_id}
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
