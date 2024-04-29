// Select all elements that have the 'hidden' class
const hiddenElements = document.querySelectorAll('.hidden');

// Create the Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Check if the element is intersecting
        if (entry.isIntersecting) {
            // Delay the addition of 'show' class by 500 milliseconds (0.5 seconds)
            setTimeout(() => {
                entry.target.classList.add('show');
            }, 700);  // You can change 500 to any other value in milliseconds to adjust the delay
        } else {
            // Optional: Remove the 'show' class immediately when not intersecting
            entry.target.classList.remove('show');
        }
    });
});

// Observe each hidden element
hiddenElements.forEach(el => observer.observe(el));
