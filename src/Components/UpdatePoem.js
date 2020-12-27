import React, { Component } from 'react';
import App from '../App';

class UpdatePoem extends Component {
  constructor(props){//props 대신 state 값을 쓰려고 ..
    super(props);
    
    this.state = {
      id:this.props.data.id,
      title:this.props.data.title,
      desc:this.props.data.desc
    }
  
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
    inputFormHandler(e){
      this.setState({[e.target.name]:e.target.value});
    }
    render() {
      console.log('UpdatePoem render');
      return(
        <article>
          <h1>Update</h1>
          <form action = "/create_process" method = "post" 
          onSubmit = {function(e){
            e.preventDefault();
            
              this.props.onSubmit(
                this.state.id,
                this.state.title,
                this.state.desc
              );
            
          }.bind(this)}>
            <input type = "hidden" name = "id" value = {this.state.id}></input>
            <p>
              <input 
              type = "text" 
              name = "title" 
              placeholder = "title"
              value = {this.state.title} //value값으로 props를 쓰면 read only이기 때문에 수정이 안 된다. 가변적인 state값으로 바꿈.
              onChange = {this.inputFormHandler} //onChange가 있어야 내용을 바꿀 수 있어!
              ></input>
            </p>
            <p>
              <textarea
                name = "desc" 
                placeholder = "내용" 
                value = {this.state.desc}
                onChange = {this.inputFormHandler}
                ></textarea>
            </p>
            <p>
              <input type = "submit"></input>
            </p>
          </form>
        </article>
      );
    }
  }

  export default UpdatePoem;