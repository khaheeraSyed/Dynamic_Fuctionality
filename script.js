// Function to fetch JSON data and render tasks and assets
async function fetchAndRenderData() {
    const response = await fetch('https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json');
    const projectData = await response.json();

    // Assuming you want to render a specific task based on an ID
    const taskId = 'YOUR_TASK_ID'; // Replace with the actual Task ID you want to render
    const task = projectData.tasks.find(t => t.taskID === taskId);

    if (task) {
        renderTask(task);
    } else {
        console.error('Task not found');
    }
}

// Function to render a task and its assets
function renderTask(task) {
    const container = document.getElementById('asset-container');
    container.innerHTML = ''; // Clear previous content

    const taskHeader = document.createElement('h2');
    taskHeader.innerText = `Task: ${task.taskName}`; // Assuming task has a taskName property
    container.appendChild(taskHeader);

    task.assets.forEach(asset => {
        const assetHTML = createAssetContainer(asset);
        container.appendChild(assetHTML);
    });
}

// Function to create an asset container
function createAssetContainer(asset) {
    const assetDiv = document.createElement('div');
    assetDiv.className = 'asset';

    const assetHeader = document.createElement('div');
    assetHeader.className = 'asset-header';
    assetHeader.innerHTML = `<span>${asset.assetName} (${asset.assetType})</span><span class="arrow">▶</span>`;
    assetDiv.appendChild(assetHeader);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';
    descriptionDiv.innerHTML = `<p>${asset.description}</p>`;

    // Add media if available
    if (asset.media) {
        if (asset.assetType === "Video") {
            descriptionDiv.innerHTML += `<div class="video-container"><iframe width="100%" height="200" src="${asset.media}" frameborder="0" allowfullscreen></iframe></div>`;
        } else if (asset.assetType === "Audio") {
            descriptionDiv.innerHTML += `<div class="audio-container"><audio controls><source src="${asset.media}" type="audio/mpeg">Your browser does not support the audio element.</audio></div>`;
        }
    }

    assetDiv.appendChild(descriptionDiv);
    
    // Toggle description on header click
    assetHeader.addEventListener('click', () => {
        const isExpanded = descriptionDiv.classList.toggle('expanded');
        assetHeader.querySelector('.arrow').style.transform = isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
    });

    return assetDiv;
}

// Initialize fetching and rendering
fetchAndRenderData();
