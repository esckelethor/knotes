//constans
const VERSION = changelog[0].version;
//global vars
menu = new Object();
currentMenu = null;
currentSpotifyPlaylist = null;
spotifyIsPaused = true;
spotifyEmbedController = null;

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

    var aside = menu[currentMenu];

    for(var key in aside) {
        var currentAside = currentMenu + '-' + key;
        var contentAside = $v().createElement({
            label: 'div',
            id: currentAside,
            classes: ['navbar'],
            innerHTML: key.formatKeyToText()
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
                        {attr: 'data-module', value: (subnav.module == undefined) ? 'none' : subnav.module}
                    ],
                    innerHTML: subnav.title
                });
                $v('.aside #' + currentAside).appendChilds(contentSubnav);
            });
        }
    };

    setAsideEvents();
}

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

$v('.logo').addEvent('click', () => {
    currentMenu = null;
    $v('#changelog').css('visibility', 'hidden');
    $v('.header .selected').removeClass('selected');
    $v('.aside, .content').css('visibility', 'hidden');
});

$v('.logo2').addEvent('click', () => {
    //auto play on first visibility change
    if (currentSpotifyPlaylist == null) {
        spotifyEmbedController.play();
        currentSpotifyPlaylist = $v('#spotify .container .item.selected').attr('id');
    }

    var visibility = $v('#spotify').css('visibility');
    visibility = (visibility == '') ? 'hidden' : visibility;
    $v('#spotify').css('visibility', (visibility == 'hidden') ? 'visible' : 'hidden');
});

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('playlist');
    const options = {
        width: '100%',
        height: '160',
        uri: 'spotify:playlist:37i9dQZF1DXdR77H5Z8MIM',
        theme: 'dark'
    };
    const callback = (EmbedController) => {
        spotifyEmbedController = EmbedController;

        $v('#spotify .container .item').addEvent('click', function (event) {
            if (currentSpotifyPlaylist != event.currentTarget.id) {
                //remove selected playlist
                currentSpotifyPlaylist = null;
                $v('#spotify .container .item.selected').removeClass('selected');
                
                //set selected playlist
                currentSpotifyPlaylist = event.currentTarget.id;
                $v('#' + event.currentTarget.id).addClass('selected');

                EmbedController.loadUri($v('#' + event.currentTarget.id).attr('data-spotify-id'));
                EmbedController.play();
            }
        });

        EmbedController.addListener('playback_update', (event) => {
            spotifyIsPaused = event.data.isPaused;
        });
    };
    IFrameAPI.createController(element, options, callback);
};

changelogLoader = function () {
    //set event show changelog
    $v('#version').addEvent('click', (event) => {
        var visibility = $v('#changelog').css('visibility');
        visibility = (visibility == '') ? 'hidden' : visibility;

        //prevent open changelog if full changelog visible
        if ($v('#note #changelogContents').length == 0) {
            $v('#changelog').css('visibility', (visibility == 'hidden') ? 'visible' : 'hidden');
        }
    });

    //display version
    $v('#version').attr('data-version', VERSION).innerHTML(VERSION);

    //create changelog tree
    changelog.forEach((version, index) => {
        var versionNode = $v().createElement({
            label: 'div'
        });

        var versionNumberNode = $v().createElement({
            label: 'h4',
            classes: ['version'],
            attrs: [
                {attr: 'data-version', value: version.version}
            ],
            innerHTML: version.version
        });

        if (index == 0) version.tags.push('new');
        version.tags.forEach(tag => {
            var tagNode = $v().createElement({
                label: 'code',
                classes: [(tag == 'content') ? 'texts' : tag],
                innerHTML: tag
            });

            versionNumberNode.appendChild(tagNode);
        });
        
        versionNode.appendChild(versionNumberNode);

        var versionChangesNode = $v().createElement({
            label: 'ul',
            classes: ['changes']
        });

        version.changes.forEach(change => {
            var versionChangeItem = $v().createElement({
                label: 'li',
                innerHTML: change
            });

            versionChangesNode.appendChild(versionChangeItem);
        });
        
        versionNode.appendChild(versionChangesNode);

        $v('#changelogContents #changelog-' + ((index == 0) ? 'currentVersion' : 'oldVersions')).appendChilds(versionNode);

        //add event full-changelog
        $v('#changelog #full-changelog').addEvent('click', (event) => {
            $v('#changelog').css('visibility', 'hidden');
            
            var tagLogo = $v().createElement({
                label: 'img',
                attrs: [{attr: 'src', value: './assets/img/logo.png'}]
            });

            var tagImgContainer = $v().createElement({
                label: 'div',
                classes: ['imgContainer'],
            });
            tagImgContainer.appendChild(tagLogo);

            var updatedChangelog = $v('#changelog').innerHTML();
            $v('#note').innerHTML(updatedChangelog);
            $v('#note #full-changelog').css('display', 'none');
            $v('#note #changelog-oldVersions').css('display', 'initial');
            $v('#note').css('visibility', 'visible');

            $v('.aside').innerHTML('');
            $v('.aside').appendChilds(tagImgContainer);
            $v('.aside').css('visibility', 'visible');

            $v('#changelog').nodes[0].scrollTop = 0;
            $v('#note').nodes[0].scrollTop = 0;

            //prevent locked menu
            currentMenu = null;
            $v('.header .selected').removeClass('selected');
        });
    });
}

window.onload = function () {
    changelogLoader();

    $v('.logo2').addClass('rotate');

    window.setInterval(function () {
        $v('.logo2').removeClass('rotate');
        
        window.setInterval(function (){
            if (!spotifyIsPaused) {
                $v('.logo2').addClass('rotateInfinite');
            } else {
                $v('.logo2').removeClass('rotateInfinite');
            }
        }, 1000);
    }, 2000);
}();