// import {  } from "@mui/lab";
// import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const jsonData0 = [
    {
      name: "RAM",
      routeGroup: [
        { name: "4GB", routeLink: "/4GB" },
        { name: "6GB", routeLink: "/6GB" },
      ],
    },
    {
      name: "OS",
      routeGroup: [
        {
          name: "Windows",
          routeGroup: [
            { name: "8", routeLink: "/8" },
            { name: "10", routeLink: "/10" },
            { name: "11", routeLink: "/11" },
          ],
        },
        {
          name: "Android",
          routeGroup: [
            { name: "Kitkat", routeLink: "/Kitkat" },
            { name: "Lalipop", routeLink: "/Lalipop" },
          ],
        },
        { name: "linex", routeLink: "/linex" },
      ],
    },
    {
      name: "Devices",
      routeGroup: [
        { name: "Mobile", routeLink: "/Mobile" },
        { name: "Laptop", routeLink: "/Laptop" },
        {
          name: "Tab",
          routeGroup: [
            { name: "Sumsung", routeLink: "/Sumsung" },
            { name: "Apple", routeLink: "/Apple" },
          ],
        },
      ],
    },
    { name: "Profile", routeLink: "/profile" },
    { name: "Posts", routeLink: "/posts" },
  ];
  const jsonData = [
    { RAM: ["4GB", "6GB"] },
    {
      OS: [
        { Windows: ["8", "10", "11"] },
        { Android: ["Kitkat", "Lalipop"] },
        "linex",
      ],
    },
    {
      Device: ["Mobile", "Laptop", { Tab: ["Sumsung", "Apple"] }],
    },
    "Profile",
    "Posts",
  ];
  return (
    <div>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          marginTop: "16px",
          height: "90vh",
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
        }}
      >
        {jsonData.map((item, ind, arr) => {
          //level 1
          if (typeof item === "string") {
            return (
              <Link
                key={item + ind}
                to={item}
                style={{
                  // textDecoration: "none",
                  // color: "Black",
                  textDecoration: "inherit",
                  color: "inherit",
                }}
              >
                <TreeItem nodeId={item} label={item} />
              </Link>
            );
          } else {
            const objKeyName = Object.keys(item)[0];
            const firstChild = arr[ind][objKeyName];
            return (
              <TreeItem nodeId={objKeyName} label={objKeyName}>
                {firstChild.map((subItem, subInd, subArr) => {
                  // level 2
                  if (typeof subItem === "string") {
                    return (
                      <Link
                        key={subItem + subInd}
                        to={subItem}
                        style={{
                          textDecoration: "none",
                          color: "Black",
                        }}
                      >
                        <TreeItem nodeId={subItem} label={subItem} />
                      </Link>
                    );
                  } else {
                    // console.log("@@subItem", subItem);.
                    const subObjKeyName = Object.keys(subItem)[0];
                    const secondChild = subArr[subInd][subObjKeyName];
                    // console.log("@@test", subObjKeyName, secondChild);
                    return (
                      <TreeItem nodeId={subObjKeyName} label={subObjKeyName}>
                        {secondChild.map((subChildItem, subChildIndex) => {
                          // level 3
                          return (
                            <Link
                              key={subChildItem + subChildIndex}
                              to={subChildItem}
                              style={{
                                textDecoration: "none",
                                color: "Black",
                              }}
                            >
                              <TreeItem
                                nodeId={subChildItem}
                                label={subChildItem}
                              />
                            </Link>
                          );
                        })}
                      </TreeItem>
                    );
                  }
                })}
              </TreeItem>
            );
          }
        })}
      </TreeView>
    </div>
  );
};

export default SideDrawer;
