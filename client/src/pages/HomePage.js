import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    page: {
        padding: '2% 10%'
    },
    root: {
      width: '48%',
      margin: '2%'
    },
    card: {
      minHeight: '150px',
      '&:hover': {
        background: '#CBC3E3',
     }
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    foot: {
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      textDecoration: 'underline'
    }
  })

export default function HomePage() {

    const classes = useStyles()    

    return (
        <>
        <Navigation name={'Home'} />
        <div className={classes.page}>
            <Typography component="div">
            <Box fontSize="h3.fontSize" textAlign="center">
                Welcome!
            </Box>
            </Typography>
            <Box display="flex">
                <Link to="/posts" className={classes.root}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Blog Posts
                            </Typography>
                            <br />
                            <Typography variant="body2" component="p">
                                Click here to view and edit all posts published to the LSE Law Review Blog.
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
                <Link to="/authors" className={classes.root}>
                    <Card className={classes.card} >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Blog Authors
                            </Typography>
                            <br />
                            <Typography variant="body2" component="p">
                                Click here to view and edit the details of all contributors and editors of the LSE Law Review Blog.
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            </Box>
            <Link to="/visitors"><Typography className={classes.foot} variant="body2" component="p">
                Visitors
            </Typography></Link>
        </div>
        </>
    )
}
