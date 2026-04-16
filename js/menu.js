//global vars
gMenu = new Object();
gCurrentMenu = null;
gLang = 'kr';

clearModals = function() {
    $v('#changelog').css('visibility', 'hidden');
    $v('#lang-selector').css('visibility', 'hidden');
}

clearContent = function() {
    gCurrentMenu = null;
    $v('.header .selected').removeClass('selected');
    $v('.aside').css('display', 'block');
    $v('.aside, .content').css('visibility', 'hidden');
    $v('.aside').innerHTML('');
    $v('#note').innerHTML('');
}

loadMenu = function () {
    clearContent();
    $v('.header #menu').innerHTML('');
    
    for(var vKey in gMenu[gLang].titles) {
        var vContentMenu = $v().createElement({
            label: 'li',
            id: gMenu[gLang].titles[vKey].id,
            innerHTML: gMenu[gLang].titles[vKey].value
        });
        $v('.header #menu').appendChilds(vContentMenu);
    }

    setCLickMenu();
};

setAsideEvents = function () {
    $v('.navbar').addEvent('click', (event) => {
        var vIdCollapsedOpen = null;

        //remove selected navbar
        if ($v('.navbar.selected').hasClass('collapsable')) {
            //check open navbar id
            vIdCollapsedOpen = $v('.navbar.selected').attr('id');

            //remove selected subnav
            $v('.subnav.selected').removeClass('selected');
    
            //collapse selected navbar
            $v('.navbar.selected .subnav').css('display', 'none');
            $v('.navbar.selected').attr('data-collapsed', 'true');
            var vIcoCollapse = isCollapsed($v('.navbar.selected').attr('data-collapsed'));
            $v('.navbar.selected .icoCollapsed').attr('src', vIcoCollapse);
        }
        $v('.navbar.selected').removeClass('selected');
    
        //set selected navbar
        if (vIdCollapsedOpen != event.currentTarget.id) {
            $v('#' + event.currentTarget.id).addClass('selected');
            
            //close current note
            $v('#note').innerHTML('');
            $v('.content').css('visibility', 'hidden');
            
            //open subnav
            if ($v('.navbar.selected').hasClass('collapsable')) {
                $v('#' + event.currentTarget.id).attr('data-collapsed', 'false');
                vIcoCollapse = isCollapsed($v('#' + event.currentTarget.id).attr('data-collapsed'));
                $v('#' + event.currentTarget.id + ' .vIcoCollapsed').attr('src', vIcoCollapse);
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
        clearModals();
        var vModule = $v('#' + event.currentTarget.id).attr('data-module');
        $v('#note').loadContent(event.currentTarget.id, vModule);
        $v('.content').css('visibility', 'visible');
    
        event.stopPropagation();
    });
}

loadAside = function () {
    $v('.aside').css('display', 'block');
    $v('.aside').innerHTML('');
    $v('#note').innerHTML('');
    var vAside = gMenu[gLang][gCurrentMenu.split('-')[1]];

    for(var vKey in vAside) {
        var vCurrentAside = gCurrentMenu + '-' + vKey;
        var vContentAside = $v().createElement({
            label: 'div',
            id: vCurrentAside,
            classes: ['navbar'],
            innerHTML: vKey.replaceAll('_', ' ')
        });
        $v('.aside').appendChilds(vContentAside);

        //check subnav
        if (vAside[vKey].length > 0) {
            //add collapse options
            $v('.aside #' + vCurrentAside).addClass('collapsable');
            $v('.aside #' + vCurrentAside).attr({attr: 'data-collapsed', value: 'true'});

            var vCollapsableIco = $v().createElement({
                label: 'img',
                classes: ['icoCollapsed'],
                attrs: [{attr: 'src', value: isCollapsed('true')}]
            });
            $v('.aside #' + vCurrentAside).appendChilds(vCollapsableIco);

            //add subnav
            vAside[vKey].forEach(subnav => {
                var vContentSubnav = $v().createElement({
                    label: 'div',
                    id: vCurrentAside + '-' + subnav.id,
                    classes: ['subnav'],
                    attrs: [
                        {attr: 'data-module', value: (subnav.module == undefined) ? $v().DATA_MODULE_NONE : subnav.module}
                    ],
                    innerHTML: subnav.title
                });
                $v('.aside #' + vCurrentAside).appendChilds(vContentSubnav);
            });
        }
    };

    setAsideEvents();
}

setCLickMenu = function() {
    $v('.header li').addEvent('click', (event) => {
        if (gCurrentMenu != event.currentTarget.id) {
            //remove selected menu
            gCurrentMenu = null;
            $v('.header .selected').removeClass('selected');
            
            //set selected menu
            clearModals();
            gCurrentMenu = event.currentTarget.id;
            $v('#' + event.currentTarget.id).addClass('selected');
            //set navbar/content visible
            $v('.aside').css('visibility', 'visible');
            $v('.content').css('visibility', 'hidden');
            //load aside
            loadAside();
        }
    });
}

$v('.logo').addEvent('click', () => {
    clearContent();
    clearModals();
});