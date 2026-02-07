

// *****************
// *** FUNCTIONS  ***
// *****************

// retourne la photo par id
function getPhotoById(photoId){ 
    return photos.find(p => p.id == photoId);
}

function filter_etat_function(filter_etat) {
    refreshPhotos(filter_etat);
}

function displayAsideChosenPhoto(photo) {
    chosenPhotoElmt.src = `${photoUrl}${photo.name}.jpg`;
    spanPhotoName.innerHTML= `${photo.name}.jpg`;
    spanPhotoYear.innerHTML = photo.year;
    spanLng.innerHTML = calculatedCenter[1];
    spanLat.innerHTML = calculatedCenter[0];
    pDescription.innerHTML = photo.description;           
    chosenPhotoElmt.className = ""; // reset class
    if(photo.etat === 1){
        chosenPhotoElmt.className = "warning";
    }else if(photo.etat === 2){
        chosenPhotoElmt.className = "danger";
    }   
}




// 
/* 
function createSiteLink(site) {   
    const a = document.createElement('a');
    a.textContent = site.name;
    a.href = site.url || '#';
    return a;
}
function updateStats() {
    normalCount = getPhotosCountByEtat(0);
    spanNormal.style.width = `${ getPourcentagePhotos(normalCount)}%`;
    spanNormalCount.innerHTML = getPourcentagePhotos(normalCount) ; 
    attentionCount = getPhotosCountByEtat(1);
    spanAttention.style.width = `${getPourcentagePhotos(attentionCount)}%`;
    spanAttentionCount.innerHTML = getPourcentagePhotos(attentionCount) ;
    dangerCount = getPhotosCountByEtat(2);
    spanDanger.style.width = `${getPourcentagePhotos(dangerCount)}%`;
    spanDangerCount.innerHTML = getPourcentagePhotos(dangerCount) ;
}

function sauvegarderModifications(photoId) {  // sur une photo
    const photo = getPhotoById(photoId);    

    const newEtat = parseInt(document.getElementById('edit_etat').value);
    const newDescription = document.getElementById('edit_description').value; 

    photo.etat = newEtat;
    photo.description = newDescription;
    alert(`Modifications sauvegardées pour la photo ${photo.name}.`);

    // Fermer la popup
    map.closePopup();

    patchPhoto(photo);
}


*/



// function setActiveBtn(activeBtn) {  // highlight the active button
//     document.querySelectorAll(".map-btn").forEach(btn =>
//         btn.classList.remove("active")
//     );
//     activeBtn.classList.add("active");
// }


// function createSiteListUlLi(site) {
//     const li = document.createElement('li');
//     li.dataset.id = site.id;
//     li.style.cursor = 'pointer';
//     return li;
// }

// // Convert GeoJSON features to Site objects (list of Site instances)
// function photosFromGeoJSON(geojson) {
//     return geojson.features.map(f => {
//         const p = f.properties;        
//         return new Photo(p.fid, 
//                         p.photo_web, 
//                         p.etat, 
//                         p.description, 
//                         f.geometry.coordinates);
//     });
// }
