var h = {

	el: {},

	h: this,

	prefix: ['animation', 'animationName', 'animationDuration', 'animationTimingFunction', 'animationDelay', 'animationIterationCount', 'animationDirection', 'transform', 'transformOrigin', 'transformStyle', 'transition', 'perspective', 'transformStyle', 'transitionTimingFunction', 'backfaceVisibility', 'boxShadow'],

	prefixes: ['ms', 'moz', 'o', 'webkit'],
	

	create: function(name, type, parent){
		if(!h.el.hasOwnProperty(name)){
			h.el[name] = document.createElement(type);
			if(typeof parent != 'undefined'){
				parent.appendChild(h.el[name]);
			}
			h.el[name].updateStyles = function (attributes){
				h.style(this, attributes);
			}
			return h.el[name];
		} else {
			console.error('Element with name ' + name + ' already exists.');
		}
	},

	createCSSRule: function(selector, declarationBlock){
		var result = '';
		result += selector + ' {\n';
		for(var style in declarationBlock){
			if(h.prefix.indexOf(style) > -1){
				for (var i = 0; i < h.prefixes.length; i++) {
					result += '\t-' + h.prefixes[i] + '-' + h.unCamelCase(style) + ': ' + declarationBlock[style] + ';\n';
				}
			}
			result += '\t' + h.unCamelCase(style) + ': ' + declarationBlock[style] + ';\n';
		}
		result += '}\n';
		return result;
	},

	createKeyframes: function(identifier, keyframes){
		var result = '';
		for (var i = 0; i < h.prefixes.length; i++) {
			result += '@-' + h.prefixes[i] + '-keyframes ' + identifier + ' {\n';
			for(var keyframe in keyframes){
				result += '\t' + keyframe + ' {\n';
				for(var style in keyframes[keyframe]){
					if(h.prefix.indexOf(style) > -1){
						var prefixedStyle = '-' + h.prefixes[i] + '-' + style;
						result += '\t\t' + h.unCamelCase(prefixedStyle) + ': ' + keyframes[keyframe][style] + ';\n';
					}
					result += '\t\t' + h.unCamelCase(style) + ': ' + keyframes[keyframe][style] + ';\n';
				}
				result += '\t}\n';
			}
			result += '}\n';
		}
		result += '@keyframes ' + identifier + ' {\n';
		for(var keyframe in keyframes){
			result += '\t' + keyframe + ' {\n';
			for(var style in keyframes[keyframe]){
				result += '\t\t' + h.unCamelCase(style) + ': ' + keyframes[keyframe][style] + ';\n';
			}
			result += '\t}\n';
		}
		result += '}\n';
		return result;
	},

	style: function(element, attributes){
		for(var style in attributes){
			if(h.prefix.indexOf(style) > -1){
				for (var i = 0; i < h.prefixes.length; i++) {
					element.style[h.prefixes[i] + style.charAt(0).toUpperCase() + style.slice(1)] = attributes[style];
				}
			}
			element.style[style] = attributes[style];
		}
	},

	unCamelCase: function(attribute){
		if(attribute === attribute.toLowerCase()){
			return attribute;
		} else {
			return attribute.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
		}
	},

	param: function(element, attributes){
		for(var param in attributes){
			element[param] = attributes[param];
		}
	},

	random: function(min, max){
		if(typeof max === 'number' && typeof min === 'number'){
			return Math.round(Math.random() * (max - min)) + min;
		} else if(typeof min === 'number'){
			return Math.round(Math.random() * min);
		} else if(typeof max === 'undefined' && typeof min === 'undefined'){
			if(Math.random() > 0.5){
				return true;
			} else {
				return false;
			}
		}
	},

	preloadImages: function(imagePath, imageArray, callBack){
		var preloadedImages = [],
			preloadCounter = 0;
		for(var i = 0; i < imageArray.length; i++){
			this.loadImg(imagePath + imageArray[i], function(){
				preloadCounter++;
				if(preloadCounter == imageArray.length && typeof callBack === "function") callBack();
			});
		}
	},

	loadImg: function(url, callBack){
		var pixel = new Image();
		pixel.src = url;
		if(typeof callBack === "function"){
			pixel.onload = callBack;
		}
	},

	// Function to detect taps just using touch events
	// Some Ad Servers automatically opens a web view if any onclick event listeners are fired
	touchTap: function(target, callback) {

		var touchPoints = {
			startX: 0,
			startY: 0,
			endX: 0,
			endY: 0,
			// Set tolerance of tap here in pixels as Samsung Galaxy S5 and S6 return 
			// slightly different X and Y values for touchstart and touchend events
			tolerance: 10
		};

		target.addEventListener("touchstart", handleStart, true);
		target.addEventListener("touchend", handleEnd, true);

		function handleStart(e){
			touchPoints.startX = e.touches[0].pageX;
			touchPoints.startY = e.touches[0].pageY;
		}

		function handleEnd(e){
			touchPoints.endX = e.changedTouches[0].pageX;
			touchPoints.endY = e.changedTouches[0].pageY;

			if(Math.abs( touchPoints.endX -  touchPoints.startX) < touchPoints.tolerance && Math.abs( touchPoints.endY -  touchPoints.startY) < touchPoints.tolerance ) {
				if (typeof callback === 'function'){
					callback();
				}   
			}
		}

	}

}

function Create(type, parent){
	this.el = document.createElement(type);
	if(parent){
		parent.appendChild(this.el);
	}
	return this;
}

Create.prototype.style = function(attributes){
	h.style(this.el, attributes);
	return this;
}

Create.prototype.param = function(attributes){
	h.param(this.el, attributes);
	return this;
}

