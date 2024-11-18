$v('#selector-anexos #anexos li').addEvent('click', (event) => {
    $v('#note #main-content').css('display', 'none');
    $v('#note #selector-anexos').css('display', 'none');
    $v('#note #content-anexo, #note #content-anexo #wrapper-anexos').css('display', 'block');

    $v('#note #content-anexo #wrapper-anexos #content-' + event.currentTarget.id).css('display', 'block');
});

$v('#note #content-anexo #back').addEvent('click', (event) => {
    $v('#note #main-content').css('display', 'block');
    $v('#note #selector-anexos').css('display', 'block');
    $v('#note #content-anexo, #note #content-anexo #wrapper-anexos').css('display', 'none');

    $v('#note #content-anexo #wrapper-anexos div').css('display', 'none');
});