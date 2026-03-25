//constans
const VERSION = changelog[0].version;
//global vars
currentSpotifyPlaylist = null;
spotifyIsPaused = true;
spotifyEmbedController = null;

isCollapsed = function (collapsed) {
    return './assets/img/icon/' + ((collapsed == 'true') ? 'r' : 'b') + '_arrow.png';
}

checkVisibility = function(selector) {
    var visibility = $v(selector).css('visibility');
    visibility = (visibility == '') ? 'hidden' : visibility;
    $v(selector).css('visibility', (visibility == 'hidden') ? 'visible' : 'hidden');
}

$v('.logo2').addEvent('click', () => {
    //auto play on first visibility change
    if (currentSpotifyPlaylist == null) {
        spotifyEmbedController.play();
        currentSpotifyPlaylist = $v('#spotify .container .item.selected').attr('id');
    }

    checkVisibility('#spotify');
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
                attrs: [{attr: 'src', value: './assets/img/basic/logo.png'}]
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

    //create known issues tree
    var knownIssuesNode = $v().createElement({
        label: 'ul',
        classes: ['issues']
    });

    knownIssues.forEach(issue => {
        var issueNode = $v().createElement({
            label: 'li',
            innerHTML: issue.detail
        });
        
        var issueWorkaroundNode = $v().createElement({
            label: 'div',
            classes: ['issueWorkaround'],
            innerHTML: ' ' + issue.workaround
        });

        var workaroundTitleNode = $v().createElement({
            label: 'u',
            innerHTML: 'Workaround:'
        });

        issueWorkaroundNode.prepend(workaroundTitleNode);
        issueNode.appendChild(issueWorkaroundNode);
        knownIssuesNode.appendChild(issueNode);
    });

    $v('#changelog #knownIssuesContent').appendChilds(knownIssuesNode);
}

$v('#lang').addEvent('click', (event) => {
    checkVisibility('#lang-selector');
});

$v('.lang-item').addEvent('click', (event) => {
    lang = event.currentTarget.id.split('-')[1];
    var srcLang = $v('#' + event.currentTarget.id + '>img').attr('src');
    var txtLang = $v('#' + event.currentTarget.id + '>div').innerHTML();
    $v('#lang>img').attr('src', srcLang);
    $v('#lang>div').innerHTML(txtLang);
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
            if (!spotifyIsPaused) {
                $v('.logo2').addClass('rotateInfinite');
            } else {
                $v('.logo2').removeClass('rotateInfinite');
            }
        }, 1000);
    }, 2000);
}();