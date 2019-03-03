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
    this.hypoSearchURL = this.hypoSearchURL.bind(this);
  }

  updateQueries (value, name) {
    this.setState({[name]: value});
    console.log(this.state);
  }

  hypoSearchURL () {
      //http://teaching.lfhanley.net/english528sp18/texts/edna-st-vincent-millay/
      // http://teaching.lfhanley.net/english528sp18/texts/allen-ginsberg-howl-1956/
    axios.request({
            url: `api/search/url`,
            method: 'get',
            params: {
              queriedURL: this.state.url
            }
        }).then((response) => {
            console.log(response);
            let stateData = this.state.data.slice();
            response.data.forEach(item => stateData.push(item));
            console.log(stateData, 'stateData');
            this.setState({data: stateData, url: ''});
        }).catch((error) => {
            console.log('error', error);
        });
  }

  componentDidMount() {
    return true;
  }

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
            </form>
            <button onClick={this.hypoSearchURL}>Submit</button>
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
