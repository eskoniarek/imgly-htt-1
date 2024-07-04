import { TreeNode as TreeNodeType } from '../lib/types';

const isNodeSelected = (node: TreeNodeType, selectedNode: TreeNodeType | null): boolean => {
  if (node === selectedNode) {
    return true;
  }
  if (node.children) {
    return node.children.some((childNode) => isNodeSelected(childNode, selectedNode));
  }
  return false;
};

interface TreeNodeProps {
  node: TreeNodeType;
  selectedNode: TreeNodeType | null;
  onSelect: (node: TreeNodeType) => void;
  isSelected: boolean;
  onSetSource: (node: TreeNodeType) => void;
  onSetTarget: (node: TreeNodeType) => void;
}

export function TreeNode({ node, selectedNode, onSelect, isSelected, onSetSource, onSetTarget }: TreeNodeProps) {
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