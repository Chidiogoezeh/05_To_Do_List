let items = [];
let currentFilter = 'pending'; // Controls which tab is currently viewed
const itemsdiv = document.getElementById("items");
const input = document.getElementById("itemInput");
const storageKey = "items_v3"; // Updated key to avoid conflicts with old data structures

// Renders the list based on the current filter, uses DOM methods instead of innerHTML for security
const renderItems = () => {
    // Clear the current list display efficiently
    while (itemsdiv.firstChild) {
        itemsdiv.removeChild(itemsdiv.firstChild);
    }

    // Filter items to show only those matching the current tab
    const filteredItems = items.filter(item => item.status === currentFilter);

    filteredItems.forEach((item) => {
        // Find the index in the original 'items' array to ensure we update the correct object
        const originalIndex = items.indexOf(item);

        const container = document.createElement("div");
        container.className = "item-row";
        
        const text = document.createElement("span");
        text.className = `item-text ${item.status === 'completed' ? 'completed-text' : ''}`;
        text.textContent = item.text;
        
        // Button Container for the right side of the row
        const btnGroup = document.createElement("div");
        btnGroup.className = "button-group"; // Styling hook for flex layout
        btnGroup.style.display = "flex";
        btnGroup.style.gap = "8px";
        btnGroup.style.flexShrink = "0"; // Prevents buttons from squishing on mobile

        // Logic: Conditional Button Rendering based on state
        if (currentFilter === 'pending') {
            // Pending Tab: Show "Done" button to move to Completed
            const doneBtn = document.createElement("button");
            doneBtn.textContent = "Done";
            doneBtn.className = "done-btn";
            doneBtn.onclick = () => updateStatus(originalIndex, 'completed');
            btnGroup.appendChild(doneBtn);

        } else if (currentFilter === 'completed') {
            // Completed Tab: Show "Delete" button to move to Trash (Deleted)
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            deleteBtn.onclick = () => updateStatus(originalIndex, 'deleted');
            btnGroup.appendChild(deleteBtn);

        } else if (currentFilter === 'deleted') {
            // Trash Tab: Show "Restore" AND "Purge" buttons
            const restoreBtn = document.createElement("button");
            restoreBtn.textContent = "Restore";
            restoreBtn.className = "done-btn"; // Reusing blue color for restore
            restoreBtn.onclick = () => updateStatus(originalIndex, 'pending');

            const purgeBtn = document.createElement("button");
            purgeBtn.textContent = "Purge";
            purgeBtn.className = "delete-btn"; // Red color for permanent delete
            purgeBtn.onclick = () => purgeItem(originalIndex);

            btnGroup.appendChild(restoreBtn);
            btnGroup.appendChild(purgeBtn);
        }

        container.appendChild(text);
        container.appendChild(btnGroup);
        itemsdiv.appendChild(container);
    });
};

// Switches the view between Pending, Completed, and Trash
const setFilter = (status) => {
    currentFilter = status;
    // Update visual "active" state of filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        // Check if button text matches the status
        btn.classList.toggle('active', btn.textContent.toLowerCase() === status);
    });
    renderItems();
};

// Updates an item's status and refreshes storage
const updateStatus = (idx, newStatus) => {
    items[idx].status = newStatus;
    saveItems();
    renderItems();
};

// Permanently removes an item from the array (Purge)
const purgeItem = (idx) => {
    if (confirm("Are you sure you want to permanently delete this task?")) {
        items.splice(idx, 1);
        saveItems();
        renderItems();
    }
};

// Adds a new task to the 'pending' state
const addItem = () => {
    const value = input.value.trim();
    if (!value) {
        alert("Task cannot be empty!");
        return;
    }
    
    items.push({ 
        text: value, 
        status: 'pending',
        id: Date.now() // Unique ID for better tracking
    });

    input.value = "";
    saveItems();
    renderItems();
};

// LocalStorage management
const saveItems = () => {
    localStorage.setItem(storageKey, JSON.stringify(items));
};

const loadItems = () => {
    const data = localStorage.getItem(storageKey);
    if (data) {
        items = JSON.parse(data);
    }
    renderItems();
};

// Listeners
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addItem();
});

document.addEventListener("DOMContentLoaded", loadItems);