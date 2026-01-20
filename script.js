let items = [];
let currentFilter = 'pending'; // Global state for sorting
const itemsdiv = document.getElementById("items");
const input = document.getElementById("itemInput");
const storageKey = "items_v2";

const renderItems = () => {
    // Clear display
    while (itemsdiv.firstChild) {
        itemsdiv.removeChild(itemsdiv.firstChild);
    }

    // Filter items based on current selection
    const filteredItems = items.filter(item => item.status === currentFilter);

    filteredItems.forEach((item) => {
        // Find actual index in the main 'items' array for modifications
        const originalIndex = items.indexOf(item);

        const container = document.createElement("div");
        container.className = "item-row";
        
        const text = document.createElement("span"); // Changed to span for better flex behavior
        text.className = `item-text ${item.status === 'completed' ? 'completed-text' : ''}`;
        text.textContent = item.text;
        text.onclick = () => toggleStatus(originalIndex);
        
        // Toggle Complete on click
        text.onclick = () => toggleStatus(originalIndex);
        
        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-btn";
        button.onclick = (e) => {
            e.stopPropagation(); // Prevents triggering the toggleStatus when clicking delete
            removeItem(originalIndex);
        };

        container.appendChild(text);
        container.appendChild(button);
        itemsdiv.appendChild(container);
    });
};

const setFilter = (status) => {
    currentFilter = status;
    // Update UI active state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === status);
    });
    renderItems();
};

const toggleStatus = (idx) => {
    items[idx].status = items[idx].status === 'pending' ? 'completed' : 'pending';
    saveItems();
    renderItems();
};

const addItem = () => {
    const value = input.value.trim();
    if (!value) {
        alert("You cannot add an empty item");
        return;
    }
    // New structure: Object with status
    items.push({ text: value, status: 'pending' });
    input.value = "";
    saveItems();
    renderItems();
};

const removeItem = (idx) => {
    // "Deleted" state - in this structure, we remove from array 
    // but you could set status to 'deleted' if you want a trash bin
    items.splice(idx, 1);
    saveItems();
    renderItems();
};

const loadItems = () => {
    const data = localStorage.getItem(storageKey);
    if (data) items = JSON.parse(data);
    renderItems();
};

const saveItems = () => {
    localStorage.setItem(storageKey, JSON.stringify(items));
};

// Handle Enter Key
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addItem();
});

document.addEventListener("DOMContentLoaded", loadItems);