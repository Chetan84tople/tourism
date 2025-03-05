// Open the destination modal
function openDestinationModal(title, description) {
    document.getElementById("destination-title").textContent = title;
    document.getElementById("destination-description").textContent = description;
    document.getElementById("destination-modal").style.display = "flex";
}

// Close the destination modal
function closeDestinationModal() {
    document.getElementById("destination-modal").style.display = "none";
}