import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'

import { postEvent } from '../actions';

class EventsNew extends Component {
  //onSubmit をバインドする
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  renderField(field) {
    const {input, label, type, meta: {touched, error} } = field

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  async onSubmit(values) {
    await this.props.postEvent(values)
    //トップページの履歴をプッシュ
    this.props.history.push('/')
  } 

  //redux-formを使用した入力formの実装 (field)
  render() {
    //pristine は入力なし状態
    const { handleSubmit, pristine, submitting, invalid } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div><Field label="Title" name="title" type="text" component={this.renderField}/></div>
          <div><Field label="Body" name="body" type="text" component={this.renderField}/></div>
        
          <div>
            <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a title, please."

  return errors
}

//あるアクションが発生した際に、reducerに状態に応じてActionを実行させる
const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
  //redeux-formでeventsnewをデコレートする
  reduxForm({ validate, form: 'eventNewForm'})(EventsNew)
)