import React from 'react';
import merge from "lodash/merge";

class WordCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texts: {
        text: "",
        // other features state,
        // other features state,
        data: []
      }
    };

    this.handleTextsSubmit = this.handleTextsSubmit.bind(this);
  }

  handleTextsSubmit(e) {
    e.preventDefault();
    let text = this.cleanTexts(this.state.texts.text)
    // console.log(text)
    this.generateCloud(text).then(() => {
        let newState = merge({}, this.state, { texts: { text: "" } });
        this.setState(newState);
    });
  }

  generateCloud(str){
    let map = buildMap(str);
    let tags = [];
    Object.keys(map).forEach(key => {
      let tag = {"text"  : key,
                 "value" : map[key]};
      tags.add(tag);
    });
    let newState = merge({}, this.state, {texts: { data: tags}});
  };

  buildHash(str){
    let arr = str.split(" ");
    let map = {};
    for (let i = 0; i < arr.length; i++){
      let word = arr[i];
      if (words in map){
        map[words] = map[words] + 1;
      } else {
        map[words] = 1;
      }
    }
    return map;
  }

  updateTextsField() {
    return e => {
      let newState = merge({}, this.state, {
        texts: { text: e.target.value }
      });
      this.setState(newState);
    };
  }

  cleanTexts(str) {
  	if (typeof str !== 'string') {
  		throw new TypeError('Expected a string');
  	}
  	return str.replace(/[&\/\\#,+\(\)$~%\.!^'"\;:*?\[\]<>{}]/g, '');

    // var s = "This., -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation";
    // var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    // var finalString = punctuationless.replace(/\s{2,}/g," ");
  };



  render(){
    return (
      <div>
        <TagCloud
          data={data}
        />
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
}

export default WordCloud;
