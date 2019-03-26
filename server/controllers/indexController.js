const axios = require('axios');

exports.canned_response = function(req, res, next) {
    res.send({text: 'This is a canned response'});
};

exports.url_only_search = function(req, res, next) {
    axios.request({
      url: process.env.HYPOTHESIS_SEARCH_URL,
      params: {
           url: req.query.queriedURL,
           password: process.env.API_KEY,
           limit: 200},
        method: 'get',
    }).then((axios_res) => {
        res.send(axios_res.data.rows);
    }).catch((error) => {
        console.log('error', error);
    });
};
