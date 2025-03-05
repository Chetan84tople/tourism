// Open the lightbox modal with the clicked image and description
function openLightbox(imageSrc, description) {
    document.getElementById("lightbox-image").src = imageSrc;
    document.getElementById("lightbox-description").textContent = description;
    document.getElementById("lightbox-modal").style.display = "flex";
}

// Close the lightbox modal
function closeLightbox() {
    document.getElementById("lightbox-modal").style.display = "none";
}