//constans
const VERSION = changelog[0].version;
//global vars
gCurrentSpotifyPlaylist = null;
gSpotifyIsPaused = true;
gSpotifyEmbedController = null;

isCollapsed = function (collapsed) {
    return './assets/img/icon/' + ((collapsed == 'true') ? 'r' : 'b') + '_arrow.png';
}

checkVisibility = function(selector) {
    var vVisibility = $v(selector).css('visibility');
    vVisibility = (vVisibility == '') ? 'hidden' : vVisibility;
    $v(selector).css('visibility', (vVisibility == 'hidden') ? 'visible' : 'hidden');
}

$v('.logo2').addEvent('click', () => {
    //auto play on first visibility change
    if (gCurrentSpotifyPlaylist == null) {
        gSpotifyEmbedController.play();
        gCurrentSpotifyPlaylist = $v('#spotify .container .item.selected').attr('id');
    }

    checkVisibility('#spotify');
});

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const vElement = document.getElementById('playlist');
    const vOptions = {
        width: '100%',
        height: '160',
        uri: 'spotify:playlist:37i9dQZF1DXdR77H5Z8MIM',
        theme: 'dark'
    };
    const callback = (EmbedController) => {
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
    IFrameAPI.createController(vElement, vOptions, callback);
};

changelogLoader = function () {
    //set event show changelog
    $v('#version').addEvent('click', (event) => {
        //prevent open changelog if full changelog visible
        if ($v('#note #changelogContents').length == 0) {
            checkVisibility('#changelog');
        }
    });

    //display version
    $v('#version').attr('data-version', VERSION).innerHTML(VERSION);

    //create changelog tree
    changelog.forEach((version, index) => {
        var vVersionNode = $v().createElement({
            label: 'div'
        });

        var vVersionNumberNode = $v().createElement({
            label: 'h4',
            classes: ['version'],
            attrs: [
                {attr: 'data-version', value: version.version}
            ],
            innerHTML: version.version
        });

        if (index == 0) version.tags.push('new');
        version.tags.forEach(tag => {
            var vTagNode = $v().createElement({
                label: 'code',
                classes: [(tag == 'content') ? 'texts' : tag],
                innerHTML: tag
            });

            vVersionNumberNode.appendChild(vTagNode);
        });
        
        vVersionNode.appendChild(vVersionNumberNode);

        var vVersionChangesNode = $v().createElement({
            label: 'ul',
            classes: ['changes']
        });

        version.changes.forEach(change => {
            var vVersionChangeItem = $v().createElement({
                label: 'li',
                innerHTML: change
            });

            vVersionChangesNode.appendChild(vVersionChangeItem);
        });
        
        vVersionNode.appendChild(vVersionChangesNode);

        $v('#changelogContents #changelog-' + ((index == 0) ? 'currentVersion' : 'oldVersions')).appendChilds(vVersionNode);

        //add event full-changelog
        $v('#changelog #full-changelog').addEvent('click', (event) => {
            $v('.aside').css('display', 'none');
            $v('#changelog').css('visibility', 'hidden');
            
            var vTagLogo = $v().createElement({
                label: 'img',
                attrs: [{attr: 'src', value: './assets/img/basic/logo.png'}]
            });

            var vTagImgContainer = $v().createElement({
                label: 'div',
                classes: ['imgContainer'],
            });
            vTagImgContainer.appendChild(vTagLogo);

            var vUpdatedChangelog = $v('#changelog').innerHTML();
            $v('#note').innerHTML(vUpdatedChangelog);
            $v('#note #full-changelog').css('display', 'none');
            $v('#note #changelog-oldVersions').css('display', 'initial');
            $v('#note').css('visibility', 'visible');

            $v('.aside').innerHTML('');
            $v('.aside').appendChilds(vTagImgContainer);
            $v('.aside').css('visibility', 'visible');

            $v('#changelog').nodes[0].scrollTop = 0;
            $v('#note').nodes[0].scrollTop = 0;

            //prevent locked menu
            gCurrentMenu = null;
            $v('.header .selected').removeClass('selected');
        });
    });

    //create known issues tree
    var vKnownIssuesNode = $v().createElement({
        label: 'ul',
        classes: ['issues']
    });

    /* //PENDIENTE CAMBIO
    knownIssues.forEach(issue => {
        var vIssueNode = $v().createElement({
            label: 'li',
            innerHTML: issue.detail
        });
        
        var vIssueWorkaroundNode = $v().createElement({
            label: 'div',
            classes: ['issueWorkaround'],
            innerHTML: ' ' + issue.workaround
        });

        var vWorkaroundTitleNode = $v().createElement({
            label: 'u',
            innerHTML: 'Workaround:'
        });

        issueWorkaroundNode.prepend(vWorkaroundTitleNode);
        issueNode.appendChild(vIssueWorkaroundNode);
        knownIssuesNode.appendChild(vIssueNode);
    });
    */
    
    $v('#changelog #knownIssuesContent').appendChilds(vKnownIssuesNode);
    //TODO: remove after upgrade changelog module
    $v('#changelog #changelog-knowIssues').css('display', 'none');
}

$v('#lang').addEvent('click', (event) => {
    checkVisibility('#lang-selector');
});

$v('.lang-item').addEvent('click', (event) => {
    gLang = event.currentTarget.id.split('-')[1];
    var vSrcLang = $v('#' + event.currentTarget.id + '>img').attr('src');
    var vTxtLang = $v('#' + event.currentTarget.id + '>div').innerHTML();
    $v('#lang>img').attr('src', vSrcLang);
    $v('#lang>div').innerHTML(vTxtLang);
    loadMenu();
    $v('#lang-selector').css('visibility', 'hidden');
});

window.onload = function () {
    loadMenu();
    changelogLoader();

    $v('.logo2').addClass('rotate');

    window.setInterval(function () {
        $v('.logo2').removeClass('rotate');
        
        window.setInterval(function (){
            if (!gSpotifyIsPaused) {
                $v('.logo2').addClass('rotateInfinite');
            } else {
                $v('.logo2').removeClass('rotateInfinite');
            }
        }, 1000);
    }, 2000);
}();