h = {
	el: {},
	create: function(name, type, parent){
		if(!this.el.hasOwnProperty(name)){
			this.el[name] = document.createElement(type);
			if(typeof parent != 'undefined'){
				parent.appendChild(this.el[name]);
			}
		} else {
			console.error('Element with name ' + name + ' already exists.');
		}
		this.el[name].styler = function (attributes){
			h.style(this, attributes);
		}
	},
	style: function(element, attributes){
		var prefix = ['transform', 'transition', 'perspective', 'transformStyle', 'transitionTimingFunction', 'backfaceVisibility'];
		for(style in attributes){
			if(prefix.indexOf(style) > -1){
				element.style['webkit' + style.charAt(0).toUpperCase() + style.slice(1)] = attributes[style];
			}
			element.style[style] = attributes[style];
		}
	},

	random: function(min, max){
		return Math.round(Math.random() * (max - min)) + min;
	},

	preloadImages: function(imagePath, imageArray, callBack){
		var preloadedImages = [];
		for(var i = 0; i < imageArray.length; i++){
			preloadedImages[i] = new Image();
			preloadedImages[i].src = imagePath + imageArray[i];
			preloadedImages[i].onload = function(){
				preloadCounter++;
				if(preloadCounter == imageArray.length && typeof callBack === "function") callBack();
			}
		}
	},

	firePixel: function(url, callBack){
		var pixel = new Image();
		pixel.src = url;
		if(typeof callBack === "function"){
			pixel.onload = callBack;
		}
	}

}