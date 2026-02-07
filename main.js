const modeDiv = document.getElementById("mode");

//******************************    
/* ***** index.html FUNCTIONS ***** */
//******************************

function updateVisibility() {

    
    if (map.getZoom() < 14) {
        // Mode "Point" : On ajoute le marqueur, on retire l'image
        if (!map.hasLayer(marker)) marker.addTo(map);
        // if (map.hasLayer(myImage)) map.removeLayer(myImage);
        map.removeLayer(myImage); // removeLayer gère le cas où l'image n'est pas présente, pas besoin de vérifier avec hasLayer
    } else {
        // Mode "Orthophoto" : On ajoute l'image, on retire le marqueur
        myImage= L.imageOverlay(photoData.url, photoData.bounds);
        if (!map.hasLayer(myImage)) myImage.addTo(map);
        if (map.hasLayer(marker)) map.removeLayer(marker);        
    }
}

function setMode(modeApp) {
   modeDiv.dataset.mode = modeApp;
//    if (mode === appMode.TIMELAPSE) {
//        setModeTimeLapse();
//     } else if (mode === appMode.NORMAL) {
//         setModeNormal();
//     }
}

function getCenterFromBounds(bounds) {
    const southWest = bounds[0]; // [lat, lng]
    const northEast = bounds[1]; // [lat, lng]

    const centerLat = (southWest[0] + northEast[0]) / 2;
    const centerLng = (southWest[1] + northEast[1]) / 2;

    return [centerLat, centerLng];
}