define(function(require) {
    require('./lib/nav.js')
    var homeRactive = new Ractive({
        el: '.account-home-wrapper',
        template: require('/partials/home.html'),
        data: {
            // avaAmount : avaAmount,
            // cAmount : parseFloat(CC.user.availableAmount).toFixed(2),
            // investInterestAmount : investInterestAmount,
            // totalAmount : totalAmount,
            // cTotalAmount : parseFloat(CC.user.availableAmount + dueInAmount + frozenAmount).toFixed(2),
            // dueInAmount : parseFloat(dueInAmount).toFixed(2),
            // frozenAmount : parseFloat(frozenAmount).toFixed(2),
            // isEnterprise : CC.user.enterprise
        },
    });

    // var investRactive = new Ractive({
    //     el:'.ccc-myinvest-wrap',
    //     template: require('/partials/home/invest.html'),
    //     data:{
    //         // totalSize:0,
    //         // list:[]
    //     }
    //     // onrender: function() {
            
    //     // }
    // });



})
