# branchr-client
The web client for Branchr.

## Prerequisites

This project requires [`node`](https://nodejs.org/) and
[`ruby`](https://www.ruby-lang.org/en/) to be installed on the system.

Ensure you have gulp and bower installed globally:
```npm install -g gulp bower```

Also ensure you have the [ruby sass compiler](http://sass-lang.com/install)
installed (needed for gulp).

## Installation

`npm install`

## Usage

`gulp serve` will automatically install bower dependencies, run the build process, 
and serve the build at `localhost:8000`. If in dev mode (the default), it will also
watch your files for changes.
