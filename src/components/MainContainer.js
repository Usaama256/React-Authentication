import classes from "./MainContainer.module.css";

const MainContainer = (props) => {
  return <div className={classes.app}>{props.children}</div>;
};

export default MainContainer;
