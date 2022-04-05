import { useRouter } from 'next/router'
import React from 'react'

const ActiveLink = ({ children, exact, type, ...props }) => {
  const router = useRouter();
  const { asPath } = useRouter();
  const href = props.href;
  let childClassName = "nav-link";
  const activeClassName = "active";
  const isExact = exact || false;
  let role = "button";

  if (type !== "navLink" && type !== "dropdownItem") {
    type = "navLink";
  }

  if (type === "dropdownItem") {
    childClassName = "dropdown-item";
    role = "";
  }

  let classes = childClassName;

  if (isExact) {
    if (href === asPath) {
      classes = `${childClassName} ${activeClassName}`.trim();
    }
  } else if (asPath.startsWith(href)) {
    classes = `${childClassName} ${activeClassName}`.trim();
  }

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
    const element = e.target.parentElement.previousElementSibling;
    element.click();
    // console.log(e);
  };

  return (
    <a role={role} href={href} onClick={handleClick} className={classes}>
      {children}
    </a>
  )
}

export default ActiveLink;