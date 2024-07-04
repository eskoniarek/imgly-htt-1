// import { TreeNode } from './../types';
// import { isNodeSelected, moveNode } from './../utils';

// describe('isNodeSelected', () => {
//   const tree: TreeNode = {
//     id: '1',
//     label: 'Node 1',
//     children: [
//       { id: '2', label: 'Node 2' },
//       { id: '3', label: 'Node 3' },
//     ],
//   };

//   it('should return true when the node is selected', () => {
//     const selectedNode: TreeNode = { id: '2', label: 'Node 2' };
//     expect(isNodeSelected(selectedNode, selectedNode)).toBe(true);
//   });

//   it('should return true when a parent node of the selected node is checked', () => {
//     const selectedNode: TreeNode = { id: '2', label: 'Node 2' };
//     expect(isNodeSelected(tree, selectedNode)).toBe(true);
//   });

//   it('should return false when the node is not selected', () => {
//     const selectedNode: TreeNode = { id: '4', label: 'Node 4' };
//     expect(isNodeSelected(tree, selectedNode)).toBe(false);
//   });
// });

// describe('moveNode', () => {
//   const tree: TreeNode[] = [
//     {
//       id: '1',
//       label: 'Node 1',
//       children: [
//         { id: '2', label: 'Node 2' },
//         { id: '3', label: 'Node 3' },
//       ],
//     },
//     { id: '4', label: 'Node 4' },
//   ];

//   it('should move the source node to the target node', () => {
//     const sourceNode: TreeNode = { id: '2', label: 'Node 2' };
//     const targetNode: TreeNode = { id: '4', label: 'Node 4' };
//     const updatedTree = moveNode(sourceNode, targetNode, tree);

//     expect(updatedTree[0].children).toHaveLength(1);
//     expect(updatedTree[0].children![0].id).toBe('3');
//     expect(updatedTree[1].children).toHaveLength(1);
//     expect(updatedTree[1].children![0].id).toBe('2');
//   });
// });