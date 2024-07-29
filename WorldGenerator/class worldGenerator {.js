class WorldGenerator {
    constructor() {
        this.random = Math.random;
    }

    // Utility method to roll 2d6
    roll2d6() {
        return Math.floor(this.random() * 6) + 1 + Math.floor(this.random() * 6) + 1;
    }

    // Utility method to roll 1d6
    roll1d6() {
        return Math.floor(this.random() * 6) + 1;
    }

    // Method to generate Size
    generateSize() {
        return this.roll2d6() - 2;
    }

    // Method to generate Atmosphere
    generateAtmosphere(size) {
        return this.roll2d6() - 7 + size;
    }

    // Method to generate Hydrographics
    generateHydrographics(size, atmosphere) {
        if (size <= 1) return 0;
        let hydrographics = this.roll2d6() - 7 + size;

        // Modifiers for certain atmospheres
        if (atmosphere === 0 || atmosphere === 1 || atmosphere === 10 || atmosphere >= 11) hydrographics -= 4;

        return Math.max(0, hydrographics);
    }

    // Method to generate Population
    generatePopulation() {
        return this.roll2d6() - 2;
    }

    // Method to generate Government
    generateGovernment(population) {
        return Math.max(0, this.roll2d6() - 7 + population);
    }

    // Method to generate Law Level
    generateLawLevel(government) {
        return Math.max(0, this.roll2d6() - 7 + government);
    }

    // Method to generate Starport
    generateStarport() {
        const roll = this.roll2d6();
        if (roll <= 2) return 'X';
        else if (roll === 3 || roll === 4) return 'E';
        else if (roll === 5 || roll === 6) return 'D';
        else if (roll === 7 || roll === 8) return 'C';
        else if (roll === 9 || roll === 10) return 'B';
        else return 'A';
    }

    // Method to generate Technology Level
    generateTechLevel(starport, size, atmosphere, hydrographics, population, government) {
        let techLevel = this.roll1d6();

        // Apply DMs based on starport
        switch (starport) {
            case 'A':
                techLevel += 6;
                break;
            case 'B':
                techLevel += 4;
                break;
            case 'C':
                techLevel += 2;
                break;
            case 'X':
                techLevel -= 4;
                break;
        }

        // Apply DMs based on size
        if (size === 0 || size === 1) techLevel += 2;
        else if (size === 2 || size === 3 || size === 4) techLevel += 1;

        // Apply DMs based on atmosphere
        if ([0, 1, 2, 3, 10].includes(atmosphere)) techLevel += 1;

        // Apply DMs based on hydrographics
        if (hydrographics === 0) techLevel += 1;

        // Apply DMs based on population
        if (population === 0) return 0;
        else if (population === 1) techLevel += 1;
        else if ([2, 3, 4].includes(population)) techLevel += 1;
        else if ([8, 9].includes(population)) techLevel += 1;
        else if (population === 10) techLevel += 2;
        else if (population === 11) techLevel += 3;
        else if (population === 12) techLevel += 4;

        // Apply DMs based on government
        if (government === 0) techLevel += 1;
        else if (government === 5) techLevel += 1;
        else if (government === 7) techLevel += 2;
        else if ([13, 14].includes(government)) techLevel -= 2;

        return Math.max(0, techLevel);
    }

    getImage(size, atmosphere, hydrographics, population, government) {
        // Define logic to select an image based on the generated characteristics
        if (population > 10) return 'images/image1.jpg';
        else if (atmosphere < 5) return 'images/image2.jpg';
        else return 'images/image3.jpg';
    }

    main() {
        const size = this.generateSize();
        const atmosphere = this.generateAtmosphere(size);
        const hydrographics = this.generateHydrographics(size, atmosphere);
        const population = this.generatePopulation();
        const government = this.generateGovernment(population);
        const lawLevel = this.generateLawLevel(government);
        const starport = this.generateStarport();
        const techLevel = this.generateTechLevel(starport, size, atmosphere, hydrographics, population, government);

        const result = `Size: ${size}\nAtmosphere: ${atmosphere}\nHydrographics: ${hydrographics}\nPopulation: ${population}\nGovernment: ${government}\nLaw Level: ${lawLevel}\nStarport: ${starport}\nTech Level: ${techLevel}`;

        // Get image based on generated characteristics
        const imageUrl = this.getImage(size, atmosphere, hydrographics, population, government);

        return { result, imageUrl };
    }
}

// Create an instance of WorldGenerator
const worldGenerator = new WorldGenerator();

// Event listener for the button
document.getElementById('generateBtn').addEventListener('click', () => {
    const { result, imageUrl } = worldGenerator.main();
    document.getElementById('result').textContent = result;
    document.getElementById('worldImage').src = imageUrl: 'https://cdn.midjourney.com/8b02ddeb-f0c9-414b-b3e7-aa3e0c068672/0_3.png;';
});
