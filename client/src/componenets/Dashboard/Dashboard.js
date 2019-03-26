import React, { Component } from 'react';
import './Dashboard.scss';
import axios from 'axios';
import Input from '../Input/Input.js';
import Responses from '../Responses/Responses.js';
import Filters from '../Filters/Filters.js';
import AtAGlance from '../AtAGlance/AtAGlance.js';
import Sort from '../Sort/Sort.js';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            activeData: [],
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

            response.data.forEach(item => stateData.push(item));

            let cleanedStateData = this.removeDuplicates(stateData);

            this.setState({
                data: cleanedStateData,
                url: '',
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
                <header className="App-header">
                    <h1 className="App-title">Hypothes.is Dashboard</h1>
                </header>
                <section className="interface">
                    <div className="user-inputs">
                        <form id="form">
                            <h3> Enter a URL below to see annotations from that url.
                            If you would like to check multiple urls, simply add them one at a
                            time and click submit</h3>
                            <Input
                                url={this.state.url}
                                labelInputName={'url'}
                                labelText={'URL'}
                                inputType={'text'}
                                inputValue={this.state.url}
                                updateQueries={this.updateQueries}
                            />
                        </form>
                        <div>
                            <button onClick={this.hypoSearchURL}>Submit</button>
                        </div>
                    </div>
                    <section className="filters">
                        <Filters
                            filterByStudent={this.filterByStudent}
                            filterByDate={this.filterByDate}
                            filterByTargetText={this.filterByTargetText}
                            filterMessaging={this.state.filterMessaging}
                            clearFilters={this.clearFilters}
                         />
                    </section>
                </section>
                <section className="visualization">
                    <div className="response-browser">
                        <section className="responses">
                            <h2> Annotations </h2>
                            <p>Currently viewing {this.state.activeData.length ? this.state.activeData.length : 0} of {this.state.data.length ? this.state.data.length : 0} total Annotations</p>
                            <div className="sort-wrapper">
                                <Sort
                                    data={this.state.activeData}
                                    sortHook={this.sortHook}
                                />
                            </div>
                            <Responses
                                activeData={this.state.activeData}
                                totalData={this.state.data}
                            />
                        </section>
                    </div>
                    <div className="graphs">
                        <h2>At a Glance Statistics </h2>
                        <p>Currently viewing statistics from {this.state.activeData.length ? this.state.activeData.length : 0} annotations</p>
                        <AtAGlance className="at-a-glance-wrapper"
                            activeData={this.state.activeData}
                            totalData={this.state.data}
                         />
                    </div>
                </section>
          </div>
        );
    }
}

export default Dashboard;
