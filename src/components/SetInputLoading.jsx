import React, { Component } from 'react'

export default class SetInputLoading extends Component {
  render() {
    return (
      <div className="loading-image-container">
      <img 
      src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif" 
      alt="loading" 
      className="input-loading-image"
      />
      </div>
    )
  }
}
