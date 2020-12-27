import React, { Component } from 'react';
import App from '../App';

class CreatePoem extends Component {
    render() {
      return(
        <article>
          <h1>Create</h1>
          <form action = "/create_process" method = "post" //임시
          onSubmit = {function(e){//submit 버튼을 클릭했을 때, 버튼을 포함하고 있는 form 태그에 onSubmit이라는 이벤트를 설치해놓으면 실행된다
            e.preventDefault();//페이지 안 바뀌게 함
            this.props.onSubmit(
              e.target.title.value,
              e.target.desc.value //App.js에 onSubmit에 입력한 title과 desc 값이 전달됨. 이걸 state의 contents 끝에 추가해주자
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