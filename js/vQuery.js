//vanilla JS framework based on JQuery
//vQuery constructor
_vQuery = function (pSelector) {
	this.vQuery = '1.2.0';
	
	let vNodes = document.querySelectorAll(pSelector);
	if (vNodes.length > 0) {
		vNodes = [].slice.call(vNodes);
		this.nodes = vNodes;
	}
	this.length = (vNodes != undefined) ? vNodes.length : 0;
	return this;
}

//constants for module loader
_vQuery.prototype.DATA_MODULE_NONE = 'none';

//vQuery utils, can be used with a blank selector
_vQuery.prototype.getValueOrDefault = function (pValue, pDefaultValue) {
	return (pValue != undefined && pValue != null) ? pValue : pDefaultValue;
}

_vQuery.prototype.loadContent = function (pAsset, pModules = this.DATA_MODULE_NONE, pCallback) {
	this.innerHTML('');

	pAsset = pAsset.replaceAll('-', '/');
	this.ajax({
		method: 'GET',
		url: './assets/content/' + pAsset + '.html'
	}).then((pData) => {
		this.innerHTML(pData);

		if (pModules != undefined && typeof pModules === 'string') {
			if (pModules != this.DATA_MODULE_NONE) {
				pModules.split(' ').forEach((module) => {
					//load module_anexos
					var vScript = this.createElement({
						label: 'script',
						attrs: [
							{attr: 'type', value: 'text/javascript'},
							{attr: 'src', value: './assets/modules/' + module + '.js'}
						]
					});
					this.appendChilds(vScript);
				})
			}
		} else {
			pCallback = pModules;
		}

		if(pCallback != undefined && pCallback instanceof Function) {
			pCallback();
		}
	}).catch((pData) => {
		console.log(pData.message);
	});
}

_vQuery.prototype.ajax = function (pData) {
	let vAjax = {
		method: this.getValueOrDefault(pData.method, null),
		url: this.getValueOrDefault(pData.url, null)
	}
	if (vAjax.method == null) return new Promise.reject(new Error('Missing HTTP Method'));
	if (vAjax.url == null) return new Promise.reject(new Error('Missing URL'));

	vAjax.method = vAjax.method.toUpperCase();

	return new Promise((resolve, reject) => {
		var vXHR = new XMLHttpRequest();

		vXHR.ontimeout = function () {
			return reject(new Error('Connection timeout. No response was obtained from the server in the established time\n' +
				'\t Endpoint: ' + vAjax.url));
		}

		vXHR.onerror = function () {
			let body = (vAjax.isJson) ? vAjax.body : JSON.stringify(vAjax.body);
			return reject(new Error('Connection error. Could not stablish a connection with the server...\n' +
				'\t Endpoint: ' + vAjax.url));
		}

		vXHR.onload = function() {
			if (this.status == 200) {
				return resolve(this.responseText);
			} else {
				return reject(new Error('Request error. Non 200 response was obtained from the server...\n' +
				'\t Endpoint: ' + vAjax.url));
			}
		}

		vXHR.open(vAjax.method, vAjax.url, true);
		vXHR.send();
	});
}

//vQuery functions for DOM manipulation
_vQuery.prototype.createElement = function(pData) {
	let vElementData = {
		label: this.getValueOrDefault(pData.label, null),
		id: this.getValueOrDefault(pData.id, null),
		classes: this.getValueOrDefault(pData.classes, []),
		attrs: this.getValueOrDefault(pData.attrs, []),
		innerHTML: this.getValueOrDefault(pData.innerHTML, null),
		value: this.getValueOrDefault(pData.value, null)
	};
	if (vElementData.label == null) return undefined;
	
	let vElement = document.createElement(vElementData.label);
	if (vElementData.id != null) vElement.setAttribute('id', vElementData.id);
	vElementData.classes.forEach(cssClass => vElement.classList.add(cssClass));
	vElementData.attrs.forEach(attrData => vElement.setAttribute(attrData.attr, attrData.value));
	if (vElementData.innerHTML != null) vElement.innerHTML = vElementData.innerHTML;
	if (vElementData.value != null) vElement.setAttribute('value', vElementData.value);

	return vElement;
};

