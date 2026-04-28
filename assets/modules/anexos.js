//mostrar anexo
clickAnexo = function () {
    $v('#note #selector-anexos #anexos li').addEvent('click', (pEvent) => {
        $v('.aside').css('display', 'none');
        $v('#note').loadContent($v('.subnav.selected').nodes[0].id + '-' + pEvent.currentTarget.id, () => {
            $v('#note').nodes[0].scrollTop = 0;
            clickBack();
        
            if($v('#note #content-anexo #wrapper-anexos div[data-ejercicio]').length > 0) {
                checkInput();
            }
        });
    });
}

//volver content
clickBack = function () {
    $v('#note #content-anexo #back').addEvent('click', (pEvent) => {
        $v('.aside').css('display', 'block');
        $v('#note').loadContent($v('.subnav.selected').nodes[0].id, clickAnexo);
        $v('#note').nodes[0].scrollTop = 0;
    });
}

//parte de ejercicios
checkInput = function () {
    $v('#note #content-anexo #wrapper-anexos input').addEvent('click', (pEvent) => {
        var currentParentId = pEvent.currentTarget.parentNode.parentNode.id;
        
        if($v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input:checked').attr('data-correcto') === "true") {
            $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input:checked+span').addClass('success');
        } else {
            $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input:checked+span').addClass('fail');
            $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input[data-correcto=true]+span').addClass('success');
        }
        $v('#note #content-anexo #wrapper-anexos #' + currentParentId + ' input').attr('disabled', 'disabled');
    });
}

clickAnexo();