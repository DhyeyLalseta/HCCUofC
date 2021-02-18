/* eslint-disable react/no-array-index-key */
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const SidebarLink = ({ path }: { path: string }) => {
  return (
    <>
      <NavLink
        exact
        to={path}
        className="sidebar-link"
        activeClassName="sidebar-link__active"
      >
        {path !== "/" ? path.slice(1) : "home"}
      </NavLink>
    </>
  );
};

const Sidebar = ({ paths }: { paths: string[] }): JSX.Element => {
  return (
    <div className="sidebar d-flex h-100 w-100 justify-content-center align-items-center">
      <div className="d-flex flex-column">
        {paths.map((path, index) => (
          <li key={index} className="sidebar-link-list-element mb-3">
            <SidebarLink key={index} path={path} />
          </li>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
