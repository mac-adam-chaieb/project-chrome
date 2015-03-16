# CS 529 Project

Scripts and documentation for the CS 529 project on Google Chrome

## Authors

Saige McVea, McGill ID 260466561

Mohamed Adam Chaieb, McGill ID 260509069

## Setup

To execute the scripts in the `scripts` directory, you need to have at least version `0.12.0` of node.js installed on your local machine. Further information on installing node.js can [be found here](https://nodejs.org/download/).

After cloning the repo to a local directory, simply run:

```
node scripts/getmetrics.js [chromium-source-directory]
```

The script will generate all the metrics of Chromium source code in `chromium-source-directory` required in the specification in JSON format in the `metrics` directory.

## Getting the code

To get the code from the Chromium project, [look here](http://dev.chromium.org/developers/how-tos/get-the-code).