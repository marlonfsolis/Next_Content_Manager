import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

function ActiveLink({ children, href, linkClasses, exact = false }) {
  const router = useRouter();
  let routePath = "";
  routePath = router.asPath || "";

  const {classes, setClasses} = useState("navbar-item is-size-5 has-text-weight-semibold");

  const style = {
  //   marginRight: 10,
  //   color: routePath === href ? "red" : "black",
  };
  //let classes = classes || "navbar-item is-size-5 has-text-weight-semibold";
  
  useEffect(() => {

    if (exact) {
      if (href === routePath) {
        //classes = classes.concat(" is-active"); 
        setClasses(classes.concat(" is-active"));
      }
    } else if (routePath.startsWith(href)) {
      //classes = classes.concat(" is-active");
      setClasses(classes.concat(" is-active"));
    } 

  }); 

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={classes} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;
