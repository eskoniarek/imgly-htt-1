import { TreeNode } from './types';


export const isNodeSelected = (node: TreeNode, selectedNode: TreeNode | null): boolean => {
    if (node === selectedNode) {
      return true;
    }
    if (node.children) {
      return node.children.some((childNode) => isNodeSelected(childNode, selectedNode));
    }
    return false;
  };

export const moveNode = (sourceNode: TreeNode, targetNode: TreeNode, treeData: TreeNode[]): TreeNode[] => {
  const newTreeData = JSON.parse(JSON.stringify(treeData));

  const findNode = (nodes: TreeNode[], nodeToFind: TreeNode): TreeNode | undefined => {
    for (const node of nodes) {
      if (node === nodeToFind) {
        return node;
      }
      if (node.children) {
        const foundNode = findNode(node.children, nodeToFind);
        if (foundNode) {
          return foundNode;
        }
      }
    }
  };

  const removeNode = (nodes: TreeNode[], nodeToRemove: TreeNode): TreeNode | undefined => {
    const index = nodes.findIndex((node) => node === nodeToRemove);
    if (index !== -1) {
      return nodes.splice(index, 1)[0];
    }
    for (const node of nodes) {
      if (node.children) {
        const removedNode = removeNode(node.children, nodeToRemove);
        if (removedNode) {
          return removedNode;
        }
      }
    }
  };

  const addNode = (nodes: TreeNode[], parentNode: TreeNode, nodeToAdd: TreeNode): void => {
    const node = findNode(nodes, parentNode);
    if (node) {
      if (!node.children) {
        node.children = [];
      }
      node.children.push(nodeToAdd);
    } else {
      for (const node of nodes) {
        if (node.children) {
          addNode(node.children, parentNode, nodeToAdd);
        }
      }
    }
  };

  const removedNode = removeNode(newTreeData, sourceNode);
  if (removedNode) {
    addNode(newTreeData, targetNode, removedNode);
  }

  return newTreeData;
};