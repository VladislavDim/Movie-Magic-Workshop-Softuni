export default function showRatingHelper(rating) {
    const maxStars = 5; // Maximum stars
    const stars = (rating / 10) * maxStars; // Convert 10-point rating to 5-point scale
    const fullStars = Math.floor(stars); // Full stars
    const emptyStars = maxStars - fullStars; // Remaining stars

    return (
        '&#x2605;'.repeat(fullStars) + // Full stars (★)
        '&#x2606;'.repeat(emptyStars) // Empty stars (☆)
    );
} 