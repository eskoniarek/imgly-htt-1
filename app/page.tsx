'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import { TreeNode as TreeNodeType } from './../lib/types';
import { isNodeSelected, moveNode } from './../lib/utils';
import { TreeNode } from './../components/TreeNode';

export default function Home() {
  const [treeData, setTreeData] = useState<TreeNodeType[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNodeType | null>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);
  const [sourceNode, setSourceNode] = useState<TreeNodeType | null>(null);
  const [targetNode, setTargetNode] = useState<TreeNodeType | null>(null);
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

  const handleNodeClick = (node: TreeNodeType) => {
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