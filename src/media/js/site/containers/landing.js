import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class Landing extends React.Component {
  render() {
    return (
      <section>
        <h1>Develop HTML5 content for an open marketplace.</h1>
        <ul>
          <li><ReverseLink to="addon">Firefox OS Add-ons</ReverseLink></li>
        </ul>
      </section>
    );
  }
}
