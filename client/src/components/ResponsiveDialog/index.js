import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ResponsiveDialog({ open, children, onClose, title, saveButton }) {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={Boolean(open)}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar className={`${classes.appBar} responsive-dialog-app-bar`}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {saveButton}
        </Toolbar>
      </AppBar>
      {children}
    </Dialog>
  );
}

export default ResponsiveDialog;
