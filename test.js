timelapseItem.addEventListener('click', () => {
    // 1. Gestion UI
    document.querySelectorAll('.timelapse_item').forEach(item => item.classList.remove('active'));
    timelapseItem.classList.add('active');

    // 2. Identifier l'ancienne image (celle déjà présente sur la carte)
    let oldLayers = [];
    map.eachLayer(layer => {
        if (layer instanceof L.ImageOverlay) {
            oldLayers.push(layer);
        }
    });

    // 3. Créer la nouvelle image (cachée au début : opacity 0)
    const newImage = L.imageOverlay(`${photoUrl}${photo.name}`, photo.coordinates, {
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
});