import React from 'react';

const Responses = (props) => (
     <div>
        {props.data.map((item, i) => (
              <section key={item.id}>
                <h3>User: {item.user}</h3>
                <h3>Created: {item.created}</h3>
                <h3>Annotation: {item.text}</h3>
                <h3>Target Text: {item.target[0].selector[3].exact !== undefined ? item.target[0].selector[3].exact : 'target unspecified'}</h3>
              </section>
        ))}
      </div>
    );

export default Responses;
