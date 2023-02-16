import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

   static getDerivedStateFromError(error){
    return { error };
    }
    state={
        error: null
    }

    componentDidCatch(error, info) {
        console.log(info);
    }

  render() {

    const { children } = this.props;
    const { error } = this.state;

    if(error) {
        return (
            <p className="text-red-500 text-center text-2xl font-bold">{ error.message }</p>
        )
    }

    return children;
  }
}
