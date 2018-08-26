import React from 'react';

class WordCloud extends React.Component {
  constructor() {
    // super(props);
    this.state = {
      texts: {
        text: "",
        // other features state,
        // other features state,
      }
    };

    this.handleTextsSubmit = this.handleTextsSubmit.bind(this);
  }

  handleTextsSubmit(e) {
    e.preventDefault();
    this.createTextsCloud(this.state.texts).then(() => {
      let newState = merge({}, this.state, { texts: { text: "" } });
      this.setState(newState);
    });
  }

  updateTextsField() {
    return e => {
      let newState = merge({}, this.state, {
        texts: { text: e.target.value }
      });
      this.setState(newState);
    };
  }

  render(){
    return (
      <div>
        <br></br>
          <textarea
            placeholder="Please paste your text here"
            onChange={this.updateTextsField()}
            value={this.state.texts.text}
          />
        <button onClick={this.handleTextsSubmit}>
          <span>Submit</span>
        </button>
      </div>
     );
  }

export default WordCloud;
