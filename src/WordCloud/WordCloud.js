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
  { value: 'Least Frequent', label: 'Least Frequent' },
  { value: 'Shuffle Position', label: 'Shuffle Position'}
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
      pattern: 'Most Frequent'
    };
    this.handleTextsSubmit = this.handleTextsSubmit.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    this.handleFontSizeOptions = this.handleFontSizeOptions.bind(this);
    this.handleRotateOptions = this.handleRotateOptions.bind(this);
    this.handlePatternOptions = this.handlePatternOptions.bind(this);
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
    console.log(pattern)
    let data = this.state.data;
    for (let i = 0; i < data.length; i++){
      if (pattern.value === 'Most Frequent'){
        
        data[i]['value'] = Math.abs(data[i]['value']);
      } else if (pattern.value === 'Least Frequent'){
        data[i]['value'] = data[i]['value'] > 0 ? 1000 - data[i]['value'] : data[i]['value'];
      }
    }
    console.log(data.length)
    console.log(data[0]["value"]);

    this.setState({data: data});
  }







  fontSizeMapper(word) {
    return word.value * this.state.fontSize;
  }

  rotate(word){
    return this.state.rotate;
  }





  handleTextsSubmit = (e) => {
    e.preventDefault();
    let texts = this.cleanTexts(this.state.textarea.text);
    let tags = this.generateTags(texts);
    let newState = { textarea: {text: "please select animation", disabled: true},
                     data: tags
                   };
    this.setState(newState);
  }

  handleStartOver = (e) => {
    e.preventDefault;
    let newState = { textarea: {text: "",disabled: false},
                     data: [],
                     fontSize: 10
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

  updateTextsField() {
    return e => {
      this.setState({ textarea: {text: e.target.value} });
    }
  }


  render(){
    const { fontSize } = this.state.fontSize;
    const { rotate } = this.state.rotate;
    const { pattern } = this.state.pattern;


    return (
      <div>
        <Select
          value={fontSize}
          onChange={this.handleFontSizeOptions}
          options={fontSizeOptions}
        />
        <Select
          value={rotate}
          onChange={this.handleRotateOptions}
          options={rotateOptions}
        />
        <Select
          value={pattern}
          onChange={this.handlePatternOptions}
          options={pattenOptions}
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
            onClick={this.handleShuffel}>
            Shuffle
          </button>

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
