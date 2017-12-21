import React, { Component } from 'react';

import './App.css';
import MessageList from './MessageList.js'
import ToolBar from './ToolBar.js'
import ComposeForm from './ComposeForm.js'
import axios from 'axios'
class App extends Component {
  state = {
    messages: [],
    showCompose: false
  }


componentDidMount = async () => {
  let messages = await axios.get('https://back-end-q3.herokuapp.com/messages')
  this.setState({messages: messages.data})
}

  addMessage = async (message)=>{
  let newMessage = {
    ...message,
    labels:JSON.stringify([]),
    read:false,
    selected:false,
    starred:false

  }
  let newMessages = await axios.post('https://back-end-q3.herokuapp.com/messages', newMessage)
    this.setState({messages:newMessages.data})
  }
  toggleShowCompose = ()=> {
    this.setState({showCompose: !this.state.showCompose})
  }
  toggleRead = (selectedMessage)=> {
    let othermessages = this.state.messages.filter(message => selectedMessage.id != message.id)
    console.log('other message are ' + othermessages)
    let changeMessage = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read:!selectedMessage.read,
      starred: selectedMessage.starred,
      labels:selectedMessage.labels

    }
    this.setState({messages:othermessages.concat(changeMessage).sort((a,b)=>a.id-b.id)})
  }

  toggleStarred = (selectedStarred)=> {
    let otherStarred = this.state.messages.filter(message => selectedStarred.id != message.id)
    // console.log('other starred are ' + othermessages)
    let changeStarred = {
      id: selectedStarred.id,
      subject: selectedStarred.subject,
      read:selectedStarred.read,
      starred: !selectedStarred.starred,
      labels:selectedStarred.labels

    }
    this.setState({messages:otherStarred.concat(changeStarred).sort((a,b)=>a.id-b.id)})
  }

  toggleSelected = (selected)=> {
    let otherSelected = this.state.messages.filter(message => selected.id != message.id)
    // console.log('other starred are ' + othermessages)
    let changeSelected = {
      id: selected.id,
      subject: selected.subject,
      read:selected.read,
      starred: selected.starred,
      labels:selected.labels,
      selected: !selected.selected || false

    }
    this.setState({messages:otherSelected.concat(changeSelected).sort((a,b)=>a.id-b.id)})
  }

  toolbarCopyCurrentState = ()=>{
    return this.state.messages.map((message)=>{
      return {...message};
    })
  }

  selectButtonFunc = (type)=>{
    let messagesStateCopy = this.toolbarCopyCurrentState();

    if (type.includes('check')){
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = false;
        return message;
      });
    } else {
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = true;
        return message;
      })
    }

    this.setState({messages: messagesStateCopy})
  }





  setReadMsg = ()=>{
    let newState = this.state.messages.map(msg => {
      if(msg.selected) msg.read = true
        return msg

    })
    console.log(newState)
    this.setState({messages:newState})
  }

  setUnreadMsg = ()=>{
    let newState = this.state.messages.map(msg => {
      if(msg.selected) msg.read = false
        return msg

    })
    console.log(newState)
  this.setState({messages:newState})
  }

  deleteMsg = ()=>{
    let newState = this.state.messages.filter(msg => !msg.selected)
    this.setState({messages: newState})
  }

  addLabel = (label)=>{
    let newState = this.state.messages.map(msg => {
      if (msg.selected&&!msg.labels.includes(label)) msg.labels.push(label)
      return msg
    })
    this.setState({messages:newState})
  }

  deleteLabel = (label)=>{
    let newState = this.state.messages.map(msg => {
      if (msg.selected) msg.labels = msg.labels.filter(l => l !== label)
      return msg
    })

    this.setState({messages:newState})
  }

  render() {
    let numofSelectedMsgs = this.state.messages.filter(msg => msg.selected).length
    return (
      <div className="App">
        <ToolBar
          messages ={this.state.messages}
          numofSelectedMsgs={numofSelectedMsgs}
          selectButtonFunc={this.selectButtonFunc}
          setReadMsg={this.setReadMsg}
          setUnreadMsg={this.setUnreadMsg}
          deleteMsg={this.deleteMsg}
          addLabel={this.addLabel}
          deleteLabel={this.deleteLabel}
          toggleShowCompose={this.toggleShowCompose}
          showCompose={this.state.showCompose}
          />
        {this.state.showCompose && <ComposeForm addMessage={this.addMessage} />}
        <MessageList
          messages ={this.state.messages}
          toggleRead ={this.toggleRead}
          toggleStarred={this.toggleStarred}
          toggleSelected={this.toggleSelected}
          />
      </div>
    );
  }
}

export default App;
