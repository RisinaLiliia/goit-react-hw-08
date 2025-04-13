export const getNavLinkClass =
  (css) =>
  ({ isActive }) =>
    `${css.link} ${isActive ? css.active : ""}`;
