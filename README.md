# Tree Structure Visualization and Manipulation

This project is a web application built with Next.js and TypeScript that fetches and displays a tree structure from a JSON endpoint. 
Tool allows users to interact with the tree by highlighting nodes and their descendants, fetching additional data for leaf nodes, and moving nodes within the tree structure.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/eskoniarek/imgly-htt-1.git
```
1. Install dependencies:

```bash
npm i
# or
yarn 
```
3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows the Next.js app router structure and uses TypeScript for type safety. The main components and files are:

- `app/page.tsx`: The main page component that fetches and displays the tree structure, handles user interactions, and manages the application state.
- `app/globals.css`: The CSS file that contains the global styles for the application, including the styles for the tree nodes, buttons, and additional data display.
- `README.md`: The documentation file that provides an overview of the project, installation instructions, and usage guidelines.

## Functionality

The application provides the following functionality:

### Fetching and Displaying the Tree Structure

The `fetchTreeData` function fetches the tree structure data from the specified JSON endpoint (`https://ubique.img.ly/frontend-tha/data.json`) and updates the application state with the fetched data. The tree structure is then rendered using the `TreeNode` component, which recursively renders the nodes and their children.

### Node Selection and Highlighting

When a node in the tree is clicked, the `handleNodeClick` function is called. If the clicked node is already selected, it is deselected, and the additional data (if any) is cleared. If the clicked node is not selected, it becomes the selected node, and its descendants are highlighted by applying the `selected` CSS class.

### Fetching Additional Data for Leaf Nodes

If the selected node is a leaf node (i.e., it has no children), the `fetchAdditionalData` function is called. It fetches additional data for the leaf node from the specified JSON endpoint (`https://ubique.img.ly/frontend-tha/entries/${id}.json`) and updates the application state with the fetched data. The additional data is then displayed beside the tree structure.

### Moving Nodes within the Tree Structure

The application provides a UI for moving nodes within the tree structure. Users can select a source node and a target node using the "Set as Source" and "Set as Target" buttons. When the "Move Node" button is clicked, the `handleMoveNode` function is called. It invokes the `moveNode` function, which removes the source node and its subtree from its current position and adds it as a child of the target node. The updated tree structure is then logged to the console.

## Error Handling

The application includes error handling for failed data fetching and node movement operations. If an error occurs during data fetching or node movement, an error message is displayed to the user, and the application state is updated accordingly.

## UI and Styling

The application uses Tailwind CSS for styling and layout. The tree nodes, buttons, and additional data display are styled using utility classes and custom CSS classes defined in the `globals.css` file. The UI is responsive and provides a user-friendly experience for interacting with the tree structure.

## Conclusion

This project demonstrates the implementation of a tree structure visualization and manipulation application using Next.js, TypeScript, and React. It showcases the ability to fetch and display data from a JSON endpoint, handle user interactions, fetch additional data for leaf nodes, and move nodes within the tree structure. The code is structured and documented for readability and maintainability.

Feel free to explore the code and provide any feedback or suggestions for improvement.