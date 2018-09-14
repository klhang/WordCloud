import React from 'react';
import Select from 'react-select';
import TagCloud from 'react-d3-cloud';

//animation options
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
      data: [], //data for d3 to generate cloud
      fontSize: 10,  //font size of the cloud
      rotate: 0,  // initial ratotae degree
      pattern: 'Most Frequent', //initial pattern
      inOrder: true, //the tags are initially sorted in descending order
      error: "", //error for input validation
    };
    this.handleTextsSubmit = this.handleTextsSubmit.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    this.handleFontSizeOptions = this.handleFontSizeOptions.bind(this);
    this.handleRotateOptions = this.handleRotateOptions.bind(this);
    this.handlePatternOptions = this.handlePatternOptions.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.updateTextsField = this.updateTextsField.bind(this);
  }

  handleTextsSubmit = (e) => {
    e.preventDefault();
    let texts = this.cleanTexts(this.state.textarea.text).split(" ");  //first clean the texts by removing putuations, sigle letter and numbers
    let uniqueWords = this.buildFrequencyMap(texts); //build a frequecy map with value being the times of appearence of a word
    let newState = {};
    let error = "";

    if (this.validateInput(uniqueWords) === true){ //validate the input by checking the unique words
      newState = this.createData(uniqueWords); //if pass validation, then create cloud using the frequecy map
      this.setState(newState);
    } else if (this.validateInput(uniqueWords) === false){
      error = Object.keys(uniqueWords).length + ' unique words identified, please provide 20 to 120 unique words.' //show error for user
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

    if (5 <= tags.length < 20){ //adapt to different initial font size for different amount of words
      initialFontSize = 20;
    } else if (tags.length < 40){
      initialFontSize = 15;
    } else {
      initialFontSize = 10;
    }

    let newState = { textarea: {text: "Please select animation", disabled: true},
                     data: tags,
                     fontSize: initialFontSize,
                     error: ""
                   };
    return newState;
  }

  cleanTexts(str) { //clean text using regular expression
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string');
    }
    str = str.replace(/[&\/\\#===,+\(\)$~%\.!^'"\;:*=?\[\]<>{}]/g, ' ');
    return str;
  };

  generateTags(uniqueWords){ //generate tag from the frequecy map
    let tags = [];
    Object.keys(uniqueWords).forEach(key => {
      let tag = {"text"  : key,
                 "value" : uniqueWords[key]};
      tags.push(tag);
    });
    return tags;
  };

  buildFrequencyMap(texts){ //building frequecy map by counting the times a word appear
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

  // updateTextsField() { //update text field when user type in words
  //   return e => {
  //     this.setState({ textarea: {text: e.target.value} });
  //   }
  // }

  updateTextsField = (e) => {
    this.setState({textarea: {text: e.target.value}});
  }

  handleFontSizeOptions = (fontSize) => { //handle font size change
    this.setState({fontSize: fontSize.value});
  }

  handleRotateOptions = (rotate) => { //handle tag ratotion
    this.setState({rotate: rotate.value});
  }

  handleShuffel= (data) => { //handle shuffle, so user can get a new cloud with words in different positions
    this.setState({data: this.state.data});
  }

  handlePatternOptions = (pattern) => { //handle reverse pattern, showing the least frequent words in bigger size
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

  handleDemo = (e) => { // handle demo option
    e.preventDefault;
    let data = require('./Demo/data.json');
    let newState = { textarea: {text: "Please select animation",disabled: true},
                     data: data,
                     fontSize: 15,
                     rotate: -30,
                     pattern: 'Most Frequent',
                     inOrder: true,
                     error: ""
                   }
    this.setState(newState);
  }

  handleStartOver = (e) => { //handle start over
    e.preventDefault;
    let newState = { textarea: {text: "",disabled: false},
                     data: [],
                     fontSize: 10,
                     rotate: 0,
                     pattern: 'Most Frequent',
                     inOrder: true,
                     error: ""
                   }
    this.setState(newState);
  }

  fontSizeMapper(word) { //map to fontsize of the cloud
    return word.value * this.state.fontSize;
  }

  rotate(word){ // map to rotation degree of the cloud
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
            <h6 className="font-weight-light"><a href="https://github.com/klhang/wordCloud" target="_blank" >Github Repo</a></h6>
            <h1 className="text-primary">TagCloud</h1>
          </div>
        </nav>

        <div>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Please paste your text here"
                onChange={this.updateTextsField}
                value={this.state.textarea.text}
                disabled={this.state.textarea.disabled}
              />
            </div>

            <p className="text-danger">{this.state.error}</p>
            <br></br>

            <div>
              <button
                type="submit"
                className="btn btn-primary mb-2"
                onClick={this.handleDemo}
                disabled={this.state.textarea.disabled}>
                Demo
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
            </div>

            <br></br>
            <p className="text-primary">FontSize Options:</p>
            <Select
              value={fontSize}
              onChange={this.handleFontSizeOptions}
              options={fontSizeOptions}
            />

            <br></br>
            <p className="text-primary">Rotate Options:</p>
            <Select
              value={rotate}
              onChange={this.handleRotateOptions}
              options={rotateOptions}
            />

            <br></br>
            <p className="text-primary">Pattern Options:</p>
            <Select
              value={pattern}
              onChange={this.handlePatternOptions}
              options={pattenOptions}
            />
            <br></br>

            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={this.handleShuffel}>
              Shuffle
            </button>
            <br></br>

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
