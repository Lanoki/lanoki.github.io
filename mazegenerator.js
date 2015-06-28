function setCanvas() {
        var canvasNode = document.getElementById('canvasD');

        var pw = canvasNode.parentNode.clientWidth;
        var ph = canvasNode.parentNode.clientHeight;

        canvasNode.height = (ph * 0.9) - ((ph * 0.9) % 15)+1;
        canvasNode.width = (pw * 0.9) - ((pw * 0.9) % 15)+1;

        canvasNode.style.top = ((ph- canvasNode.height) / 2) + "px";
        canvasNode.style.left = (pw - canvasNode.width) / 2 + "px";

        var context = document.getElementById('canvasD').getContext("2d");

        context.font = "30px Verdana";
        context.fillText("Sretan rođendan", 40, 50);

        var img = new Image();
        img.onload = function () {
            context.drawImage(img, 40, 70);
        }
        img.src = "images/popay-kruno.png";
}