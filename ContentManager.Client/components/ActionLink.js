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