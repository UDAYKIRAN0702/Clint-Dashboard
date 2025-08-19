import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown, FaUserTie } from 'react-icons/fa';
import './cat.css';

// Tree Node Component
const TreeNode = ({ node }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="tree-node">
      <div className="node-row">
        {hasChildren ? (
          <button
            className="toggle-btn"
            aria-label={open ? 'Collapse' : 'Expand'}
            onClick={() => setOpen(!open)}
          >
            {open ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        ) : (
          <span className="spacer" />
        )}

        <span className="node-icon"><FaUserTie /></span>
        <span className="node-label">
          <strong>{node.role}</strong>
          {node.name && <span className="node-name"> — {node.name}</span>}
        </span>
      </div>

      {hasChildren && open && (
        <div className="children">
          {node.children.map((child, index) => (
            <TreeNode key={`${child.role}-${index}`} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main OrgTree Component
export default function OrgTree() {
  const data = {
    role: 'CEO',
    name: 'Rakesh',
    Mail:'rakesh123@GiMailShirt.com',
    children: [
      {
        role: 'Manager',
        name: 'Jabi Vallu',
            Mail:'Jabi123@GiMailShirt.com',

        children: [
          {
            role: 'Market Manager',
            name: 'NRL Swamy',
            children: [
              { role: 'Marketing Associate', name: 'Suresh Reddy' },
            ],
          },
        //  {
          //  role: 'Market Manager',
         //   name: 'Ram',
          //  children: [
           //   { role: 'Marketing Associate', name: 'Kavya Rao' },
          //  ],
         // },
        ],
      },
    ],
  };

  return (
    <div className="org-tree-wrapper">
      <h2>Organization Tree</h2>
      <div className="org-tree">
        <TreeNode node={data} />
      </div>
      <div>      <h>company contact details</h>
</div>
    </div>
   
  );
}
