// Function to switch between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Fetch gallery images from JSON
fetch('gallery.json')
    .then(response => response.json())
    .then(data => {
        const galleryContainer = document.getElementById('gallery-container');
        data.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            galleryContainer.appendChild(imgElement);
        });
    })
    .catch(error => {
        console.error('Error loading gallery data:', error);
    });

// Fetch carousel images from JSON
fetch('carousel.json')
    .then(response => response.json())
    .then(data => {
        const carouselContainer = document.getElementById('carousel-container');
        let currentIndex = 0;

        // Function to display image in carousel
        function displayImage(index) {
            carouselContainer.innerHTML = `<img src="${data[index].src}" alt="${data[index].alt}">`;

            // Add opacity transition for smooth fade-in effect
            const imgElement = carouselContainer.querySelector('img');
            imgElement.style.opacity = 0;
            setTimeout(() => {
                imgElement.style.opacity = 1;
            }, 100);
        }

        // Arrow buttons for carousel
        document.getElementById('prev-btn').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + data.length) % data.length;
            displayImage(currentIndex);
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % data.length;
            displayImage(currentIndex);
        });

        // Display the first image when the page loads
        displayImage(currentIndex);
    })
    .catch(error => {
        console.error('Error loading carousel data:', error);
    });
