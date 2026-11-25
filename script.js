// Scene content and choices for the Triangle tour.
// Replace the placeholder descriptions and image paths as the story is written.
const scenes = {
    airport: {
        title: "RDU Airport",
        paragraphs: [
            "Tony has arrived in the Triangle and is ready to explore.",
            "Choose a city to begin your adventure.",
            ""
        ],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        tooltip: "Raleigh, Durham, and Chapel Hill make up the Research Triangle.",
        choices: [
            { label: "Visit Raleigh", target: "raleigh" },
            { label: "Visit Durham", target: "durham" },
            { label: "Visit Chapel Hill", target: "chapelHill" }
        ]
    },
    raleigh: {
        title: "Raleigh",
        paragraphs: ["Tony is exploring Raleigh.", "Choose a museum. Use Back to return to the airport.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: [
            { label: "NC Museum of Natural Sciences", target: "naturalSciences" },
            { label: "NC Museum of Art", target: "raleighArt" }
        ]
    },
    durham: {
        title: "Durham",
        paragraphs: ["Tony is exploring Durham.", "Choose a museum. Use Back to return to the airport.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: [
            { label: "Museum of Life and Science", target: "lifeAndScience" },
            { label: "Nasher Museum of Art", target: "nasher" }
        ]
    },
    chapelHill: {
        title: "Chapel Hill",
        paragraphs: ["Tony is exploring Chapel Hill.", "Choose a museum. Use Back to return to the airport.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: [
            { label: "Ackland Art Museum", target: "ackland" },
            { label: "NC Botanical Garden", target: "botanicalGarden" }
        ]
    },
    naturalSciences: {
        title: "NC Museum of Natural Sciences",
        city: "raleigh",
        paragraphs: ["Tony is visiting the NC Museum of Natural Sciences.", "Add this museum's story or challenge here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    raleighArt: {
        title: "NC Museum of Art",
        city: "raleigh",
        paragraphs: ["Tony is visiting the NC Museum of Art.", "Add this museum's story or challenge here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    lifeAndScience: {
        title: "Museum of Life and Science",
        city: "durham",
        paragraphs: ["Tony is visiting the Museum of Life and Science.", "Add this museum's story or challenge here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    nasher: {
        title: "Nasher Museum of Art",
        city: "durham",
        paragraphs: ["Tony is visiting the Nasher Museum of Art.", "Add this museum's story or challenge here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    ackland: {
        title: "Ackland Art Museum",
        city: "chapel-hill",
        paragraphs: ["Tony is visiting the Ackland Art Museum.", "Add this museum's story or challenge here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    botanicalGarden: {
        title: "NC Botanical Garden",
        city: "chapel-hill",
        paragraphs: ["Tony is visiting the NC Botanical Garden.", "Add this museum's story or challenge here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    raleighEnding: {
        title: "Raleigh Ending",
        paragraphs: ["Tony ends the day in Raleigh.", "Add the Raleigh ending story here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    durhamEnding: {
        title: "Durham Ending",
        paragraphs: ["Tony ends the day in Durham.", "Add the Durham ending story here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    },
    chapelHillEnding: {
        title: "Chapel Hill Ending",
        paragraphs: ["Tony ends the day in Chapel Hill.", "Add the Chapel Hill ending story here.", ""],
        image: "triangle-map.png",
        imageAlt: "Map of the Triangle",
        choices: []
    }
};

// DOM elements
const elements = {
    location: document.getElementById("location"),
    image: document.getElementById("story-image"),
    tooltip: document.getElementById("tooltip"),
    paragraphs: [
        document.getElementById("paragraph1"),
        document.getElementById("paragraph2"),
        document.getElementById("paragraph3")
    ],
    choices: document.getElementById("choice-buttons"),
    back: document.getElementById("backButton"),
    endDay: document.getElementById("endDayButton")
};

// Game state
let currentSceneId = "airport";
const sceneHistory = [];
const visitedCities = new Set();

// Render the current scene
function renderScene() {
    const scene = scenes[currentSceneId];
    const isCityHub = ["raleigh", "durham", "chapelHill"].includes(currentSceneId);

    elements.location.textContent = scene.title;
    elements.image.src = scene.image;
    elements.image.alt = scene.imageAlt;
    elements.tooltip.textContent = scene.tooltip || "";

    elements.paragraphs.forEach((paragraph, index) => {
        paragraph.textContent = scene.paragraphs[index] || "";
    });

    elements.choices.replaceChildren();

    // Create choice buttons for the current scene
    scene.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.textContent = choice.label;
        button.addEventListener("click", () => moveToScene(choice.target));
        elements.choices.appendChild(button);
    });
    elements.back.hidden = sceneHistory.length === 0;
    elements.endDay.hidden = !isCityHub;
    elements.endDay.disabled = visitedCities.size < 3;
}

// Move to a new scene and update the history
function moveToScene(sceneId) {
    sceneHistory.push(currentSceneId);
    currentSceneId = sceneId;

    const scene = scenes[sceneId];
    if (scene.city) {
        visitedCities.add(scene.city);
    }

    renderScene();
}

// Event listeners for "Back" button
elements.back.addEventListener("click", () => {
    const previousSceneId = sceneHistory.pop();
    if (!previousSceneId) return;

    currentSceneId = previousSceneId;
    renderScene();
});

// Event listener for the "End Day" button
elements.endDay.addEventListener("click", () => {
    if (visitedCities.size < 3) return;

    const endingByCity = {
        raleigh: "raleighEnding",
        durham: "durhamEnding",
        chapelHill: "chapelHillEnding"
    };
    moveToScene(endingByCity[currentSceneId]);
});

renderScene();
