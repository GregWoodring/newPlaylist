function toDataURL(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      //let canvasCopy = {...canvas}
      dataURL = canvas.toDataURL(outputFormat);
      let head = 'data:image/png;base64,';
      let imageFileSize = Math.round((dataURL.length - head.length)*3/4);
      if(imageFileSize > 246000){
          let quality = 246000 / imageFileSize;
          dataURL = canvas.toDataURL(outputFormat, quality);
      }
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }
export default toDataURL;