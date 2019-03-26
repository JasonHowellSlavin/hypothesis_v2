import React from 'react';
import './Sort.scss';

const Sort = function (props) {

    const sortByAlpha = function(data) {
        return data.sort((itemA, itemB) => {
            if (itemA.user[5] < itemB.user[5]) {
                return -1
            }
            if (itemA.user[5] > itemB.user[5]) {
                return 1
            }
            return 0;
        })
    }

    const sortByDate = function(data) {
        return data.sort((dateA, dateB) => {
            return new Date(dateA.updated) - new Date(dateB.updated);
        });
    }

    // target[0].selector ? item.target[0].selector[3].exact

    const sortByTarget = function(data) {
        return data.sort((targetA, targetB) => {
            if (targetA.target[0].selector && targetB.target[0].selector) {
                if (targetA.target[0].selector[3].exact.trim()[0].toUpperCase().trim() < targetB.target[0].selector[3].exact.trim()[0].toUpperCase()) {
                    return -1
                }
                if (targetA.target[0].selector[3].exact.trim()[0].toUpperCase() > targetB.target[0].selector[3].exact.trim()[0].toUpperCase()) {
                    return 1
                }
                return 0;
            }
        });
    }


    return (
     <div>
        <button onClick={() => props.sortHook(sortByAlpha(props.data))}>Sort by Student</button>
        <button onClick={() => props.sortHook(sortByDate(props.data))}>Sort by Date</button>
        <button onClick={() => props.sortHook(sortByTarget(props.data))}>Sort by Target Text</button>
      </div>)
};

export default Sort;
