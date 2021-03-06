(function (root, factory) {
	
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.mmData = factory();
	}
	
}(this, function () {

	'use strict';
	
	var Data = (function () {
		
		var module = function (id) {
			if (this === window || typeof this === 'undefined') {
				return new module(id);
			}
			
			this.id = id;

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
			
			subscribe: function (element) {
				if (!element) {
					return;
				}
				
				element.setAttribute('data-mm-bind', this.id);
				
				return this;
			},
			
			unsubscribe: function (element) {
				if (!element) {
					return;
				}
				
				element.removeAttribute('data-mm-bind');
				
				return this;
			},
			
			removeSubscribers: function () {
				var subscribers = document.querySelectorAll('[data-mm-bind="' + this.id + '"]');
				
				this.onElement(function () {
					try {
						this.removeAttribute('data-mm-bind');
					} catch (e) {
						
					}
				}, subscribers);
				
				return this;
			},
			
			broadcast: function (value) {
				var subscribers = document.querySelectorAll('[data-mm-bind="' + this.id + '"]');
				
				this.onElement(function () {
					this.innerHTML = value;
				}, subscribers);
				
				return this;
			}
			
		};
		
		return module;
		
	}());
	
	return Data;
	
}));