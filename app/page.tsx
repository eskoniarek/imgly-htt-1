'use client';

import { useState, useEffect } from 'react';
import './globals.css';

interface TreeNode {
  id?: string;
  label: string;
  children?: TreeNode[];
}

function TreeNode({ node, selectedNode, onSelect, isSelected }: {
  node: TreeNode;
  selectedNode: TreeNode | null;
  onSelect: (node: TreeNode) => void;
  isSelected: boolean;

}) {
  return (
    <div
      className={`node ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(node)}
    >
      {node.label}
      {node.children && (
        <ul>
          {node.children.map((childNode) => (
            <li key={childNode.id || childNode.label}>
              <TreeNode
                node={childNode}
                selectedNode={selectedNode}
                onSelect={onSelect}
                isSelected={selectedNode === node}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Home() {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [additionalData, setAdditionalData] = useState<any>(null);

  useEffect(() => {
    // Fetch the tree data from the API route
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setTreeData(data));
  }, []);

  const handleNodeClick = (node: TreeNode) => {
    if (selectedNode === node) {
      // Deselect the node if it's already selected
      setSelectedNode(null);
    } else {
      // Select the node and fetch additional data if it's a leaf node
      setSelectedNode(node);
      if (!node.children) {
        fetch(`https://ubique.img.ly/frontend-tha/entries/${node.id}.json`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error('Data not found');
            }
          })
          .then((data) => setAdditionalData(data))
          .catch((error) => {
            console.error(error);
            setAdditionalData(null);
          });
      } else {
        setAdditionalData(null);
      }
    }
  };

  return (
    <div>
      <h1>Tree Structure</h1>
      <ul>
        {treeData.map((node) => (
          <li key={node.id || node.label}>
            <TreeNode
              node={node}
              selectedNode={selectedNode}
              isSelected={selectedNode === node}
              onSelect={handleNodeClick}
            />
          </li>
        ))}
      </ul>
      {additionalData && (
        <div>
          <h2>Additional Data</h2>
          <pre>{JSON.stringify(additionalData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}