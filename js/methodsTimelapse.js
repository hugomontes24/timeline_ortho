

// *****************
// *** FUNCTIONS  ***
// *****************
function displayTimelapse() {
   
    if (mode.dataset.mode === appMode.TIMELAPSE) {
        setMode(appMode.NORMAL);
        setModeNormal();
    } else {
        setMode(appMode.TIMELAPSE);
        setModeTimelapse();
    }
  
}
function setModeTimelapse() {
    if (!map.hasLayer(myImage)) { // animation de transition
        myImage.addTo(map);
    }
    map.flyTo(photoData.center, 18, {
        duration: 0.5
    });

    // 1. Nettoyage de la zone des boutons pour éviter les doublons si on change de mode
    // const existingButtons = document.getElementById('buttons');
    // if (existingButtons) existingButtons.remove();
    eraseButtons();

    modeDiv.dataset.mode = appMode.TIMELAPSE ; 
    const buttons = document.createElement('div');
    buttons.id = 'buttons';
    modeDiv.appendChild(buttons);


    photos.forEach(photo => {
        // Crée un timeline-item
        const timelapseItem = document.createElement('div');
        timelapseItem.className = 'timelapse_item';
        // Crée une année (2020, 2021, etc.)
            const year = document.createElement('div');
            year.className = 'timelapse_year';
            year.textContent = `${photo.year}`; // Exemple : 2020, 2021, etc.
        // Ajoute l'année au timeline-item
        timelapseItem.appendChild(year);

            const timelapseDot = document.createElement('div');
            timelapseDot.className = 'timelapse_dot';
               // Crée un bouton          
                const btn = document.createElement('button');
                btn.id = photo.id;
                btn.className = 'button';
                // Ajoute le bouton au timeline-dot
                timelapseDot.appendChild(btn);

            // Ajoute le timeline-dot au timeline-item
            timelapseItem.appendChild(timelapseDot);
          
        // Ajoute le timeline-item au conteneur
        buttons.appendChild(timelapseItem);

        timelapseItem.addEventListener('click', () => { 
            document.querySelectorAll('.timelapse_item').forEach(item =>
                item.classList.remove('active')
            ); 
            timelapseItem.classList.add('active'); 
           
             // 2. Identifier l'ancienne image (celle déjà présente sur la carte)
            let oldLayers = [];
            map.eachLayer(layer => {
                if (layer instanceof L.ImageOverlay) {
                    oldLayers.push(layer);
                }
            });
            
            // 3. Créer la nouvelle image (cachée au début : opacity 0)
            const newImage = L.imageOverlay(`${photoUrl}${photo.name}.jpg`, photo.coordinates, {
                                opacity: 0,
                                interactive: true
                            }).addTo(map);

            // 4. Animation de transition (Fade In / Fade Out)
            let opacity = 0;
            const transitionSpeed = 0.1; // Vitesse de la transition
            const interval = setInterval(() => {
                opacity += transitionSpeed;
                
                // On monte l'opacité de la nouvelle
                newImage.setOpacity(opacity);
                
                // On baisse l'opacité des anciennes
                oldLayers.forEach(old => {
                    if (map.hasLayer(old)) {
                        old.setOpacity(1 - opacity);
                    }
                });

                if (opacity >= 1) {
                    clearInterval(interval);
                    // 5. Une fois terminé, on nettoie proprement les anciennes couches
                    oldLayers.forEach(old => map.removeLayer(old));
                }
            }, 50); // Toutes les 50ms pour une animation fluide

            displayAsideChosenPhoto(photo); // Affiche les infos de la photo dans la sidebar

        });

    });   
}
/* This function removes the buttons from the header when changing mode */
function eraseButtons() {
    const existingButtons = document.getElementById('buttons');
    if (existingButtons) existingButtons.remove();
}

function setModeNormal() {
    eraseButtons();

    removeImgLayer();

    updateVisibility();

    displayAsideChosenPhoto(photos[0]); // Affiche les infos de la première photo dans la sidebar
}
/* This function removes the image layers from the map when switching back to normal mode */
function removeImgLayer(){
    map.eachLayer(layer => {
        if (layer instanceof L.ImageOverlay) {
            map.removeLayer(layer);
        }
    });
}



