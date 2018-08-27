import React from 'react';
import Select from 'react-select';
import TagCloud from 'react-d3-cloud';


const fontSizeOptions = [
  { value: 10, label: '10px' },
  { value: 15, label: '15px' },
  { value: 20, label: '20px' }
];

const rotateOptions = [
  { value: 0, label: '0°' },
  { value: 30, label: '30°' },
  { value: 45, label: '45°' },
  { value: -30, label: '-30°' },
  { value: -45, label: '-45°' }
];

const pattenOptions = [
  { value: 'Most Frequent', label: 'Most Frequent' },
  { value: 'Least Frequent', label: 'Least Frequent' }
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
      fontSize: 10,
      rotate: 0,
      pattern: 'Most Frequent',
      inOrder: true,
      error: "",

    };
    this.handleTextsSubmit = this.handleTextsSubmit.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    this.handleFontSizeOptions = this.handleFontSizeOptions.bind(this);
    this.handleRotateOptions = this.handleRotateOptions.bind(this);
    this.handlePatternOptions = this.handlePatternOptions.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleTextsSubmit = (e) => {
    e.preventDefault();
    let texts = this.cleanTexts(this.state.textarea.text).split(" ");
    let uniqueWords = this.buildFrequencyMap(texts);
    let newState = {};
    let error = "";

    if (this.validateInput(uniqueWords) === true){
      newState = this.createData(uniqueWords);
      this.setState(newState);
    } else if (this.validateInput(uniqueWords) === false){
      error = Object.keys(uniqueWords).length + ' unique words identified, please provide 20 to 120 unique words.'
      this.setState({ error: error});
    }
  }

  validateInput(uniqueWords){
    let uniqueWordsCount = Object.keys(uniqueWords).length
    if (20 <= uniqueWordsCount && uniqueWordsCount <= 150) {
      return true;
    } else {
      return false;
    }
  }

  createData(uniqueWords){
    let initialFontSize = 15;
    let tags = this.generateTags(uniqueWords);
        console.log(tags);

    if (5 <= tags.length < 20){
      initialFontSize = 20;
    } else if (tags.length < 40){
      initialFontSize = 15;
    } else {
      initialFontSize = 10;
    }

    let newState = { textarea: {text: "please select animation", disabled: true},
                     data: tags,
                     fontSize: initialFontSize,
                     error: ""
                   };
    return newState;
  }

  cleanTexts(str) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string');
    }
    str = str.replace(/[&\/\\#===,+\(\)$~%\.!^'"\;:*=?\[\]<>{}]/g, ' ');

    return str;
  };

  generateTags(uniqueWords){
    // let frequencyMap = this.buildFrequencyMap(words);
    let tags = [];

    Object.keys(uniqueWords).forEach(key => {
      let tag = {"text"  : key,
                 "value" : uniqueWords[key]};
      tags.push(tag);
    });
    return tags;
  };

  buildFrequencyMap(texts){
    let map = {};
    for (let i = 0; i < texts.length; i++){
        let word = texts[i];
        console.log(typeof word)
        if (word.length <= 1 || isNaN(word) === false ){
          continue;
        }
        if (word in map){
          map[word] = map[word] + 1;
        } else {
          map[word] = 1;
        }
    }
    return map;
  }

  updateTextsField() {
    return e => {
      this.setState({ textarea: {text: e.target.value} });
    }
  }

  handleFontSizeOptions = (fontSize) => {
    this.setState({fontSize: fontSize.value});
  }

  handleRotateOptions = (rotate) => {
    this.setState({rotate: rotate.value});
  }

  handleShuffel= (data) => {
    this.setState({data: this.state.data});
  }

  handlePatternOptions = (pattern) => {
    let data = this.state.data;
    let maxWordCount = 0;
    let newOrder = this.state.inOrder;

    for (let i = 0; i < data.length; i++){
      maxWordCount = Math.max(maxWordCount, Math.abs(data[i]['value']));
    }
    maxWordCount++;

    if (pattern.value === "Least Frequent" && this.state.inOrder === true){
      for (let i = 0; i < data.length; i++){
        data[i]['value'] = maxWordCount - data[i]['value'];
      }
      newOrder = false;
    } else if (pattern.value === "Most Frequent" && this.state.inOrder === false){
      for (let i = 0; i < data.length; i++){
        data[i]['value'] = Math.abs(data[i]['value'] - maxWordCount);
      }
      newOrder = true;
    }

    this.setState({data: data, inOrder: newOrder});
  }

  handleDemo = (e) => {
    e.preventDefault;
    let data = require('./Demo/data.json');
    let newState = { textarea: {text: "please select animation",disabled: true},
                     data: data,
                     fontSize: 15,
                     rotate: -30,
                     pattern: 'Most Frequent',
                     inOrder: true
                   }
    this.setState(newState);
  }




  handleStartOver = (e) => {
    e.preventDefault;
    let newState = { textarea: {text: "",disabled: false},
                     data: [],
                     fontSize: 10,
                     rotate: 0,
                     pattern: 'Most Frequent',
                     inOrder: true
                   }
    this.setState(newState);
  }

  fontSizeMapper(word) {
    return word.value * this.state.fontSize;
  }

  rotate(word){
    return this.state.rotate;
  }


  render(){
    const { fontSize } = this.state.fontSize;
    const { rotate } = this.state.rotate;
    const { pattern } = this.state.pattern;


    return (
      <div className="container">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-brand brand-sm" >
            <span className='brand-sm'>TagCloud</span>
          </div>
        </nav>


        <div>
            <div className="form-group">
              <label >Comment:</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Please paste your text here"
                onChange={this.updateTextsField()}
                value={this.state.textarea.text}
                disabled={this.state.textarea.disabled}
              />
            </div>

            <div>
              <strong>{this.state.error}</strong>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary mb-2"
                onClick={this.handleShuffel}>
                Shuffle
              </button>
              <br></br>

              <button
                type="submit"
                className="btn btn-primary mb-2"
                onClick={this.handleTextsSubmit}
                disabled={this.state.textarea.disabled}>
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

              <button
                type="submit"
                className="btn btn-primary mb-2"
                onClick={this.handleDemo}>
                Demo
              </button>
            </div>
            <br></br>

            FontSize Options:
            <Select
              value={fontSize}
              onChange={this.handleFontSizeOptions}
              options={fontSizeOptions}
            />
          <br></br>

            Rotate Options:
            <Select
              value={rotate}
              onChange={this.handleRotateOptions}
              options={rotateOptions}
            />
          <br></br>

          Pattern Options:
            <Select
              value={pattern}
              onChange={this.handlePatternOptions}
              options={pattenOptions}
            />

          <div>
              <TagCloud
                data={this.state.data}
                fontSizeMapper={this.fontSizeMapper.bind(this)}
                rotate={this.rotate.bind(this)}
              />
          </div>
        </div>
      </div>
     );
  }
}

export default WordCloud;
