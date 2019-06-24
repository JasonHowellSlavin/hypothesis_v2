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
            students: [],
            activeStudents: [],
            filters: {
                student: '',
                date: '',
                targetText: '',
            },
            filterMessaging: '',
        }
        this.setActiveData = this.setActiveData.bind(this);
        this.updateQueries = this.updateQueries.bind(this);
        this.hypoSearchURL = this.hypoSearchURL.bind(this);
        this.setBaseStudentData = this.setBaseStudentData.bind(this);
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

    setBaseStudentData(response) {
        let currentStudentArray = Array.from(this.state.students);
        let newStudentArray = [];

        response.forEach((elem) => {
            let currentStudent = {
                user: elem.user,
                name: elem.user.slice(5, elem.user.length),
                assocUri: [elem.uri],
            }

            newStudentArray.push(currentStudent);
        })

        if (currentStudentArray.length) {
            currentStudentArray.forEach((student) => {
                newStudentArray.forEach((newStudent) => {
                    if (student.uri !== newStudent.uri) {
                        newStudentArray.assocUri.push(student.uri);
                        currentStudentArray.assocUri.push(newStudent.uri);
                    }
                })
            })
        }

        let totalArray = newStudentArray.concat(currentStudentArray);
        let deDupeObj = {};

        let final = totalArray.filter((item) => {
            return deDupeObj.hasOwnProperty(item.user) ? false : deDupeObj[item.user] = true;
        });

        return final;

    }

    setActiveData(data) {
        this.setState({activeData: data});
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
            let studentData = this.setBaseStudentData(response.data);

            this.setState({
                data: cleanedStateData,
                url: '',
                activeUrls: currentActiveUrls,
                activeData: cleanedStateData,
                students: studentData,
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
                        <Route path="/" exact render={(props) => <Dashboard {...props}
                            activeData={this.state.activeData}
                            setActiveData={this.setActiveData}
                            data={this.state.data}/>}
                        />
                        <Route path="/student-info" component={StudentInfo} />
                    </section>
                </Router>
            </div>
        )
    }
}

export default MainApp;
