import React, { useEffect } from 'react'
import Navigation from '../components/Navigation'
import Typography from '@material-ui/core/Typography'

export default function NotFoundPage({ history }) {

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 1500)
    }, [history])

    return (
        <>
            <Navigation name="Error 404" />
            <Typography style={{ textAlign: 'center', margin: '20px' }} variant="h4">
                The page that you were looking for does not exist. Redirecting you to the home page...
            </Typography>
        </>
    )
}