_vQuery.prototype.appendChilds = function(pChilds, pAtStart = false) {
	if (this.nodes == undefined) return this;
	pChilds = (Array.isArray(pChilds)) ? pChilds : [pChilds];
	this.nodes.forEach(pNode => {
		pChilds.forEach(pChild => {
			if (pAtStart) {
				pNode.prepend(pChild);
			} else {
				pNode.append(pChild);
			}
		});
	});
	return this;
};

_vQuery.prototype.attr = function (pAttr, pValue = null) {
	if (this.nodes == undefined) {
		return (pValue != null) ? this : undefined;
	}
	if (pValue != null) {
		this.nodes.forEach(node => node.setAttribute(pAttr, pValue));
		return this;
	} else {
		return this.nodes[0].getAttribute(pAttr);
	}
}

_vQuery.prototype.addEvent = function (pEvt, pValue = null) {
	if (this.nodes == undefined) {
		return (pValue != null) ? this : undefined;
	}
	if (pValue != null) {
		this.nodes.forEach(pNode => pNode.addEventListener(pEvt, pValue));
		return this;
	} else {
		return this.nodes[0].getAttribute(pEvt);
	}
}

_vQuery.prototype.removeAttr = function (pAttr) {
	if (this.nodes == undefined) return this;

	this.nodes.forEach(pNode => pNode.removeAttribute(pAttr));
	return this;
}

_vQuery.prototype.innerHTML = function (pValue = null) {
	if (this.nodes == undefined) {
		return (pValue != null) ? this : undefined;
	}
	if (pValue != null) {
		this.nodes.forEach(pNode => pNode.innerHTML = pValue);
		return this;
	} else {
		return this.nodes[0].innerHTML;
	}
}

_vQuery.prototype.value = function (pValue = null) {
	if (this.nodes == undefined) {
		return (pValue != null) ? this : undefined;
	}
	if (pValue != null) {
		this.nodes.forEach(pNode => pNode.value = pValue);
		return this;
	} else {
		return this.nodes[0].value;
	}
}

_vQuery.prototype.disabled = function (pDisabled = null) {
	if (this.nodes == undefined) return this;

	switch (pDisabled) {
	 	case true:
	 		return this.attr('disabled', 'disabled');
	 	case false:
	 		return this.removeAttr('disabled');
	 	default:
	 		return this.nodes[0].disabled;
	 }
}

_vQuery.prototype.css = function (pProperty, pValue = null) {
	if (this.nodes == undefined) {
		return (pValue != null) ? this : undefined;
	}
	if (pValue != null) {
		this.nodes.forEach(pNode => pNode.style[pProperty] = pValue);
		return this;
	} else {
		return this.nodes[0].style[pProperty];
	}
}

_vQuery.prototype.addClass = function (pClasses = null) {
	if (this.nodes == undefined) {
		return (pClasses != null) ? this : undefined;
	}
	if (pClasses != null) {
		pClasses = (Array.isArray(pClasses)) ? pClasses : [pClasses];
		pClasses.forEach(pCssClass => {
			this.nodes.forEach(pNode => pNode.classList.add(pCssClass));
		});
	}
	return this;
}

_vQuery.prototype.removeClass = function (pClasses = null) {
	if (this.nodes == undefined) {
		return (pClasses != null) ? this : undefined;
	}
	if (pClasses != null) {
		pClasses = (Array.isArray(pClasses)) ? pClasses : [pClasses];
		pClasses.forEach(pCssClass => {
			this.nodes.forEach(pNode => pNode.classList.remove(pCssClass));
		});
	}
	return this;
}

_vQuery.prototype.hasClass = function (pClasses = null) {
	if (this.nodes == undefined) {
		return (pClasses != null) ? pClasses : undefined;
	}
	var vHasClass = false;
	if (pClasses != null) {
		this.nodes.forEach((pNode) => {
			vHasClass = (pNode.classList.contains(pClasses));
		});
	}
	return vHasClass;
}

//vQuery global object initiator
$v = (pSelector) => {
	return new _vQuery(pSelector);
}
