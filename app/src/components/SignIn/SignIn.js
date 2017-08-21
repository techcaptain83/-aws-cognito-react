import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import validator from 'validator'

import { TextField } from 'redux-form-material-ui'

import { FlatButton, RaisedButton } from 'material-ui'

import { Link } from 'react-router-dom'

import { state } from 'aws-cognito-redux-saga'

const required = value => (value ? undefined : 'Required')
const email = value =>
  validator.isEmail(value) ? undefined : 'Not Valid Email'

const style = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  },
  title: {
    margin: '8px',
    fontSize: '32px',
    textAlign: 'center'
  },
  form: {
    width: '320px',
    boxShadow: '2px 2px 5px rgb(80,80,80)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signup: {
    fontSize: '24px',
    margin: '24px'
  },
  signInButton: {
    margin: '32px',
    width: '80%'
  },
  button: {
    margin: '8px 0'
  },
  error: {
    margin: '8px',
    color: 'rgb(200,0,0)'
  }
}

class SignIn extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    auth: PropTypes.object,
    init: PropTypes.func,
    history: PropTypes.object
  }

  componentWillMount() {
    this.props.init()
  }

  signIn = values => {
    if (this.props.auth.isConfirmed === state.AUTH_SUCCESS) {
      this.props.signIn(values.email, values.password)
    } else {
      this.props.signIn(values.email, values.password, values.code)
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isSignedIn === state.AUTH_SUCCESS) {
      this.props.history.push('/')
    }
  }

  render() {
    const { handleSubmit, auth } = this.props
    return (
      <div style={style.layout}>
        <form style={style.form}>
          <div style={style.title}>Sign In</div>

          <Field
            style={style.button}
            name="email"
            validate={[required, email]}
            component={TextField}
            type="email"
            floatingLabelText="Username"
          />

          <Field
            style={style.button}
            name="password"
            validate={[required]}
            component={TextField}
            type="password"
            floatingLabelText="Password"
          />

          <div style={style.error}>
            {auth.error && auth.error.message}
          </div>

          {auth.isConfirmed === state.AUTH_FAIL
            ? <Field
                style={style.button}
                name="code"
                validate={[required]}
                component={TextField}
                type="text"
                floatingLabelText="Confirmation Code"
              />
            : null}

          <RaisedButton
            style={style.signInButton}
            primary
            onClick={handleSubmit(this.signIn)}
          >
            Sign In
          </RaisedButton>
        </form>

        <FlatButton
          style={style.signup}
          containerElement={<Link to="/signup" />}
        >
          Sign Up
        </FlatButton>
      </div>
    )
  }
}

// Decorate the form component
export default reduxForm({
  form: 'signIn'
})(SignIn)
