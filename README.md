TODO List
A lightweight, mobile-responsive Task Management application built with Vanilla JavaScript (ES6+), HTML5, and CSS3. This project features a robust three-tier task state management system, local storage persistence, and a layout optimized to prevent text-squishing on small devices.

Features
Advanced Task States: Manage tasks through three distinct lifecycles: Pending, Completed, and Deleted (Trash).

Dynamic Filtering: Seamlessly toggle between "Pending," "Completed," and "Trash" views to maintain focus.

Restoration & Purging: Recover tasks from the Trash or permanently delete them to clear storage.

Data Persistence: All tasks are saved to the browser's localStorage (v3), ensuring data survives refreshes.

Mobile-Optimized UI: Uses modern Flexbox properties like flex-shrink: 0 to ensure text remains readable and buttons stay accessible on mobile screens.

Secure DOM Updates: Implements modern DOM manipulation (textContent, appendChild) to prevent XSS vulnerabilities.

Project Structure
The project is contained within three main files:

File,       Description

index.html, The semantic structure of the app, including the filter navigation and input areas.

style.css,  Modern, vanilla CSS featuring Flexbox for layout and Media Queries for responsiveness.

script.js,  ES6+ logic handling state transitions, conditional button rendering, and permanent purging.

How to Use
1. Adding a Task
Type your task into the input field and click "Add Item" or press Enter. New tasks appear in the Pending tab.

2. Marking as Done
In the Pending tab, click the blue "Done" button. The task will move to the Completed tab with a strikethrough effect.

3. Deleting to Trash
In the Completed tab, click the red "Delete" button. This does not erase the task but moves it to the Trash for review.

4. Managing the Trash
In the Trash tab, you have two options:
Restore: Moves the task back to the Pending state.
Purge: Permanently deletes the task from the database after a confirmation prompt.

Installation
No installation or build process is required. To run the project locally:

Download index.html, style.css, and script.js into a single directory.

Open index.html in any modern browser (Chrome, Firefox, Safari, Edge).

Technical Details
Language: JavaScript ES6+ (Arrow functions, filter/indexOf methods).

Storage: window.localStorage using JSON serialization for complex objects.

Layout Engine: CSS Flexbox with flex-wrap and flex-shrink to solve the "single-letter column" bug on mobile browsers.

State Logic: Items are stored as objects: { text: string, status: 'pending' | 'completed' | 'deleted', id: number }.