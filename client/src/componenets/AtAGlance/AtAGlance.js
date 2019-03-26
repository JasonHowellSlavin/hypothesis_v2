import React, { Component } from 'react';
import './AtAGlance.scss';
import Statistic from './Statistic';

class AtAGlance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: [],
            sortedStudents: [],
            mostAndLeastActive: {mostActive: [], leastActive: []},
        }

        this.getListOfMostActiveUsers = this.getListOfMostActiveUsers.bind(this);
        this.getMostAndLeastActiveUsers = this.getMostAndLeastActiveUsers.bind(this);
    }

    getListOfMostActiveUsers (data) {
        let dataSlice = data.slice();
        let studentsAndPosts = {};
        let finalStudentsAndPosts = [];

        dataSlice.forEach((entry, index, array) => {
            let studentPosts = array.filter((annotation) => {
                return annotation.user === entry.user;
            });

            studentsAndPosts[studentPosts[0].user] = {
                studentName: studentPosts[0].user.slice(5),
                numPosts: studentPosts.length
            };
        });

        for(let student in studentsAndPosts) {
            finalStudentsAndPosts.push(
                {studentName: studentsAndPosts[student].studentName,
                 numPosts: studentsAndPosts[student].numPosts}
            );
        }

        let sortedStudentsAndPosts = finalStudentsAndPosts.sort((studentA, studentB) => {
            return studentB.numPosts - studentA.numPosts;
        })

        console.log(sortedStudentsAndPosts)
        return sortedStudentsAndPosts;
    }

    getMostAndLeastActiveUsers (array) {
        let mostActive = array.filter((student, index, arr) => {
            return student.numPosts === arr[0].numPosts;
        })

        let leastActive = array.filter((student, index, arr) => {
            return student.numPosts === arr[array.length - 1].numPosts;
        })

        return {mostActive: mostActive, leastActive: leastActive};
    }

    componentDidMount() {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        let sortedStudents = this.getListOfMostActiveUsers(this.props.searchData);
        let mostAndLeast = this.getMostAndLeastActiveUsers(this.getListOfMostActiveUsers(this.props.searchData));

        if (this.props.searchData !== prevProps.searchData) {
            this.setState({mostAndLeastActive: mostAndLeast, sortedStudents: sortedStudents})
        }

        console.log('State', this.state);
    }

    render() {
        return (
         <div className="at-a-glance">
            <h2>At a Glance Statistics </h2>
            <Statistic
                mostAndLeastActive={this.state.mostAndLeastActive}
                sortedStudents={this.state.sortedStudents}
            />
          </div>
        );
    }
};
export default AtAGlance;
