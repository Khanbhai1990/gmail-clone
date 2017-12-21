import React, { Component } from 'react'


class ToolBar extends Component {
  render () {
    let selectBtnClass = `fa-square-o`;

    let messagesSelected = this.props.messages.filter(message=> message.selected);

    if (messagesSelected.length === this.props.messages.length){
      selectBtnClass = `fa-check-square-o`
    } else if (messagesSelected[0]){
      selectBtnClass = `fa-minus-square-o`
    }
console.log(selectBtnClass)

let counterUnread = this.props.messages.filter(msg=> !msg.read).length
let countSelect = this.props.messages.reduce((accum, val)=> {
    return accum + !!val.selected
  }, 0)



    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{counterUnread}</span>
            {counterUnread>1 || counterUnread ===0  ? `unread messages`:`unread message`}
          </p>

          <a className="btn btn-danger" onClick={this.props.toggleShowCompose}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default"
            onClick={()=> this.props.selectButtonFunc(selectBtnClass)}
            >
            <i className={`fa ${selectBtnClass}`}></i>

          </button>

          <button className="btn btn-default" onClick={()=> this.props.setReadMsg()}
            disabled={!countSelect}>Mark As Read</button>

          <button className="btn btn-default" onClick={()=> this.props.setUnreadMsg()}
            disabled={countSelect? "":"disabled"}>Mark As Unread</button>

          <select
            className="form-control label-select"
            onChange={(e)=> this.props.addLabel(e.target.value)}
            disabled={countSelect? "":"disabled"}
            >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
            className="form-control label-select"
            onChange={(e)=> this.props.deleteLabel(e.target.value)}
            disabled={countSelect? "":"disabled"}
            >
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={()=> this.props.deleteMsg()}
            disabled={countSelect? "":"disabled"}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>

      </div>
    )
  }
}
export default ToolBar
