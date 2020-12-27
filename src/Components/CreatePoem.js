import React, { Component } from 'react';
import App from '../App';

class CreatePoem extends Component {
    render() {
      return(
        <article>
          <h1>Create</h1>
          <form action = "/create_process" method = "post" 
          onSubmit = {function(e){
            e.preventDefault();
            this.props.onSubmit(
              e.target.title.value,
              e.target.desc.value
            );
          }.bind(this)}>
            <p><input type = "text" name = "title" placeholder = "title"></input></p>
            <p>
              <textarea name = "desc" placeholder = "내용"></textarea>
            </p>
            <p>
              <input type = "submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }

  export default CreatePoem;