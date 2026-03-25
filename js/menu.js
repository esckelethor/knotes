//global vars
menu = new Object();
currentMenu = null;
lang = 'kr';

clearContent = function() {
    currentMenu = null;
    $v('#changelog').css('visibility', 'hidden');
    $v('.header .selected').removeClass('selected');
    $v('.aside, .content').css('visibility', 'hidden');
    $v('.aside').innerHTML('');
    $v('#note').innerHTML('');
}

loadMenu = function () {
    clearContent();
    $v('.header #menu').innerHTML('');
    
    for(var key in menu[lang].titles) {
        var contentMenu = $v().createElement({
            label: 'li',
            id: menu[lang].titles[key].id,
            innerHTML: menu[lang].titles[key].value
        });
        $v('.header #menu').appendChilds(contentMenu);
    }

    setCLickMenu();
};

setAsideEvents = function () {
    $v('.navbar').addEvent('click', (event) => {
        var idCollapsedOpen = null;

        //remove selected navbar
        if ($v('.navbar.selected').hasClass('collapsable')) {
            //check open navbar id
            idCollapsedOpen = $v('.navbar.selected').attr('id');

            //remove selected subnav
            $v('.subnav.selected').removeClass('selected');
    
            //collapse selected navbar
            $v('.navbar.selected .subnav').css('display', 'none');
            $v('.navbar.selected').attr('data-collapsed', 'true');
            var icoCollapse = isCollapsed($v('.navbar.selected').attr('data-collapsed'));
            $v('.navbar.selected .icoCollapsed').attr('src', icoCollapse);
        }
        $v('.navbar.selected').removeClass('selected');
    
        //set selected navbar
        if (idCollapsedOpen != event.currentTarget.id) {
            $v('#' + event.currentTarget.id).addClass('selected');
            
            //close current note
            $v('#note').innerHTML('');
            $v('.content').css('visibility', 'hidden');
            
            //open subnav
            if ($v('.navbar.selected').hasClass('collapsable')) {
                $v('#' + event.currentTarget.id).attr('data-collapsed', 'false');
                icoCollapse = isCollapsed($v('#' + event.currentTarget.id).attr('data-collapsed'));
                $v('#' + event.currentTarget.id + ' .icoCollapsed').attr('src', icoCollapse);
                $v('#' + event.currentTarget.id + ' .subnav').css('display', 'inherit');
            }

            //load content
            if (!$v('#' + event.currentTarget.id).hasClass('collapsable')) {
                $v('#note').loadContent(event.currentTarget.id);
                $v('.content').css('visibility', 'visible');
            }
        } else {
            //close current note
            $v('#note').innerHTML('');
            $v('.content').css('visibility', 'hidden');
        }
    });
    
    $v('.subnav').addEvent('click', (event) => {
        //remove selected subnav
        $v('.subnav.selected').removeClass('selected');
        //set selected subnav
        $v('#' + event.currentTarget.id).addClass('selected');

        //load content
        var module = $v('#' + event.currentTarget.id).attr('data-module');
        $v('#note').loadContent(event.currentTarget.id, module);
        $v('#changelog').css('visibility', 'hidden');
        $v('.content').css('visibility', 'visible');
    
        event.stopPropagation();
    });
}

loadAside = function () {
    $v('.aside').innerHTML('');
    $v('#note').innerHTML('');
    var aside = menu[lang][currentMenu.split('-')[1]];

    for(var key in aside) {
        var currentAside = currentMenu + '-' + key;
        var contentAside = $v().createElement({
            label: 'div',
            id: currentAside,
            classes: ['navbar'],
            innerHTML: key.replaceAll('_', ' ')
        });
        $v('.aside').appendChilds(contentAside);

        //check subnav
        if (aside[key].length > 0) {
            //add collapse options
            $v('.aside #' + currentAside).addClass('collapsable');
            $v('.aside #' + currentAside).attr({attr: 'data-collapsed', value: 'true'});

            var collapsableIco = $v().createElement({
                label: 'img',
                classes: ['icoCollapsed'],
                attrs: [{attr: 'src', value: isCollapsed('true')}]
            });
            $v('.aside #' + currentAside).appendChilds(collapsableIco);

            //add subnav
            aside[key].forEach(subnav => {
                var contentSubnav = $v().createElement({
                    label: 'div',
                    id: currentAside + '-' + subnav.id,
                    classes: ['subnav'],
                    attrs: [
                        {attr: 'data-module', value: (subnav.module == undefined) ? DATA_MODULE_NONE : subnav.module}
                    ],
                    innerHTML: subnav.title
                });
                $v('.aside #' + currentAside).appendChilds(contentSubnav);
            });
        }
    };

    setAsideEvents();
}

setCLickMenu = function() {
    $v('.header li').addEvent('click', (event) => {
        if (currentMenu != event.currentTarget.id) {
            //remove selected menu
            currentMenu = null;
            $v('.header .selected').removeClass('selected');
            
            //set selected menu
            currentMenu = event.currentTarget.id;
            $v('#' + event.currentTarget.id).addClass('selected');
            //set navbar/content visible
            $v('#changelog').css('visibility', 'hidden');
            $v('.aside').css('visibility', 'visible');
            $v('.content').css('visibility', 'hidden');
            //load aside
            loadAside();
        }
    });
}

$v('.logo').addEvent('click', () => {
    clearContent();
});