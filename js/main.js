//global vars
gCurrentSpotifyPlaylist = null;
gSpotifyIsPaused = true;
gSpotifyEmbedController = null;

isCollapsed = function (pCollapsed) {
    return './assets/img/icon/' + ((pCollapsed == 'true') ? 'r' : 'b') + '_arrow.png';
}

checkVisibility = function(pSelector) {
    var vVisibility = $v(pSelector).css('visibility');
    vVisibility = (vVisibility == '') ? 'hidden' : vVisibility;
    $v(pSelector).css('visibility', (vVisibility == 'hidden') ? 'visible' : 'hidden');
}

loadLangMenu = function () {
   Object.entries(gMenu).forEach(([pKey, pValue]) => {
        //if not lang menu skip
        if (pKey.length != 2) return;

        //create lang main div
        var vLangCssClasses = ['lang-item'];
        if (Object.entries(pValue).length == 0) vLangCssClasses.push('lang-disabled');
        if (pKey == gLang) vLangCssClasses.push('lang-selected');

        var vLangMainElement = $v().createElement({
            label: 'div',
            id: 'lang-' + pKey,
            classes: vLangCssClasses
        });
        
        //create lang img
        var vLangImgElement = $v().createElement({
            label: 'img',
            attrs: [{attr: 'src', value: '../assets/img/flags/' + pKey + '.png'}, {attr: 'alt', value: 'lang-' + pKey}]
        });
        
        //create lang title
        var vLangTitleElement = $v().createElement({
            label: 'div',
            innerHTML: pKey.toUpperCase()
        });
        
        //append to lang menu
        $v('#lang-selector').appendChilds(vLangMainElement);
        $v('#lang-selector div:last-child').appendChilds([vLangImgElement, vLangTitleElement]);
    });

    //add click events
    $v('.lang-item').addEvent('click', (pEvent) => {
        //change selected lang
        $v('#lang-selector .lang-selected').removeClass('lang-selected');
        $v('#' + pEvent.currentTarget.id).addClass('lang-selected');
        
        //update current lang on footer
        gLang = pEvent.currentTarget.id.split('-')[1];
        var vSrcLang = $v('#' + pEvent.currentTarget.id + '>img').attr('src');
        var vTxtLang = $v('#' + pEvent.currentTarget.id + '>div').innerHTML();
        $v('#lang>img').attr('src', vSrcLang);
        $v('#lang>div').innerHTML(vTxtLang);
        
        //reload menus & spotify playlists
        loadMenu();
        loadSpotifyLists();
        gSpotifyEmbedController.loadUri(gMenu.spotify[gLang][0].spotifyID);
        $v('#lang-selector').css('visibility', 'hidden');
    });
}

$v('.sam_taeguk_dj').addEvent('click', () => {
    //auto play on first visibility change
    if (gCurrentSpotifyPlaylist == null) {
        gSpotifyEmbedController.play();
        gCurrentSpotifyPlaylist = $v('#spotify .container .item.selected').attr('id');
    }

    checkVisibility('#spotify');
});

$v('#version').addEvent('click', (pEvent) => {
    loadLegalMenu();
    $v('.aside #legal-changelog').triggerEvent('click');
});

$v('#lang').addEvent('click', (pEvent) => {
    checkVisibility('#lang-selector');
});

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    var vElement = document.getElementById('playlist');
    var vOptions = {
        width: '100%',
        height: '160',
        uri: gMenu.spotify[gLang][0].spotifyID,
        theme: 'dark'
    };
    var vCallback = (EmbedController) => {
        gSpotifyEmbedController = EmbedController;

        $v('#spotify .container .item').addEvent('click', function (event) {
            if (gCurrentSpotifyPlaylist != event.currentTarget.id) {
                //remove selected playlist
                gCurrentSpotifyPlaylist = null;
                $v('#spotify .container .item.selected').removeClass('selected');
                
                //set selected playlist
                gCurrentSpotifyPlaylist = event.currentTarget.id;
                $v('#' + event.currentTarget.id).addClass('selected');

                EmbedController.loadUri($v('#' + event.currentTarget.id).attr('data-spotify-id'));
                EmbedController.play();
            }
        });

        EmbedController.addListener('playback_update', (event) => {
            gSpotifyIsPaused = event.data.isPaused;
        });
    };

    IFrameAPI.createController(vElement, vOptions, vCallback);
};

window.onload = function () {
    loadLangMenu();
    loadMenu();
    $v().getProjectBuildVersion();
    loadSpotifyLists();
}();