String.prototype.formatKeyId = function (toId = false) {
    return (toId) ? this.replaceAll(' ', '-') : this.replaceAll('-', ' ');
}
