//mostrar anexo
$v('#selector-anexos #anexos li').addEvent('click', (event) => {
    $v('#note #main-content').css('display', 'none');
    $v('#note #selector-anexos').css('display', 'none');
    $v('#note #content-anexo, #note #content-anexo #wrapper-anexos').css('display', 'block');

    $v('#note #content-anexo #wrapper-anexos #content-' + event.currentTarget.id).css('display', 'block');

    $v('#note').nodes[0].scrollTop = 0;
});

//volver content
$v('#note #content-anexo #back').addEvent('click', (event) => {
    $v('#note #main-content').css('display', 'block');
    $v('#note #selector-anexos').css('display', 'block');
    $v('#note #content-anexo, #note #content-anexo #wrapper-anexos').css('display', 'none');

    $v('#note #content-anexo #wrapper-anexos div:not([data-ejercicio])').css('display', 'none');
    //reset ejercicios
    if($v('#note #content-anexo #wrapper-anexos div[data-ejercicio]').length > 0) {
        $v('#note #content-anexo #wrapper-anexos input').nodes.forEach(element => {
            element.checked = false;
            element.disabled = false;
            element.nextElementSibling.classList.remove('success', 'fail');
        });
    }

    $v('#note').nodes[0].scrollTop = 0;
});

//parte de ejercicios
$v('#note #content-anexo #wrapper-anexos input').addEvent('click', (event) => {
    var currentParentId = event.currentTarget.parentNode.parentNode.id;
    
    if($v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input:checked').attr('data-correcto') === "true") {
        $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input:checked+span').addClass('success');
    } else {
        $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input:checked+span').addClass('fail');
        $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input[data-correcto=true]+span').addClass('success');
    }
    $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input').attr('disabled', 'disabled');
});