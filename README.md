TODO List Pro
A lightweight, mobile-responsive Task Management application built with Vanilla JavaScript (ES6+), HTML5, and CSS3. This project features task state management, local storage persistence, and a clean user interface optimized for all devices.

Features
Task States: Manage tasks through three primary states: Pending, Completed, and Deleted.

Dynamic Filtering: Toggle between "Pending" and "Completed" views to stay organized.

Data Persistence: All tasks are saved to the browser's localStorage, ensuring your data remains even after refreshing the page.

Mobile-First Design: Fully responsive layout that adapts to desktops, tablets, and smartphones.

Secure DOM Updates: Uses modern DOM manipulation techniques instead of innerHTML to prevent XSS vulnerabilities.

Project Structure
The project is contained within three main files:

File,       Description

index.html, "The semantic structure of the app, including the filter navigation and input areas."

style.css,  "Modern, vanilla CSS featuring Flexbox for layout and Media Queries for responsiveness."

script.js,  "ES6+ logic handling state management, storage, and dynamic rendering."

How to Use
1. Adding a Task
Type your task into the input field at the bottom and click "Add Item" or press the Enter key. New tasks are automatically categorized as Pending.

2. Completing a Task
While in the "Pending" tab, click on the text of any task. It will automatically move to the Completed tab and appear with a strikethrough.

3. Sorting/Filtering
Use the navigation tabs at the top to switch between your current active tasks (Pending) and those you have finished (Completed).

4. Deleting a Task
Click the red "Delete" button on any task row. This will permanently remove the item from your list and local storage.

Installation
No installation or build process is required. To run the project locally:

Download the index.html, style.css, and script.js files into the same folder.

Open index.html in any modern web browser (Chrome, Firefox, Safari, or Edge).

Technical Details
Language: JavaScript ES6+ (Arrow functions, Template Literals, Destructuring).

Storage: window.localStorage (Data is stored as a JSON string).

Styling: Vanilla CSS (No frameworks like Bootstrap or Tailwind required).

Responsiveness: Uses flex-shrink and min-width properties to prevent layout breaking on mobile screens.