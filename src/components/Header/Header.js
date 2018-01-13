import React from 'react'
import PropTypes from 'prop-types'

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'

import { Link } from 'react-router-dom'

import { state } from 'aws-cognito-redux-saga'

export default class HeaderComponent extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.string,
    signUpError: PropTypes.bool,
    signOut: PropTypes.func,
    signIn: PropTypes.func,
    signUp: PropTypes.func,
    auth: PropTypes.object
  }

  signOut = () => {
    this.props.signOut()
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <IconButton
              href="https://github.com/dbroadhurst/aws-cognito-react"
              target="_blank"
            >
              <img alt="github" width="28" src="GitHub-Mark-120px-plus.png" />
            </IconButton>

            <FlatButton
              label="aws-cognito-react"
              containerElement={<Link to="/" />}
            />
          </ToolbarGroup>

          <ToolbarGroup>
            {auth.isSignedIn !== state.AUTH_SUCCESS ? (
              <FlatButton
                containerElement={<Link to="/signin" />}
                label="Sign Up / Sign In"
                onClick={this.signIn}
              />
            ) : (
              <div>
                {auth.info.username}
                <FlatButton label="Sign Out" onClick={this.signOut} />
              </div>
            )}
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}
