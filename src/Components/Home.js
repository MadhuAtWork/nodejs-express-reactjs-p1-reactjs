import React from "react";
import { useLocation } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const mainmenuList = location.state;
  const data = localStorage.getItem("key");
  return (
    <div className="homeContainer">
      <div className="homemain">
        {mainmenuList?.map((value, index) => {
          return (
            <div className="homeMenucard">
              <Link to={value.path} state={mainmenuList}>
                <h3>{value.menu}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
