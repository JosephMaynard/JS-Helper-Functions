export function preloadImages( imagePath, imageArray, callBack ){
  let preloadCounter = 0;
  const preloadImageLoaded = () => {
    preloadCounter += 1;
    if ( preloadCounter === imageArray.length && typeof callBack === "function" ) { callBack(); }
  };
  imageArray.map( ( image ) => {
    const imageToPreload = new Image();
    imageToPreload.src = `${imagePath}${image}`;
    imageToPreload.onload = preloadImageLoaded;
    return imageToPreload;
  } );
}

export function isMSIE() {
  return window.navigator.userAgent.indexOf( 'Trident' ) > 0;
}

export function getUrlParameters() {
  const vars = {};
  window.location.href.replace( /[?&]+([^=&]+)=([^&]*)/gi, ( m, key, value ) => {
    vars[key] = value;
  } );
  return vars;
}

export function uniqueID() {
    return (new Date()).getTime().toString(36) + Math.round(Math.random() * 1e8).toString(36);
}

export function replaceTemplateStrings(text, details) {
    const updatedText = text.replace(/{[^{}]+}/g, function(key){
        return details[key.replace(/[{}]+/g, '')] || '';
    });
    return updatedText;
}

export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
