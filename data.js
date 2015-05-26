(function (root, factory) {
	
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.mmData = factory();
	}
	
}(this, function () {
	
	var Data = (function () {
		
		var module = function (instance) {
			if (this === window) {
				return new module(instance);
			}
			
			this.instance = instance;
			return this;
		};
		
		module.prototype = {
			
			onElement: function (callback, elements) {
				elements || (elements = this.instance);
				
				var _this = this;
				
				if (elements.length) {
					[].forEach.call(elements, function (element) {
						callback.call(element);
					});
				} else {
					callback.call(elements);
				}
			},
			
			bind: function (what) {
				var elements;
				
				if (!what) {
					return;
				}
				
				this.onElement(function () {
					try {
						this.setAttribute('data-mm-bind', what);
					} catch (e) {
						
					}
				});
				
				return this;
			},
			
			unbind: function () {
				this.onElement(function () {
					try {
						this.removeAttribute('data-mm-bind');
					} catch (e) {
						
					}
				});
				
				return this;
			},
			
			removeListeners: function () {
				var listeners = document.querySelectorAll('[data-mm-bind="' + this.instance + '"]');
				
				this.onElement(function () {
					try {
						this.removeAttribute('data-mm-bind');
					} catch (e) {
						
					}
				}, listeners);
				
				return this;
			},
			
			update: function (value) {
				var listeners = document.querySelectorAll('[data-mm-bind="' + this.instance + '"]');
				
				this.onElement(function () {
					this.innerHTML = value;
				}, listeners);
				
				return this;
			}
			
		};
		
		return module;
		
	}());
	
	return Data;
	
}));