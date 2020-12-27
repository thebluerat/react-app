import React, { Component } from 'react';

class Control extends Component {
    render() {
      return(
        <ul>
          <li><a href = '/create' onClick = {function(e){
            e.preventDefault();
            this.props.onChangeMode('create');//클릭했을 때 onChangeMode라는 핸들러를 실행시킴. 이때 모드는 'create'가 됨
          }.bind(this)}>만들기</a></li>

          <li><a href = '/update' onClick = {function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>수정하기</a></li>
          
          <li><input onClick = {function(e){
            e.preventDefault();
            this.props.onChangeMode('delete');
          }.bind(this)} type = "button" value = "삭제하기"></input></li>
        </ul>
      );
    }
  }

  export default Control;