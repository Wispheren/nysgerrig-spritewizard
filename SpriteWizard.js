(function SpriteFactory(){

    var dropArea, canvas, context,
    row = 0;

    function drawImages(images) {
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        canvas.width = Math.max(images[0].width * images.length, canvas.width);
        canvas.height = images[0].height * (row + 1);

        context.putImageData(imageData, 0, 0);

        for (var i = 0; i < images.length; i++) {
            ((image, index) => {
                context.drawImage(image, image.width * index, row * image.height);                
            })(images[i], i);
        }
        row++;
    }

    function loadImages(e) {
        e.preventDefault();
    
        var files = e.dataTransfer.files,
        pendingImages = [],
        images = [];

        for (var i = 0; i < files.length; i++) {
            (file => {
                var image = new Image();
                image.crossOrigin='anonymous';
                image.onload = () => {
                    pendingImages.splice(pendingImages.indexOf(image), 1);

                    if (pendingImages.length === 0) {
                        drawImages(images);
                    }
                }
                image.src = URL.createObjectURL(file);
                images.push(image);
                pendingImages.push(image);
            })(files[i]);
        }
    }
    
    function init() {
        dropArea = document.querySelector('#dropArea');
        canvas = dropArea.appendChild(document.createElement('canvas'));
        context = canvas.getContext('2d');
    
        dropArea.ondragover = () => { return false; };
        dropArea.ondragend = () => { return false; };
        dropArea.ondrop = loadImages;
    }
    
    addEventListener('DOMContentLoaded', init);

})();