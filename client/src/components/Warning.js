import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL } from '../config'

const useStyles = makeStyles({
    div: {
        textAlign: 'center',
        margin: '15px 0 15px 0'
    },
    link: {
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:hover': {
            color: 'purple'
        }
    }
})

export default function Warning() {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const classes = useStyles()

    return (
        <div className={classes.div}>
            <Typography variant="h5">
                WARNING: You are not logged in! Click <span onClick={() => {window.location.reload()}} className={classes.link}>here</span> to log in again.
            </Typography>
        </div>
    )
}
