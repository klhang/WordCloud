import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <img className='logo' src={logo} alt='logo'></img>
        <div className='container'>
          <NewsPanel />
        </div>
      </div>
    )
  }
}

export default App;
