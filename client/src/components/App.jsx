import React, {PropTypes} from 'react';

class App extends React.Component {
  render() {
    console.log('I got App');
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.shape.isRequired,
};

export default App;
