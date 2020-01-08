import React from 'react';
import './styles/popup.scss';

class Popup extends React.Component {
  render() {
    return (
        <div className='popup'>
          <div className='popup-inner'>
            <h1 className='popup-text'>{this.props.text}</h1>
            <button className='popup-button' onClick={this.props.closePopup}>Return</button>
          </div>
        </div>
    );
  }
}

export default Popup;