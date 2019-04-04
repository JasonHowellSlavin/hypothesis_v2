import React from 'react';
import './Responses.scss';

const Responses = (props) => (
     <div>
        {props.activeData.map((item, i) => (
              <section key={item.id}>
                <h4>Student Account: <span>{item.user.replace('acct:', '')}</span></h4>
                <h4>Date Added: <span>{item.created.slice(0, item.created.indexOf('T'))}</span></h4>
                <h4>{item.target[0].selector ? 'Annotation:' : 'Response:' }</h4>
                <p>{item.text}</p>
                <h4>Annotation Length: </h4>
                <p>{item.text.length}</p>
                <h4>Target Text:</h4>
                <p>{item.target[0].selector ? item.target[0].selector[3].exact : 'Responsended to another annotation'}</p>
                <h4>URL: <span>{item.uri !== undefined ? item.uri : 'No url specified'}</span></h4>
              </section>
        ))}
      </div>
    );

export default Responses;
