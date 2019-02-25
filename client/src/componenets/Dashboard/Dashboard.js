import React, { Component } from 'react';
import './Dashboard.scss';
import axios from 'axios';
import Input from '../Input/Input.js';
import Responses from '../Responses/Responses.js';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      url: '',
    }
    this.updateQueries = this.updateQueries.bind(this);
  }

  updateQueries (value, name) {
    this.setState({[name]: value});
    console.log(this.state);
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
  axios.request({
          url: `api/search/url`,
          method: 'get',
      }).then((response) => {
          let stateData = this.state.data.slice();
          console.log(stateData);
          response.data.forEach(item => stateData.push(item));
          console.log(stateData, 'stateData');
          this.setState({data: stateData});
          console.log(this.state);
      }).catch((error) => {
          console.log('error', error);
      });
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  // callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   console.log(response, response.text());
  //   const body = await response;
  //
  //
  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body;
  // };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hypothes.is Dashboard</h1>
        </header>
        <section className="response-browser">
          <div className="user-inputs">
            <form id="form">
              <Input
                url={this.state.url}
                labelInputName={'url'}
                labelText={'URL'}
                inputType={'text'}
                inputValue={this.state.url}
                updateQueries={this.updateQueries}
              />
              <button>Submit</button>
            </form>
          </div>
          <div className="responses">
            <Responses
              data={this.state.data}
            />
          </div>
        </section>
        <section className="graphs">
        </section>
        <p className="App-intro"></p>
      </div>
    );
  }
}

export default Dashboard;
