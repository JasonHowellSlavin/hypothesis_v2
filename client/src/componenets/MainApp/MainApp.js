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
        this.filterByStudent = this.filterByStudent.bind(this);
        this.filterByDate = this.filterByDate.bind(this);
        this.filterByTargetText = this.filterByTargetText.bind(this);
        this.removeDuplicates = this.removeDuplicates.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.sortHook = this.sortHook.bind(this);
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


    // Filter methods
    filterByStudent (studentName) {
        let correctName = studentName.indexOf('acct:') > -1 ? studentName : 'acct:' + studentName;
        let filteredActiveData = this.state.activeData.slice();

        let dataFiltered = filteredActiveData.filter((item, index, array) => {
            return item.user === correctName;
        })

        if (dataFiltered.length > 0) {
            this.setState({activeData: dataFiltered});
        } else {
            this.setState({filterMessaging: 'Sorry, no data matched that filter'});
        }
    }

    filterByDate (date) {
        let dateRegEx = /([0-9]{4}-[0-9]{2}-[0-9]{2})/g;
        let filteredActiveData = this.state.activeData.slice();

        let dateFiltered =  filteredActiveData.filter((item, index, array) => {
            return item.created.match(dateRegEx)[0] === date;
        })

        if (date !== date.match(dateRegEx)[0]) {
            this.setState({filterMessaging: 'Sorry you did not enter the date correctly, format should be YYYY-MM-DD'});
        } else if (dateFiltered.length <= 0) {
            this.setState({filterMessaging: 'It appears there are annotations matching the date you chose'});
        } else {
            this.setState({activeData: dateFiltered});
        }
    }

    filterByTargetText (targetText) {
        let filteredActiveData = this.state.activeData.slice();

        let textFiltered = filteredActiveData.filter((item, index, array) => {
            if (item.target[0].selector) {
                let lowerCaseExact = item.target[0].selector[3].exact.toLowerCase();
                return lowerCaseExact.indexOf(targetText.toLowerCase()) > -1;
            } else {
                return false;
            }
        })

        if (textFiltered.length <= 0) {
            this.setState({filterMessaging: 'It appears the target text does not appear'});
        } else {
            this.setState({activeData: textFiltered});
        }
    }

    clearFilters () {
        let unfilteredData = this.state.data;
        this.setState({activeData: unfilteredData});
    }

    // Sort methods
    sortHook (methodReturn) {
        this.setState({activeData: methodReturn})
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
                            <div className="active-urls">
                                <ul>
                                    <h4>Data sourced from the following URLs:</h4>
                                    {this.state.activeUrls.map( item => <li>{item}</li>)}
                                </ul>
                            </div>
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
