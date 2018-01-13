import { connect } from 'react-redux'

import PrivateRouteComponent from './PrivateRoute'

const mapStatetoProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStatetoProps, mapDispatchToProps)(
  PrivateRouteComponent
)
