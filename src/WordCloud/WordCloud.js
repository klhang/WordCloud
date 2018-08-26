import React from 'react';
import Select from 'react-select';
import TagCloud from 'react-d3-cloud';

const fontOptions = [
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' }
];
const rotateOptions = [
  { value: '0', label: '0°' },
  { value: '45', label: '45°' },
  { value: '-45', label: '-45°' }
];
const frequencyOptions = [
  { value: 'Most Frequent', label: 'Most Frequent' },
  { value: 'Least Frequent', label: 'Least Frequent' },
];


class WordCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: {
        text: "",
        disabled: false
      },
      data: [],
      font: 10,
      // rotate:
          // rotate: 'Horizontal',
          // frequencySort: 'Most Frequent'
    };
    this.handleTextsSubmit = this.handleTextsSubmit.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    this.handleFontOptions = this.handleFontOptions.bind(this);
    // this.handleRotateOptions = this.handleRotateOptions.bind(this);
    // this.handleFrequencyOptions = this.handleFrequencyOptions.bind(this);
  }

  handleFontOptions = (font) => {
    this.setState({font: font.value});
  }



  fontSizeMapper(word) {
    return word.value * this.state.font;
  }

  rotate(word){
    return -45;
  }


  // const rotate = word => word.value % 360;

  handleTextsSubmit(e) {
    e.preventDefault();

    let texts = this.cleanTexts(this.state.textarea.text);
    let tags = this.generateTags(texts);
    console.log(tags);

    let newState = { textarea: {text: "please select animation", disabled: true},
                     data: tags
                   };
    this.setState(newState);
  }

  handleStartOver(e) {
    e.preventDefault;
    let newState = {
      textarea: {
        text: "",
        disabled: false
      },
      data: [],
      font: 10
          // rotate: 'Horizontal',
          // frequencySort: 'Most Frequent'
      }
    this.setState(newState);
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

  generateTags(str){
    let frequencyMap = this.buildFrequencyMap(str);
    let tags = [];

    Object.keys(frequencyMap).forEach(key => {
      let tag = {"text"  : key,
                 "value" : frequencyMap[key]};
      tags.push(tag);
    });

    return tags;
  };

  buildFrequencyMap(str){
    let arr = str.split(" ");
    let map = {};

    for (let i = 0; i < arr.length; i++){
      let word = arr[i];
      if (word in map){
        map[word] = map[word] + 1;
      } else {
        map[word] = 1;
      }
    }

    return map;
  }

  updateTextsField(e) {
    return e => {
      this.setState({textarea: {text: e.target.value}} );
    }
  }



  render(){
    const { font } = this.state.font;



    return (
      <div>
        <Select
          value={font}
          onChange={this.handleFontOptions}
          options={fontOptions}
        />

        <br></br>
          <div className="form-group">
            <label >Comment:</label>
            <textarea
              class="form-control"
              rows="5"
              placeholder="Please paste your text here"
              onChange={this.updateTextsField()}
              value={this.state.textarea.text}
              disabled={this.state.textarea.disabled}
            />
          </div>




          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.handleTextsSubmit}>
            Submit
          </button>
          <br></br>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            onClick={this.handleStartOver}>
            Start Over
          </button>

          <br></br>
          <div className="btn-group">
            <button type="button" className="btn btn-danger">Action</button>
            <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>
          </div>
          <br></br>

            <select class="selectpicker">
              <option>Mustard</option>
              <option>Ketchup</option>
              <option>Relish</option>
            </select>

          <br></br>

        <div>
            <TagCloud
              data={this.state.data}
              fontSizeMapper={this.fontSizeMapper.bind(this)}
              rotate={this.rotate.bind(this)}
            />
        </div>
      </div>
     );
  }
}

export default WordCloud;
