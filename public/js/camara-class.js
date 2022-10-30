class Camara {
    constructor( videoNode ) {
        this.videoNode = videoNode;
        console.log('Cámara class init');
    }

    encender() {
        if ( navigator.mediaDevices ) {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { width: 300, height: 300 }
            })
            .then(stream => {
                this.videoNode.srcObject = stream;
                this.stream = stream;
            });
        }
    }

    apagar() {

        this.videoNode.pause();

        if (this.stream) {
            this.stream.getTracks()[0].stop();
        }

    }

    tomarFoto() {

        // crear un elemento canvas para renderizar ahí la foto
        let canvas = document.createElement('canvas');

        // colocar las dimensiones iguales al elemento del vídeo
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);

        // obtener el contexto del canvas
        let context = canvas.getContext('2d'); // una simple imagen

        // renderizamos la imagen dentro del canvas
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

        this.foto = context.canvas.toDataURL();

        // limpiamos
        canvas = null;
        context = null;

        return this.foto;
    }
}