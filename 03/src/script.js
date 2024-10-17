document.addEventListener("DOMContentLoaded", function() {
    const imageContainer = document.getElementById('images');
    const totalImages = 5000; 
    for (let i = 1; i <= totalImages; i++) {
        const img = document.createElement('img');
        img.src = `images/image.png?img=${i}`; 
        img.alt = `Image ${i}`;
        imageContainer.appendChild(img);
    }
});
