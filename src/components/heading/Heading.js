import React from "react";
import styles from "./Heading.scss"; // Assuming you're still using SCSS for modular styling

const Heading = ({ children, heading }) => {
  const headingClass = `${styles.heading} ${heading}`;

  return <h3 className={headingClass}>{children}</h3>;
};

export default Heading;
