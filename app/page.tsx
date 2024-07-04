'use client';

import { useState, useEffect } from 'react';
import './globals.css';

interface TreeNode {
  id?: string;
  label: string;
  children?: TreeNode[];
}

const isNodeSelected = (node: TreeNode, selectedNode: TreeNode | null): boolean => {
  if (node === selectedNode) {
    return true;
  }
  if (node.children) {
    return node.children.some((childNode) => isNodeSelected(childNode, selectedNode));
  }
  return false;
};

function TreeNode({ node, selectedNode, onSelect, isSelected, onSetSource, onSetTarget }: {
  node: TreeNode;
  selectedNode: TreeNode | null;
  onSelect: (node: TreeNode) => void;
  isSelected: boolean;
  onSetSource: (node: TreeNode) => void;
  onSetTarget: (node: TreeNode) => void;
}) {
  return (
    <div
      className={`node ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(node)}
    >
      <div className="mb-4">
        {node.label}
      </div>
      <div className="flex space-x-4">
        <button
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => onSetSource(node)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Set as Source
          </span>
        </button>

        <button
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={() => onSetTarget(node)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Set as Target
          </span>
        </button>
      </div>
      {node.children && (
        <ul className={`ml-8 ${isSelected ? 'selected' : ''}`}>
          {node.children.map((childNode) => (
            <li key={childNode.id || childNode.label}>
              <TreeNode
                node={childNode}
                selectedNode={selectedNode}
                onSelect={onSelect}
                isSelected={isNodeSelected(childNode, selectedNode)}
                onSetSource={onSetSource}
                onSetTarget={onSetTarget}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const moveNode = (sourceNode: TreeNode, targetNode: TreeNode, treeData: TreeNode[]): TreeNode[] => {
  const newTreeData = [...treeData];

  // Find the source node and remove it from its parent
  const findAndRemoveNode = (nodes: TreeNode[]): TreeNode | undefined => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === sourceNode) {
        return nodes.splice(i, 1)[0];
      }
      if (nodes[i].children) {
        const foundNode = findAndRemoveNode(nodes[i].children!);
        if (foundNode) {
          return foundNode;
        }
      }
    }
  };

  const removedNode = findAndRemoveNode(newTreeData);

  // Find the target node and add the source node as its child
  const findAndAddNode = (nodes: TreeNode[]) => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === targetNode) {
        if (!nodes[i].children) {
          nodes[i].children = [];
        }
        nodes[i].children!.push(removedNode!);
        return;
      }
      if (nodes[i].children) {
        findAndAddNode(nodes[i].children!);
      }
    }
  };

  findAndAddNode(newTreeData);

  return newTreeData;
};

export default function Home() {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);
  const [sourceNode, setSourceNode] = useState<TreeNode | null>(null);
  const [targetNode, setTargetNode] = useState<TreeNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the tree data from the API
    fetch('https://ubique.img.ly/frontend-tha/data.json')
      .then((res) => res.json())
      .then((data) => setTreeData(data))
      .catch((error) => {
        console.error('Error fetching tree data:', error);
        setError('Failed to fetch tree data');
      });
  }, []);

  const handleNodeClick = (node: TreeNode) => {
    if (selectedNode === node) {
      // Deselect the node if it's already selected
      setSelectedNode(null);
      setAdditionalData(null);
    } else {
      // Select the node and fetch additional data if it's a leaf node
      setSelectedNode(node);
      if (!node.children) {
        fetch(`https://ubique.img.ly/frontend-tha/entries/${node.id}.json`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else if (res.status === 404) {
              throw new Error('Data not found');
            } else {
              throw new Error('Failed to fetch data');
            }
          })
          .then((data) => setAdditionalData(data))
          .catch((error) => {
            console.error('Error fetching additional data:', error);
            setAdditionalData(null);
            setError('Failed to fetch additional data');
          });
      } else {
        setAdditionalData(null);
      }
    }
  };

  const handleMoveNode = () => {
    if (sourceNode && targetNode) {
      const updatedTreeData = moveNode(sourceNode, targetNode, treeData);
      setTreeData(updatedTreeData);
      setSourceNode(null);
      setTargetNode(null);
      console.log(JSON.stringify(updatedTreeData, null, 2));
    } else {
      setError('Please select both source and target nodes');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tree Structure</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex">
        <div className="w-1/2">
          <ul className="tree-list">
            {treeData.map((node) => (
              <li key={node.id || node.label}>
                <TreeNode
                  node={node}
                  selectedNode={selectedNode}
                  isSelected={isNodeSelected(node, selectedNode)}
                  onSelect={handleNodeClick}
                  onSetSource={setSourceNode}
                  onSetTarget={setTargetNode}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-8">
          {additionalData && (
            <div>
              <h2 className="text-xl font-bold mb-2">Additional Data</h2>
              <pre className="bg-gray-500 p-4 rounded">{JSON.stringify(additionalData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Move Node</h2>
        <div className="mb-4">
          <p>Source Node: {sourceNode?.label || 'Not selected'}</p>
          <p>Target Node: {targetNode?.label || 'Not selected'}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleMoveNode}
          disabled={!sourceNode || !targetNode}
        >
          Move Node
        </button>
      </div>
    </div>
  );
}