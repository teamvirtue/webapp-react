<h1 align="center">
  <br>
  <img src="https://pbs.twimg.com/profile_images/910158554568515584/Gf6WD-iH_400x400.jpg" alt="Fraunhofer" width="300">
  
  <br>
</h1>
<h2 align="center">
  <br>
   <img src="https://teamvirtue.nl/wp-content/uploads/LINQ_Logo_Black-300x138.png" alt="Fraunhofer" width="200">
   <img src="http://www.sollite.net/images/img/2222222-01.jpg" alt="Fraunhofer" width="200">
   <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Eindhoven_University_of_Technology_logo.svg" alt="Fraunhofer" width="200">
   <img src="https://cdn.worldvectorlogo.com/logos/fontys-39.svg" alt="Fraunhofer" width="200">
  <br>
</h2>

# VIRTUe Web App React

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

# VIRTUe Student Team
VIRTUe is a student team from the Eindhoven University of Technology. Follow us on our journey designing and building
the most sustainable house at the Solar Decathlon Middle East 2018 in Dubai.

Check out our website: https://teamvirtue.nl/

# Web App Functionalities
Through the web app the residents are able to view their behaviour in terms of sustainability, the status of LINQ and
control certain systems in the house. The idea is to make the smart system easier accessible this way. The web app is a
responsive website so it is accessible for every device, like a laptop phone or even the tv. The main navigation exists
of four tabs: home, control, reports and settings

The app allows residents to anonymously,check their sustainability status compared to the average neighbour, compare the
complex other LINQ complexes and on an urban scale. The energy and water usages can be viewed in more detail such as
graphs and other figures, in addition to the clock. Every appliance can be individually reviewed for their energy and
water consumption. Moreover, the lights and temperature in the house can be controlled through the web app. For the
lights, the power, brightness and colour can be controlled for either an individual room or the whole house. Addionally,
the operational status of the building systems are included in the web app as well.

Finally, in the settings tab the resident can individually change their account info and preferences, set work or home
schedules and sign out of their account.
## Connection with API
### Setup
**Installing axios**
```java
  npm install axios
```
### Creating instance of the communication object
#### Parent Component ####
**Import request component**
```ruby
  import Request from '../../axios_requests/Request.js';
```
**Rendering view**
~~~html
   <Request onDataChange={this.handleData} url={'/users/'}></Request>
~~~
1. props
  * url > specific partial of the url to which it is corresponding to the API!
   >> * Possible url calls 
   ~~~~/building/
      /flat/
      /room/
      /sensor/
      /grid/
      /appliance_brightness/
      /appliance_water_meter/
      /battery/
      /family/
      /light/
      /list_of_all_possible_appliance/
      /person_activity/
      /personal_detail/
      /room_water_meter_reading/
      /socket_reading/
      /solar_panel/
      /solar_panel_reading/
      /type_of_activity/
      /weekdays/
      /sockets/
   ~~~~
  * Getting data from response 
   >> * onDataChange={this.handleData}
   ~~~~
      handleData = (data) => {
        this.setState({array: data});
      }
   ~~~~
#### Child Component ####
**Reatreaving token**
1. content of `getToken` function
```ruby
  Axios.post("http://localhost:8000/api/auth/token/", "username=delta&password=deltadelta")
      .then((response) => {
        var data = response.data;
        this.setState({ token: data.token });
      });
```
2. Save token in state
```
this.state = {
      array: [],
      token: [],

    }
    
    
    
this.setState({ token: data.token });
```
**Requests**
1. Create Request instance 
~~~~ruby
  createGetRequest(url, token) {
    const instance = Axios.create({
      baseURL: 'http://localhost:8000',
      headers: { 'Authorization': 'JWT ' + this.state.token },
    });
    this.interval = setInterval(() => this.getRequest(url,instance), 5000);
  }
~~~~
2. Get Request function
~~~~ruby
getRequest(url, instance){
    instance.get(url, {
      timeout: 5000
    }).then((response) => {
      this.state.array.push(response.data);
      this.props.onDataChange(this.state.array);
    });
  }
~~~~
3. Passing data to Parent Component
~~~~ruby
  this.props.onDataChange(this.state.array);
~~~~
More Coming soon!

