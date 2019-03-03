import React from 'react';
import './Responses.scss';

const Responses = (props) => (
     <div>
        {props.data.map((item, i) => (
              <section key={item.id}>
                <h4>Student Account: <span>{item.user.replace('acct:', '')}</span></h4>
                <h4>Date Added: <span>{item.created.slice(0, item.created.indexOf('T'))}</span></h4>
                <h4>Annotation:</h4>
                <p>{item.text}</p>
                <h4>Target Text:</h4>
                <p>{item.target[0].selector[3].exact !== undefined ? item.target[0].selector[3].exact : 'target unspecified'}</p>
                <h4>URL: <span>{item.uri}</span></h4>
              </section>
        ))}
      </div>
    );

export default Responses;