import React, { Component } from 'react';
import Input from '../Input/Input.js';
import Dashboard from '../Dashboard/Dashboard.js';
import '../Dashboard/Dashboard.scss';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

function StudentInfo() {
    return (
        <div>
            <h1>Student info here</h1>
        </div>
    )
}

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            activeData: [],
            activeUrls: [],
            url: '',
            filters: {
                student: '',
                date: '',
                targetText: '',
            },
            filterMessaging: '',
        }
        this.updateQueries = this.updateQueries.bind(this);
        this.hypoSearchURL = this.hypoSearchURL.bind(this);
        this.removeDuplicates = this.removeDuplicates.bind(this);
    }

    // Functionality methods
    updateQueries (value, name) {
        this.setState({[name]: value});
    }

    removeDuplicates(currentData) {
        let duplicatHash = {};

        return currentData.filter((item) => {
            return duplicatHash.hasOwnProperty(item.id) ? false : duplicatHash[item.id] = true;
        });
    }

    // API Requests
    hypoSearchURL () {
      //http://teaching.lfhanley.net/english528sp18/texts/edna-st-vincent-millay/
      // http://teaching.lfhanley.net/english528sp18/texts/philip-levine-they-feed-they-lion-1972/
    axios.request({
            url: `api/search/url`,
            method: 'get',
            params: {
              queriedURL: this.state.url
            }
        }).then((response) => {
            console.log('Response:', response);
            let stateData = this.state.data.slice();
            let currentActiveUrls = this.state.activeUrls.slice();

            currentActiveUrls.push(this.state.url);

            response.data.forEach(item => stateData.push(item));

            let cleanedStateData = this.removeDuplicates(stateData);

            this.setState({
                data: cleanedStateData,
                url: '',
                activeUrls: currentActiveUrls,
                activeData: cleanedStateData
            });
            console.log(stateData, 'stateData');
        }).catch((error) => {
            console.log('error', error);
        });
    }

    // Lifecycle Hooks
    componentDidMount() {
      return true;
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <header className="App-header">
                        <h2 className="App-title">Hypothes.is Dashboard</h2>
                        <section className="routes">
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/">At A Glance Stats</Link>
                                    </li>
                                    <li>
                                        <Link to="/student-info">Student Information</Link>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </header>
                    <section className="interface">
                        <div className="user-inputs">
                            <section className="search-section">
                                <h3> Enter a URL below to see annotations from that url.
                                If you would like to check multiple urls, simply add them one at a
                                time and click submit</h3>
                                <div>
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
                            </section>
                            <section className="active-urls">
                                <ul>
                                    <h3>Data sourced from the following URLs:</h3>
                                    {this.state.activeUrls.map( item => <li key={`url:${item}`}>{item}</li>)}
                                </ul>
                            </section>
                        </div>
                    </section>
                    <section className="info-holder">
                        <Route path="/" exact render={(props) => <Dashboard {...props} data={this.state.data}/>} />
                        <Route path="/student-info" component={StudentInfo} />
                    </section>
                </Router>
            </div>
        )
    }
}

export default MainApp;
