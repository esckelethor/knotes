//global vars
gMenu = new Object();
gCurrentMenu = null;
gLang = 'kr';

//define legal menu
gMenu.legal = {
    readme: {id: 'legal-readme', value: 'Sobre K-NOTES ~ K-주석', mdFile: 'README'},
    changelog: {id: 'legal-changelog', value: 'Historial de versiones', mdFile: 'CHANGELOG'},
    license: {id: 'legal-license', value: 'Licencia', mdFile: 'LICENSE'},
    tos: {id: 'legal-tos', value: 'Código de conducta & Terminos de uso', mdFile: 'CODE_OF_CONDUCT'}
}

//menu functionality
clearModals = function() {
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

loadLegalMenu = function () {
    clearContent();
    clearModals();
    $v('.aside').css('display', 'block');
    $v('.aside').innerHTML('');
    $v('#note').innerHTML('');
    //set navbar/content visible
    $v('.aside').css('visibility', 'visible');
    $v('.content').css('visibility', 'hidden');

    for (const [vKey, vValue] of Object.entries(gMenu.legal)) {
        var vAsideMenu = $v().createElement({
            label: 'div',
            id: gMenu.legal[vKey].id,
            classes: ['navbar'],
            innerHTML: gMenu.legal[vKey].value
        });
        $v('.aside').appendChilds(vAsideMenu);

        $v('.aside #' + gMenu.legal[vKey].id).addEvent('click', (pEvent) => {
            //remove selected navbar
            $v('.navbar.selected').removeClass('selected');
            //set selected navbar
            $v('#' + pEvent.currentTarget.id).addClass('selected');
            //close current note
            $v('#note').innerHTML('');
            //load content
            $v('.content').css('visibility', 'visible');
            $v().processMD(gMenu.legal[vKey].mdFile);
        });
    }
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
    $v('.navbar').addEvent('click', (pEvent) => {
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
        if (vIdCollapsedOpen != pEvent.currentTarget.id) {
            $v('#' + pEvent.currentTarget.id).addClass('selected');
            
            //close current note
            $v('#note').innerHTML('');
            $v('.content').css('visibility', 'hidden');
            
            //open subnav
            if ($v('.navbar.selected').hasClass('collapsable')) {
                $v('#' + pEvent.currentTarget.id).attr('data-collapsed', 'false');
                vIcoCollapse = isCollapsed($v('#' + pEvent.currentTarget.id).attr('data-collapsed'));
                $v('#' + pEvent.currentTarget.id + ' .vIcoCollapsed').attr('src', vIcoCollapse);
                $v('#' + pEvent.currentTarget.id + ' .subnav').css('display', 'inherit');
            }

            //load content
            if (!$v('#' + pEvent.currentTarget.id).hasClass('collapsable')) {
                $v('#note').loadContent(pEvent.currentTarget.id);
                $v('.content').css('visibility', 'visible');
            }
        } else {
            //close current note
            $v('#note').innerHTML('');
            $v('.content').css('visibility', 'hidden');
        }
    });
    
    $v('.subnav').addEvent('click', (pEvent) => {
        //remove selected subnav
        $v('.subnav.selected').removeClass('selected');
        //set selected subnav
        $v('#' + pEvent.currentTarget.id).addClass('selected');

        //load content
        clearModals();
        var vModules = $v('#' + pEvent.currentTarget.id).attr('data-modules');
        $v('#note').loadContent(pEvent.currentTarget.id, vModules);
        $v('.content').css('visibility', 'visible');
    
        pEvent.stopPropagation();
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
            vAside[vKey].forEach(pSubnav => {
                var vContentSubnav = $v().createElement({
                    label: 'div',
                    id: vCurrentAside + '-' + pSubnav.id,
                    classes: ['subnav'],
                    attrs: [
                        {attr: 'data-modules', value: (pSubnav.modules == undefined) ? $v().DATA_MODULE_NONE : pSubnav.modules}
                    ],
                    innerHTML: pSubnav.title
                });
                $v('.aside #' + vCurrentAside).appendChilds(vContentSubnav);
            });
        }
    };

    setAsideEvents();
}

setCLickMenu = function() {
    $v('.header li').addEvent('click', (pEvent) => {
        if (gCurrentMenu != pEvent.currentTarget.id) {
            //remove selected menu
            gCurrentMenu = null;
            $v('.header .selected').removeClass('selected');
            
            //set selected menu
            clearModals();
            gCurrentMenu = pEvent.currentTarget.id;
            $v('#' + pEvent.currentTarget.id).addClass('selected');
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
