var h = {

	el: {},

	h: this,

	prefix: ['animation', 'animationName', 'animationDuration', 'animationTimingFunction', 'animationDelay', 'animationIterationCount', 'animationDirection', 'transform', 'transition', 'perspective', 'transformStyle', 'transitionTimingFunction', 'backfaceVisibility'],

	prefixes: ['ms', 'moz', 'o', 'webkit'],
	

	create: function(name, type, parent){
		if(!this.el.hasOwnProperty(name)){
			this.el[name] = document.createElement(type);
			if(typeof parent != 'undefined'){
				parent.appendChild(this.el[name]);
			}
			this.el[name].updateStyles = function (attributes){
				h.style(this, attributes);
			}
		} else {
			console.error('Element with name ' + name + ' already exists.');
		}
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
	}

}