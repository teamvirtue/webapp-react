var token = "";
  // // Axios.get("http://localhost:8000/users/")
  // // .then((response) => {
  // //   console.log(response);
  // //   return response.data;
  // // });
  // // })
  // Axios.post("http://localhost:8000/api/auth/token/", "username=matahara&password=katinar4e ")
  //   .then((response) => {
  //         var data = response.data;
  //         token = data.token;
  //         console.log(token);
  //         const instance = Axios.create({
  //           baseURL: 'http://localhost:8000',
  //           headers: {'Authorization': 'JWT ' + token},
  //         });
  //         console.log(instance.defaults);
  //         instance.get('/users', {
  //           timeout: 5000
  //         }).then((response) => {
  //           console.log(response.data);
  //           //return response.data;
  //         });
  //         instance.get('/appliance/1/', {
  //           timeout: 5000
  //         }).then((response) => {
  //           console.log(response.data);
  //           this.setState({
  //              id : response.data.appliance_id,
  //              status : response.data.appliance_status,
  //              type_id : response.data.appliance_type_id,
  //              created : response.data.created,
  //              flat_id : response.data.flat_id,
  //              energy_consumed : response.data.last_appliance_energy_consumed,
  //              reading_time : response.data.last_reading_time,
  //              water_reading : response.data.last_water_reading,
  //              modified : response.data.modified,
  //              room_id : response.data.room_id,
  //              url : response.data.url,
  //           })
  //           console.log(this.state);
  //           return this.state;
  //         });

var instance;

class Request {
  constructor() {
      Axios.post("http://localhost:8000/api/auth/token/", "username=matahara&password=katinar4e ")
      .then((response) => {
            var data = response.data;
            var token = data.token;
            console.log(token);
            instance = Axios.create({
              baseURL: 'http://localhost:8000',
              headers: {'Authorization': 'JWT ' + token},
            });
          };
  }
  constructor(credentials, url, baseURL) {
    Axios.post(url,credentials)
    .then((response) => {
          var data = response.data;
          var token = data.token;
          console.log(token);
          instance = Axios.create({
            baseURL: baseURL,
            headers: {'Authorization': 'JWT ' + token},
          });
        };
  }
  function Get(endpoint) {
    try {
      return instance.get(endpoint, {
        timeout: 5000
      });
    } catch (e) {

    } finally {

    }
  }
  function Post(endpoint, data) {
    return instance.post(endpoint, data);
  }
  function Patch(endpoint, pk, data) {
    return instance.patch(endpoint + pk, data);
  }
  function Delete(endpoint, pk) {
    return instance.delete(endpoint + pk);
  }
}
