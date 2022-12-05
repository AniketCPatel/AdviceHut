import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  //   background: rgb(238,174,202);
  // background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Pre - Advice
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
