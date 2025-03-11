// vanilla JS framework based on JQuery
//vQuery global object initiator
vQuery = function (selector) {
	let vq = new _vQuery(selector);
	_vQuery.prototype.vQuery = '1.0.1';
	_vQuery.prototype.nodes = vq[0];
	_vQuery.prototype.length = (vq[0] != undefined) ? vq[0].length : 0 ;
	return vq;
}
$v = vQuery;

//vQuery constructor
_vQuery = function (selector) {
	let nodes = document.querySelectorAll(selector);
	if (nodes.length > 0) {
		nodes = [].slice.call(nodes);
		this[0] = nodes;
	}
	return this;
}

//vQuery utils, can be used with a blank selector
_vQuery.prototype.getValueOrDefault = function (value, defaultValue) {
	return (value != undefined && value != null) ? value : defaultValue;
}

_vQuery.prototype.loadContent = function (asset, module) {
	this.innerHTML('');

	asset = asset.replaceAll('-', '/');
	this.ajax({
		method: 'GET',
		url: './assets/content/' + asset + '.html'
	}).then((data) => {
		this.innerHTML(data);

		if (module != 'none') {
			//load module_anexos
			var script = this.createElement({
				label: 'script',
				attrs: [
					{attr: 'type', value: 'text/javascript'},
					{attr: 'src', value: './assets/modules/' + module + '.js'}
				]
			});
			this.appendChilds(script);
		}
	}).catch((data) => {
		console.log(data.message);
	});
}

_vQuery.prototype.ajax = function (data) {
	let ajax = {
		method: this.getValueOrDefault(data.method, null),
		url: this.getValueOrDefault(data.url, null)
	}
	if (ajax.method == null) return new Promise.reject(new Error('Missing HTTP Method'));
	if (ajax.url == null) return new Promise.reject(new Error('Missing URL'));

	ajax.method = ajax.method.toUpperCase();

	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();

		xhr.ontimeout = function () {
			return reject(new Error('Connection timeout. No response was obtained from the server in the established time\n' +
				'\t Endpoint: ' + ajax.url));
		}

		xhr.onerror = function () {
			let body = (ajax.isJson) ? ajax.body : JSON.stringify(ajax.body);
			return reject(new Error('Connection error. Could not stablish a connection with the server...\n' +
				'\t Endpoint: ' + ajax.url));
		}

		xhr.onload = function() {
			if (this.status == 200) {
				return resolve(this.responseText);
			} else {
				return reject(new Error('Request error. Non 200 response was obtained from the server...\n' +
				'\t Endpoint: ' + ajax.url));
			}
		}

		xhr.open(ajax.method, ajax.url, true);
		xhr.send();
	});
}

//vQuery functions for DOM manipulation
_vQuery.prototype.createElement = function(data) {
	let elementData = {
		label: this.getValueOrDefault(data.label, null),
		id: this.getValueOrDefault(data.id, null),
		classes: this.getValueOrDefault(data.classes, []),
		attrs: this.getValueOrDefault(data.attrs, []),
		innerHTML: this.getValueOrDefault(data.innerHTML, null),
		value: this.getValueOrDefault(data.value, null)
	};
	if (elementData.label == null) return undefined;
	
	let element = document.createElement(elementData.label);
	if (elementData.id != null) element.setAttribute('id', elementData.id);
	elementData.classes.forEach(cssClass => element.classList.add(cssClass));
	elementData.attrs.forEach(attrData => element.setAttribute(attrData.attr, attrData.value));
	if (elementData.innerHTML != null) element.innerHTML = elementData.innerHTML;
	if (elementData.value != null) element.setAttribute('value', elementData.value);

	return element;
};

_vQuery.prototype.appendChilds = function(childs, atStart = false) {
	if (this.nodes == undefined) return this;
	childs = (Array.isArray(childs)) ? childs : [childs];
	this.nodes.forEach(node => {
		childs.forEach(child => {
			if (atStart) {
				node.prepend(child);
			} else {
				node.append(child);
			}
		});
	});
	return this;
};

_vQuery.prototype.attr = function (attr, value = null) {
	if (this.nodes == undefined) {
		return (value != null) ? this : undefined;
	}
	if (value != null) {
		this.nodes.forEach(node => node.setAttribute(attr, value));
		return this;
	} else {
		return this.nodes[0].getAttribute(attr);
	}
}

_vQuery.prototype.addEvent = function (evt, value = null) {
	if (this.nodes == undefined) {
		return (value != null) ? this : undefined;
	}
	if (value != null) {
		this.nodes.forEach(node => node.addEventListener(evt, value));
		return this;
	} else {
		return this.nodes[0].getAttribute(evt);
	}
}

_vQuery.prototype.removeAttr = function (attr) {
	if (this.nodes == undefined) return this;

	this.nodes.forEach(node => node.removeAttribute(attr));
	return this;
}

_vQuery.prototype.innerHTML = function (value = null) {
	if (this.nodes == undefined) {
		return (value != null) ? this : undefined;
	}
	if (value != null) {
		this.nodes.forEach(node => node.innerHTML = value);
		return this;
	} else {
		return this.nodes[0].innerHTML;
	}
}

_vQuery.prototype.value = function (value = null) {
	if (this.nodes == undefined) {
		return (value != null) ? this : undefined;
	}
	if (value != null) {
		this.nodes.forEach(node => node.value = value);
		return this;
	} else {
		return this.nodes[0].value;
	}
}

_vQuery.prototype.disabled = function (disabled = null) {
	if (this.nodes == undefined) return this;

	switch (disabled) {
	 	case true:
	 		return this.attr('disabled', 'disabled');
	 	case false:
	 		return this.removeAttr('disabled');
	 	default:
	 		return this.nodes[0].disabled;
	 }
}

_vQuery.prototype.css = function (property, value = null) {
	if (this.nodes == undefined) {
		return (value != null) ? this : undefined;
	}
	if (value != null) {
		this.nodes.forEach(node => node.style[property] = value);
		return this;
	} else {
		return this.nodes[0].style[property];
	}
}

_vQuery.prototype.addClass = function (classes = null) {
	if (this.nodes == undefined) {
		return (classes != null) ? this : undefined;
	}
	if (classes != null) {
		classes = (Array.isArray(classes)) ? classes : [classes];
		classes.forEach(cssClass => {
			this.nodes.forEach(node => node.classList.add(cssClass));
		});
	}
	return this;
}

_vQuery.prototype.removeClass = function (classes = null) {
	if (this.nodes == undefined) {
		return (classes != null) ? this : undefined;
	}
	if (classes != null) {
		classes = (Array.isArray(classes)) ? classes : [classes];
		classes.forEach(cssClass => {
			this.nodes.forEach(node => node.classList.remove(cssClass));
		});
	}
	return this;
}

_vQuery.prototype.hasClass = function (classes = null) {
	if (this.nodes == undefined) {
		return (classes != null) ? classes : undefined;
	}
	var hasClass = false;
	if (classes != null) {
		this.nodes.forEach((node) => {
			hasClass = (node.classList.contains(classes));
		});
	}
	return hasClass;
}
