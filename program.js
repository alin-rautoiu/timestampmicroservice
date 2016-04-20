var express = require('express');
var url = require('url');
var chrono = require('chrono-node');
var moment = require('moment');

var app = express();

app.get('/*', function (req, res) {
  var input = decodeURIComponent(url.parse(req.url).pathname).replace('/', '');
  var output = { "unix": null, "natural": null };
  var natDate = chrono.parse(input);
  if (natDate.length != 0) {
      var year =  natDate[0].start.impliedValues.year ?  natDate[0].start.impliedValues.year :  natDate[0].start.knownValues.year;
      var month =  natDate[0].start.impliedValues.month ?  natDate[0].start.impliedValues.month :  natDate[0].start.knownValues.month;
      var day =  natDate[0].start.impliedValues.day ?  natDate[0].start.impliedValues.day :  natDate[0].start.knownValues.day;
      var momentDate = moment(year + '-' + month + '-' + day);

      output.natural = momentDate.format('MMMM DD, YYYY');
      output.unix = momentDate.unix();
  } else {
      if (moment(parseInt(input) * 1000).isValid()) {
          var momentDate = moment(parseInt(input) * 1000);
          output.natural = momentDate.format('MMMM DD, YYYY');
          output.unix = momentDate.unix();
      }
  }
    res.send(output);
});

app.listen(process.env.PORT || 3002);