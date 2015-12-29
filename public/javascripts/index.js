define(function(require) {
    var oRactive = new Ractive({
        el: '#content',
        template: require('/partials/test.html'),
        data: {
            cc: 'love'
        }
    })
    // require('/javascripts/1.js')
    // var $ = require('jquery');
    console.log(request);
    // $.get('/test', function (r){
    //     console.log(r);
    // })
    // request.get('/test').end(function(resp){
    //     console.log('Got post', resp)
    // });
    request('/test').get('body').then(function (r){
        console.log(r);
    })
})
