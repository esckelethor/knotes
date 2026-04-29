//vanilla JS framework based on JQuery
//vQuery constructor
_vQuery = function (pSelector) {
	this.vQuery = '1.3.0';
	this.selector = pSelector;

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

_vQuery.prototype.ajax = function (pReqPayload) {
	let vAjax = {
		method: this.getValueOrDefault(pReqPayload.method, null),
		url: this.getValueOrDefault(pReqPayload.url, null)
	}
	if (vAjax.method == null) return new Promise.reject(new Error('Missing HTTP Method'));
	if (vAjax.url == null) return new Promise.reject(new Error('Missing URL'));

	vAjax.method = vAjax.method.toUpperCase();

	return new Promise((pResolve, pReject) => {
		var vXHR = new XMLHttpRequest();

		vXHR.ontimeout = function () {
			return pReject(new Error('Connection timeout. No response was obtained from the server in the established time\n' +
				'\t Endpoint: ' + vAjax.url));
		}

		vXHR.onerror = function () {
			let body = (vAjax.isJson) ? vAjax.body : JSON.stringify(vAjax.body);
			return pReject(new Error('Connection error. Could not stablish a connection with the server...\n' +
				'\t Endpoint: ' + vAjax.url));
		}

		vXHR.onload = function() {
			if (this.status == 200) {
				return pResolve(this.responseText);
			} else {
				return pReject(new Error('Request error. Non 200 response was obtained from the server...\n' +
				'\t Endpoint: ' + vAjax.url));
			}
		}

		vXHR.open(vAjax.method, vAjax.url, true);
		vXHR.send();
	});
}

_vQuery.prototype.loadContent = function (pAsset, pModules = this.DATA_MODULE_NONE, pCallback) {
	this.innerHTML('');

	pAsset = pAsset.replaceAll('-', '/');
	this.ajax({
		method: 'GET',
		url: './assets/content/' + pAsset + '.html'
	}).then((pResponse) => {
		this.innerHTML(pResponse);

		if (pModules != undefined && typeof pModules === 'string') {
			if (pModules != this.DATA_MODULE_NONE) {
				pModules.split(' ').forEach((module) => {
					//load modules
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
	}).catch((pResponse) => {
		console.log(pResponse.message);
	});
}

_vQuery.prototype.regexValidation = function (pRegexExp, pExactMatch = true, pHaystack = null) {
	if (pHaystack == null) {
		if (this.selector != undefined) {
			//if vQuery has selector get value from first node
			pHaystack = (this.nodes[0].tagName == 'INPUT') ? this.nodes[0].value : this.nodes[0].innerHTML;
		} else {
			return undefined;
		}
	}

	if (pExactMatch) {
		pRegexExp = '^' + pRegexExp + '$';
	}

	let vRegexObj = new RegExp(pRegexExp);
	let vResults = vRegexObj.exec(pHaystack);
	return (vResults != null && vResults.length != 0) ? true : false;
}

//vQuery functions for DOM manipulation
_vQuery.prototype.createElement = function(pElementDef) {
	let vElementDef = {
		label: this.getValueOrDefault(pElementDef.label, null),
		id: this.getValueOrDefault(pElementDef.id, null),
		classes: this.getValueOrDefault(pElementDef.classes, []),
		attrs: this.getValueOrDefault(pElementDef.attrs, []),
		innerHTML: this.getValueOrDefault(pElementDef.innerHTML, null),
		value: this.getValueOrDefault(pElementDef.value, null)
	};
	if (vElementDef.label == null) return undefined;
	
	let vElement = document.createElement(vElementDef.label);
	if (vElementDef.id != null) vElement.setAttribute('id', vElementDef.id);
	vElementDef.classes.forEach(pCssClass => vElement.classList.add(pCssClass));
	vElementDef.attrs.forEach(pAttrData => vElement.setAttribute(pAttrData.attr, pAttrData.value));
	if (vElementDef.innerHTML != null) vElement.innerHTML = vElementDef.innerHTML;
	if (vElementDef.value != null) vElement.setAttribute('value', vElementDef.value);

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
		this.nodes.forEach(pNode => pNode.setAttribute(pAttr, pValue));
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

_vQuery.prototype.triggerEvent = function (pEventName) {
	if (this.nodes == undefined) return this;

	this.nodes[0].dispatchEvent(new Event(pEventName));
	return this;
}

_vQuery.prototype.searchValue = function (pValue = null) {
	if (this.nodes == undefined || pValue == null) return undefined;

	let vFounded = false;
	this.nodes.forEach(node => {
		let nodeValue = (node.tagName == 'INPUT') ? node.value : node.innerHTML;
		if (nodeValue == pValue) {
			founded = true;
		}
	});
	return vFounded;
}

//vQuery global object initiator
$v = (pSelector) => {
	return new _vQuery(pSelector);
}
