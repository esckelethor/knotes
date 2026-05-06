//reset ejercicios
reset = function () {
    $v('#note #content-anexo #wrapper-anexos input').nodes.forEach(element => {
        element.checked = false;
        element.disabled = false;
        element.nextElementSibling.classList.remove('success', 'fail');
    });
}
