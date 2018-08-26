import React from 'react';
import WordCloud from '../WordCloud/WordCloud';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='container'>
          <WordCloud />
        </div>
      </div>
    )
  }
}

export default App;
// <img className='logo' src={logo} alt='logo'></img>
