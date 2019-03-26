import React, {useState} from 'react';
import './Filters.scss';

const Filters = (props) => {
    const [studentVal, setStudentVal] = useState('');
    const [dateVal, setDateVal] = useState('');
    const [targetVal, setTargetVal] = useState('');

    let studentInput = React.createRef();
    let dateInput = React.createRef();
    let textInput = React.createRef();

    return (
     <div className="filter-wrapper">
        <div className="title-container">
            <h3>Filters</h3>
            <button onClick={() => {
                props.clearFilters();
                setStudentVal('');
                setDateVal('');
                setTargetVal('');
                textInput.current.value = '';
                studentInput.current.value = '';
                dateInput.current.value = '';
            }}>Clear Filters</button>
        </div>
        <p className="filterMessaging">{props.filterMessaging}</p>
        <div className="filter-container">
            <div className="filter-set">
                <p>Filter by Student Account</p>
                <div>
                    <input onChange={(event) => setStudentVal(event.target.value)} type="text" ref={studentInput} placeholder="Filter by student" val={studentVal}></input>
                    <button onClick={() => {props.filterByStudent(studentVal)}}>Filter!</button>
                </div>
            </div>
            <div className="filter-set">
                <p>Filter by Date</p>
                <div>
                    <input onChange={(event) => setDateVal(event.target.value)} type="text" ref={dateInput} placeholder="YYYY-MM-DD" val={dateVal}></input>
                    <button onClick={() => {props.filterByDate(dateVal)}}>Filter!</button>
                </div>
            </div>
            <div className="filter-set">
                <p>Filter by Target Text</p>
                <div>
                    <input onChange={(event) => setTargetVal(event.target.value)} type="text" ref={textInput} placeholder="Filter by text" val={targetVal}></input>
                    <button onClick={() => {props.filterByTargetText(targetVal)}}>Filter!</button>
                </div>
            </div>
        </div>
      </div>
    );
};
export default Filters;
