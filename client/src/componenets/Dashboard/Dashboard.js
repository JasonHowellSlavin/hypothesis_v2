import React, { Component } from 'react';
import './Dashboard.scss';
import Input from '../Input/Input.js';
import Responses from '../Responses/Responses.js';
import Filters from '../Filters/Filters.js';
import AtAGlance from '../AtAGlance/AtAGlance.js';
import Sort from '../Sort/Sort.js';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            filters: {
                student: '',
                date: '',
                targetText: '',
            },
            filterMessaging: '',
        };

        this.updateQueries = this.updateQueries.bind(this);
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
        let filteredActiveData = this.props.activeData.slice();

        let dataFiltered = filteredActiveData.filter((item, index, array) => {
            return item.user === correctName;
        })

        if (dataFiltered.length > 0) {
            this.props.setActiveData(dataFiltered);
        } else {
            this.setState({filterMessaging: 'Sorry, no data matched that filter'});
        }
    }

    filterByDate (date) {
        let dateRegEx = /([0-9]{4}-[0-9]{2}-[0-9]{2})/g;
        let filteredActiveData = this.props.activeData.slice();

        let dateFiltered =  filteredActiveData.filter((item, index, array) => {
            return item.created.match(dateRegEx)[0] === date;
        })

        if (date !== date.match(dateRegEx)[0]) {
            this.setState({filterMessaging: 'Sorry you did not enter the date correctly, format should be YYYY-MM-DD'});
        } else if (dateFiltered.length <= 0) {
            this.setState({filterMessaging: 'It appears there are annotations matching the date you chose'});
        } else {
            this.props.setActiveData(dateFiltered);
        }
    }

    filterByTargetText (targetText) {
        let filteredActiveData = this.props.activeData.slice();

        let textFiltered = filteredActiveData.filter((item, index, array) => {
            if (item.target[0].selector) {
                if (item.target[0].selector[3].exact !== undefined) {
                    let lowerCaseExact = item.target[0].selector[3].exact.toLowerCase();
                    return lowerCaseExact.indexOf(targetText.toLowerCase()) > -1;
                }
            } else {
                return false;
            }
        })

        if (textFiltered.length <= 0) {
            this.setState({filterMessaging: 'It appears the target text does not appear'});
        } else {
            this.props.setActiveData(textFiltered);
        }
    }

    clearFilters () {
        let unfilteredData = this.props.data;
        this.props.setActiveData(unfilteredData);
    }

    // Sort methods
    sortHook (methodReturn) {
        this.props.setActiveData(methodReturn)
    }

    // Lifecycle Hooks
    componentDidMount() {
        this.props.setActiveData(this.props.data);
    }

    componentDidUpdate (prevProps) {
        if (this.props.data !== prevProps.data) {
                this.props.setActiveData(this.props.data);
        }
    }

    render() {
        return (
            <div className="App">
                <section className="interface">
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
                            <p>Currently viewing {this.props.activeData.length ? this.props.activeData.length : 0} of {this.props.data.length ? this.props.data.length : 0} total Annotations</p>
                            <div className="sort-wrapper">
                                <Sort
                                    data={this.props.activeData}
                                    sortHook={this.sortHook}
                                />
                            </div>
                            <Responses
                                activeData={this.props.activeData}
                                totalData={this.props.data}
                            />
                        </section>
                    </div>
                    <div className="graphs">
                        <h2>At a Glance Statistics </h2>
                        <p>Currently viewing statistics from {this.props.activeData.length ? this.props.activeData.length : 0} annotations</p>
                        <AtAGlance className="at-a-glance-wrapper"
                            activeData={this.props.activeData}
                            totalData={this.props.data}
                         />
                    </div>
                </section>
          </div>
        );
    }
}

export default Dashboard;
