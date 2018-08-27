# TagCloud
Generate TagClouds from input, with the bigger text represent frequency or significance of the word.

![TagCloud1]()

## Live
[http://www.datatagcloud.com/](http://www.datatagcloud.com/)

## Repo
[https://github.com/klhang/wordCloud/](https://github.com/klhang/wordCloud/)

## Usage
```sh
npm install

npm run build

npm start
```

## Features
1. User can submit texts and generate tag clouds
2. User can also see the effect of animation for the cloud by clicking demo
3. Animation options include:
* change of font size: 10px, 15px, 20px
* rotation of the cloud: -45°, -30°, 0°, 30°, 45°
* pattern by frequency: most frequent, least frequent
* shuffle positions of words in the cloud
4. Validation for input is implemented to check if there is enough unique words provided, restrictions include:
* the amount of unique words is between 20 - 120
* numbers and punctuations are not consider valid
* single letter is not considered valid
* empty space is not considered valid
5. Algorithm to auto select initial font size for cloud generation based on unique word count of the input
* auto select font size of 10px if word count > 100
* auto select font size of 20px if word count < 40
6. Project is deployed to AWS ec2 instance with a unique domaine for public access
7. Project repo is open to public with concise installation info and detail code comments

![TagCloud2]()

## Stacks
1. react
2. d3-cloud
3. react-d3-cloud
4. react-select
5. JavaScript

## Future Features
1. Download tag cloud as svg
2. Upload photo to be the appearence pattern of the tag cloud
3. Social media sharing of the tag cloud
4. More animation options
