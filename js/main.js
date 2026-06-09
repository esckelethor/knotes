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

$v('.lang-item').addEvent('click', (pEvent) => {
    gLang = pEvent.currentTarget.id.split('-')[1];
    var vSrcLang = $v('#' + pEvent.currentTarget.id + '>img').attr('src');
    var vTxtLang = $v('#' + pEvent.currentTarget.id + '>div').innerHTML();
    $v('#lang>img').attr('src', vSrcLang);
    $v('#lang>div').innerHTML(vTxtLang);
    loadMenu();
    loadSpotifyLists();
    gSpotifyEmbedController.loadUri(gMenu.spotify[gLang][0].spotifyID);
    $v('#lang-selector').css('visibility', 'hidden');
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
    loadMenu();
    $v().getProjectBuildVersion();
    loadSpotifyLists();

    $v('.sam_taeguk_dj').addClass('rotate');

    window.setInterval(function () {
        $v('.sam_taeguk_dj').removeClass('rotate');
        
        window.setInterval(function (){
            if (!gSpotifyIsPaused) {
                $v('.sam_taeguk_dj').addClass('rotateInfinite');
            } else {
                $v('.sam_taeguk_dj').removeClass('rotateInfinite');
            }
        }, 1000);
    }, 2000);
}();