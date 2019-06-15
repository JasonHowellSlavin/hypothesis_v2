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
            mostAndLeastIsOpen: true,
            allStudentsIsOpen: true,
        }

        this.getListOfMostActiveUsers = this.getListOfMostActiveUsers.bind(this);
        this.getMostAndLeastActiveUsers = this.getMostAndLeastActiveUsers.bind(this);
        this.getMeanOfAnnotations = this.getMeanOfAnnotations.bind(this);
        this.toggleStatBlock = this.toggleStatBlock.bind(this);
    }

    getListOfMostActiveUsers (data) {
        let dataSlice = data.slice();
        let studentsAndPosts = {};
        let finalStudentsAndPosts = [];

        dataSlice.forEach((entry, index, array) => {
            let studentPosts = array.filter((annotation) => {
                return annotation.user === entry.user;
            });

            let studentAnnotations = studentPosts.reduce((accum, post) => {
                accum.push(post.text);
                return accum;
            }, [])

            studentsAndPosts[studentPosts[0].user] = {
                studentName: studentPosts[0].user.slice(5),
                numPosts: studentPosts.length,
                annotations: studentAnnotations
            };
        });

        for(let student in studentsAndPosts) {
            finalStudentsAndPosts.push(
                {studentName: studentsAndPosts[student].studentName,
                 numPosts: studentsAndPosts[student].numPosts,
                 annotations: studentsAndPosts[student].annotations,
                 meanOfAnnotations: this.getMeanOfAnnotations(studentsAndPosts[student])
                }
            );
        }

        let sortedStudentsAndPosts = finalStudentsAndPosts.sort((studentA, studentB) => {
            return studentB.numPosts - studentA.numPosts;
        })

        return sortedStudentsAndPosts;
    }

    getMeanOfAnnotations (student) {
        if (student) return Math.round(student.annotations.reduce((accum, item) => accum += item.length, 0) / student.annotations.length);
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

    toggleStatBlock (statBlockBoolean, stateVar) {
        let currentVal = statBlockBoolean;
        this.setState({[stateVar]: !currentVal })
    }

    componentDidMount() {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        let sortedStudents = this.getListOfMostActiveUsers(this.props.activeData);
        let mostAndLeast = this.getMostAndLeastActiveUsers(this.getListOfMostActiveUsers(this.props.activeData));

        this.getMeanOfAnnotations();

        if (this.props.activeData !== prevProps.activeData) {
            this.setState({mostAndLeastActive: mostAndLeast, sortedStudents: sortedStudents})
        }
    }

    render() {
        return (
         <div className="at-a-glance">
            <Statistic
                mostAndLeastActive={this.state.mostAndLeastActive}
                sortedStudents={this.state.sortedStudents}
                mostAndLeastOpen={this.state.mostAndLeastIsOpen}
                allStudentsOpen={this.state.allStudentsIsOpen}
                toggleSection={this.toggleStatBlock}
            />
          </div>
        );
    }
};
export default AtAGlance;
