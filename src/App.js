// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react';
import Subject from "./Components/Subject"
import ReadPoem from "./Components/ReadPoem"
import CreatePoem from "./Components/CreatePoem"
import UpdatePoem from "./Components/UpdatePoem"
import Poems from "./Components/Poems"
import Control from "./Components/Control"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3; //마지막 id값. UI에 하등 영향을 주지 않기 때문에 state를 사용하지 않고 밖으로 뺌. 사용하면 불필요한 렌더링 발생
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:'시 외우기', sub: '시 하나쯤 외워서 내 생각으로 만들자'},
      welcome:{title:'시 외우기', desc: '외우고 싶은 시를 골라서 적어보세요'},
      contents:[
        {id:1, title:'천사', desc:'나는 등이 가렵다'},
        {id:2, title:'축, 생일', desc:'이목구비는 대부분의 시간을 제멋대로 존재하다가'},
        {id:3, title:'맛', desc:'어쩌지? 꿈이 너무 달콤해서'}
      ]
    }//state 값 초기화
  }

  getReadContent(){ //_content
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id){
          return data;
          break;
        }
        i = i + 1;
      }
  }

  getContent(){
    var _title, _desc, _article = null; //_article은 모드에 따라 바뀌어 보여지는 내용에 관한 것
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadPoem title = {_title} desc = {_desc}></ReadPoem>;
    } else if (this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadPoem title = {_content.title} desc = {_content.desc}></ReadPoem>;
    } else if(this.state.mode === 'create'){
      _article = <CreatePoem onSubmit = {function(_title, _desc){ //입력값으로 _title, _desc를 받을 때,
        this.max_content_id = this.max_content_id+1;
        
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        
        this.setState({
          contents:newContents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreatePoem>
    } else if(this.state.mode === 'update'){
      var _content = this.getReadContent();
      _article = <
        UpdatePoem data = {_content} 
        onSubmit = {
          function(_id, _title, _desc){
            var _contents = Array.from(this.state.contents); //원본을 바꾸지 않는 테크닉.
            var i = 0;
            while(i < _contents.length){ //선택된 id의 데이터
              if(_contents[i].id === _id){
                _contents[i] = {id:_id, title:_title, desc:_desc}; //수정한 값으로 교체
                break;
              }
              i = i + 1;
            }
            
            this.setState({ //업데이트 끝나고 모드를 read로 바꿔줌 (다른 기능도 마찬가지)
              contents:_contents,
              mode:'read'
            });
          }.bind(this)
        }
      >
      </UpdatePoem>
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title = {this.state.subject.title}
          sub = {this.state.subject.sub}
          onChangePage = {function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
          >   
          </Subject>
        <Poems 
        onChangePage = {function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}
        data = {this.state.contents}
        >
        </Poems>
        <Control onChangeMode = {function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('Seriously?')){
              var _contents = Array.from(this.state.contents); //setState로 들어가기 때문에 복제해주는 게 더 좋음
              var i = 0;
              while(i < _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1); //원소의 id 값부터 1개를 지우겠다
                  break;
                }
                i = i + 1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('삭제되었습니당');
            }
          } else{
            this.setState({
              mode:_mode
            });
          }
          
        }.bind(this)}>
        </Control>
        {this.getContent()}
      </div>
    );
  }
}
export default App;