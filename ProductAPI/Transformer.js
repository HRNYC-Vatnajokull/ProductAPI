var stream = require("stream");
var util = require("util");

// node v0.10+ use native Transform, else polyfill
var Transform = stream.Transform;

class Scrubber extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, enc, cb) {
    console.log("chunk", chunk);
    chunk = chunk.toString();
    let upperChunk = chunk.toUpperCase();
    this.push(upperChunk);
    cb();
  }
}

module.exports = Scrubber;
