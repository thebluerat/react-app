import React, { Component } from 'react';
import App from '../App';

class ReadPoem extends Component {
    render() {
      return(
        <article>
          <h1>{this.props.title}</h1>
          <pre>{this.props.desc}</pre>
          
        </article>
      );
    }
  }

  export default ReadPoem;