menu = new Object();
currentMenu = null;

isCollapsed = function (collapsed) {
    return './assets/img/' + ((collapsed == 'true') ? 'r' : 'b') + '_arrow.png';
}

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
            
            //open subnav
            if ($v('.navbar.selected').hasClass('collapsable')) {
                $v('#' + event.currentTarget.id).attr('data-collapsed', 'false');
                icoCollapse = isCollapsed($v('#' + event.currentTarget.id).attr('data-collapsed'));
                $v('#' + event.currentTarget.id + ' .icoCollapsed').attr('src', icoCollapse);
                $v('#' + event.currentTarget.id + ' .subnav').css('display', 'inherit');
            }

            //load content
            if (!$v('#' + event.currentTarget.id).hasClass('collapsable')) {
                $v('#note').loadContent(currentMenu + '.' + event.currentTarget.id.formatKeyId());
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
        $v('#note').loadContent(currentMenu + '.' + event.currentTarget.parentNode.id.formatKeyId() + '.' + event.currentTarget.id);
        $v('.content').css('visibility', 'visible');
    
        event.stopPropagation();
    });
}

loadAside = function () {
    $v('.aside').innerHTML('');
    $v('#note').innerHTML('');

    var aside = menu[currentMenu];

    for(var key in aside) {
        var keyId = key.formatKeyId(true);
        var contentAside = $v().createElement({
            label: 'div',
            id: keyId,
            classes: ['navbar'],
            innerHTML: key
        });
        $v('.aside').appendChilds(contentAside);

        //check subnav
        if (aside[key].length > 0) {
            //add collapse options
            $v('.aside #' + keyId).addClass('collapsable');
            $v('.aside #' + keyId).attr({attr: 'data-collapsed', value: 'true'});

            var collapsableIco = $v().createElement({
                label: 'img',
                classes: ['icoCollapsed'],
                attrs: [{attr: 'src', value: isCollapsed('true')}]
            });
            $v('.aside #' + keyId).appendChilds(collapsableIco);

            //add subnav
            aside[key].forEach(subnav => {
                var contentSubnav = $v().createElement({
                    label: 'div',
                    id: subnav.id,
                    classes: ['subnav'],
                    innerHTML: subnav.title
                });
                $v('.aside #' + keyId).appendChilds(contentSubnav);
            });
        }
    };

    setAsideEvents();
}

$v('.logo').addEvent('click', () => {
    $v('.header .selected').removeClass('selected');
    $v('.aside, .content').css('visibility', 'hidden');
});

$v('.header li').addEvent('click', (event) => {
    if (currentMenu != event.currentTarget.id) {
        //remove selected menu
        currentMenu = null;
        $v('.header .selected').removeClass('selected');
    
        //set selected menu
        currentMenu = event.currentTarget.id;
        $v('#' + event.currentTarget.id).addClass('selected');
        //set navbar/content visible
        $v('.aside').css('visibility', 'visible');
        $v('.content').css('visibility', 'hidden');
        //load aside
        loadAside();
    }
});
