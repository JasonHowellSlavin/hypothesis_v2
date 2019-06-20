import React from 'react';
import './Responses.scss';

const Responses = (props) => (
     <div>
        {props.activeData.map((item, i) => (
              <section key={item.id}>
                <p className='label'>Student Account: <span>{item.user.replace('acct:', '')}</span></p>
                <p className='label'>Date Added: <span>{item.created.slice(0, item.created.indexOf('T'))}</span></p>
                <p className='label'>{item.target[0].selector ? 'Annotation:' : 'Response:' }</p>
                <p>{item.text}</p>
                <p className='label'>Annotation Length: <span>{item.text.length}</span></p>
                <p className='label'>Target Text:</p>
                <p>{(() => {
                    let targetText;

                    if (item.target[0].selector !== undefined) {
                        item.target[0].selector.forEach((selectItem) => {
                            if (selectItem.hasOwnProperty('exact')) {
                                targetText = selectItem['exact'];
                            }
                        })
                        return targetText;
                    } else {
                        return 'Responsended to another annotation';
                    }
                })()}</p>
                <p className='label'>URL: <span>{item.uri !== undefined ? item.uri : 'No url specified'}</span></p>
              </section>
        ))}
      </div>
    );

export default Responses;
