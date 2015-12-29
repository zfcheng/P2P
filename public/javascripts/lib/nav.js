define(function (require){
    var navRactive = new Ractive({
        el: '.account-nav',
        template: require('/partials/nav.html'),
        data: {
            showInvestToggleMenu : false,
            showAccountToggleMenu : false,
            showFundToggleMenu:false,
            // isEnterprise: CC.user.enterprise
        },
        oninit: function () {
            var location = window.location.pathname.split('/');

            if (location.length <= 3) {
                var tab = location[location.length-1];
                console.log(tab);
                this.set(tab, true);
            } else {
                var tab = location[location.length -2];
                console.log(tab);
                var menu = location[location.length -1];
                this.set(tab, true);
                this.set(menu, true);
                if (tab === 'invest') {
                    this.set('showInvestToggleMenu', true);
                } else if (tab === 'loanRequest') {
                    this.set('showLoanToggleMenu', true);
                }else if (tab === 'fund') {
                    this.set('showFundToggleMenu', true);
                }
                else {
                    this.set('showAccountToggleMenu', true);
                }
            }
        }   
    });
    navRactive.on('toggleMenu', function (event) {
        var toggleMenu = event.node.getAttribute('data-toggle');
        this.set(toggleMenu, !this.get(toggleMenu));
    });
})