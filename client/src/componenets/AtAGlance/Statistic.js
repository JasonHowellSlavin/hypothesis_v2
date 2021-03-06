import React, { useState } from 'react';
import './Statistic.scss';

const Statistic = (props) => {

    return (
      <div>
        <section className="stats-views-wrapper">
            <div className="most-and-least stat-view blue" >
                <h3>Most and Least Active Students  <button onClick={() => props.toggleSection(props.mostAndLeastOpen, 'mostAndLeastIsOpen')}>{props.mostAndLeastOpen ? 'Close' : 'Open'}</button></h3>
                {props.mostAndLeastOpen &&
                <section>
                    <div className="most-active">
                        <h4>Most Active</h4>
                        {props.mostAndLeastActive.mostActive.map((elem) => {
                            return (<div className="student-stat" key={`${elem.studentName}${elem.numPosts}`}>
                                <p><strong>Student Name:</strong> {elem.studentName}</p>
                                <p><strong>Number of Posts:</strong> {elem.numPosts}</p>
                            </div>)
                        })}
                    </div>
                    <div className="least-active">
                        <h4>Least Active</h4>
                        {props.mostAndLeastActive.leastActive.map((elem) => {
                            return (<div className="student-stat" key={`${elem.studentName}${elem.numPosts}`}>
                                <p><strong>Student Name: </strong> {elem.studentName}</p>
                                <p><strong>Number of Posts: </strong> {elem.numPosts}</p>
                            </div>)
                        })}
                    </div>
                </section>
                }
            </div>
            <div className="all-students-posts-numbers stat-view green">
                <h3>All Students and their post numbers <button onClick={() => props.toggleSection(props.allStudentsOpen, 'allStudentsIsOpen')}>{props.allStudentsOpen ? 'Close' : 'Open'}</button></h3>
                {props.allStudentsOpen && props.sortedStudents.map((elem, index) => {
                    return (<div className="student-stat" key={`sorted:${elem.studentName}`}>
                        <p><strong>Student Name:</strong> {elem.studentName}</p>
                        <p><strong>Avg. Length of Annotations:</strong> {elem.meanOfAnnotations}</p>
                        <p><strong>Number of Posts:</strong> {elem.numPosts}</p>
                    </div>)
                })}
            </div>
        </section>
      </div>
    );
}

export default Statistic;
