import React from 'react';
import { render } from 'react-dom';
import TagCloud from 'react-d3-cloud';

const generateCloud = (string) => {
  let arr = string.slice();
  let hash = buildHash(arr);

}

const buildHash = (arr) => {

};


const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
];

const fontSizeMapper = word => Math.log2(word.value) * 5;
const rotate = word => word.value % 360;

render(
  <TagCloud
    data={data}
    fontSizeMapper={fontSizeMapper}
    rotate={rotate}
  />,
  document.getElementById('root')
);
