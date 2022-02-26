// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useState } from "react";

// function ActiveLink({ children, href, linkClasses, exact = false }) {
//   const router = useRouter();
//   let routePath = "";
//   routePath = router.asPath || "";

//   const {classes, setClasses} = useState("navbar-item is-size-5 has-text-weight-semibold");

//   const style = {
//   //   marginRight: 10,
//   //   color: routePath === href ? "red" : "black",
//   };
//   //let classes = classes || "navbar-item is-size-5 has-text-weight-semibold";
  
//   useEffect(() => {

//     if (exact) {
//       if (href === routePath) {
//         //classes = classes.concat(" is-active"); 
//         setClasses(classes.concat(" is-active"));
//       }
//     } else if (routePath.startsWith(href)) {
//       //classes = classes.concat(" is-active");
//       setClasses(classes.concat(" is-active"));
//     } 

//   }); 

//   const handleClick = (e) => {
//     e.preventDefault();
//     router.push(href);
//   };

//   return (
//     <a href={href} onClick={handleClick} className={classes} style={style}>
//       {children}
//     </a>
//   );
// }

// export default ActiveLink;




import { useRouter } from 'next/router'
import React, { Children } from 'react'

const ActiveLink = ({ children, exact, ...props }) => {
  const router = useRouter();
  const { asPath } = useRouter();
  const href = props.href;
  const child = Children.only(<div>{children}</div>);
  const childClassName = "navbar-item is-size-5 has-text-weight-semibold";
  const activeClassName = "is-active";
  const isExact = exact || false;

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
  };

  return (
    <a href={href} onClick={handleClick} className={classes}>
      {children}
    </a>
  )
}

export default ActiveLink;