'use strict';

var fs = require('fs');
var jschardet = require('jschardet');
var iconv = require('iconv-lite');



function toUnicode(s){
  return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function(){
    return '\\u' + RegExp['$1'].charCodeAt(0).toString(16);
  });
}

module.exports = function ( content ) {
  var self = this;
  var filePath = this.resourcePath;
  var filebuffer = fs.readFileSync(filePath);

  var fileEncoding = encoding ?
    encoding :
    jschardet.detect(filebuffer).encoding;

  if( !fileEncoding ) {
    return content;
  }

  if( !iconv.encodingExists(fileEncoding) ) {
    console.log(('[WARN]').yellow, 'file:', filePath, 'encoding is', (fileEncoding).red, 'but iconv-lite not support it!');
  }

  var fileStr = iconv.decode(filebuffer, fileEncoding);

  return toUnicode(fileStr);


};


