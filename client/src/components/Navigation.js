import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home';
import { useCookies } from "react-cookie"

const useStyles = makeStyles(theme => ({
  link: {
      fontSize: '1rem',
      '&:hover': {
        color: '#CBC3E3'
     }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Navigation({ name }) {

  const [_0, _1, removeCookie] = useCookies(['session-token'])
  const [_2, _3, _removeCookie] = useCookies(['auth-token'])


  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" className={classes.title}>
          {name}
        </Typography>
        <Button color="inherit" onClick={() => {removeCookie('session-token');_removeCookie('auth-token');localStorage.clear();window.location.reload()}}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  )
}