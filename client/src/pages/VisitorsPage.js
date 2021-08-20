import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import { DataGrid } from '@material-ui/data-grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { API_URL } from '../config' 

const useStyles = makeStyles({
    title: {
        margin: '20px',
        textAlign: 'center'
    }
})

export default function VisitorsPage({ history }) {

    const classes = useStyles()

    const [visitors, setVisitors] = useState([])
    const [countries, setCountries] = useState([])
    const [entries, setEntries] = useState([])
    const [failed, setFailed] = useState(false)

    const visitorColumns = [
        {field: 'time', headerName: 'Time', flex: 5, minWidth: '200px', valueFormatter: (params) => {
            return new Date(params.value)
        }},
        {field: 'location', headerName: 'Country', flex: 2, minWidth: '200px'},
        {field: 'entry', headerName: 'Entry point', flex: 5, minWidth: '200px'}
    ]

    const countryColumns = [
        {field: 'country', headerName: 'Country', flex: 5, minWidth: '200px'},
        {field: 'value', headerName: 'Value', flex: 2, minWidth: '100px'}
    ]

    const entryColumns = [
        {field: 'entry', headerName: 'Entry point', flex: 5, minWidth: '200px'},
        {field: 'value', headerName: 'Value', flex: 2, minWidth: '100px'}
    ]

    useEffect(() => {
        (async () => {
            const pw = window.prompt('Please enter the access code to view this page!')
            const res = await fetch(`${API_URL}/visits/visitors?pw=${pw}`, { 
                credentials: 'include'
             })
            if(res.status !== 200) {
                setFailed(true)
                return
            }
            const dat = await res.json()
            const merged = dat.map(v => {
                return {...v, id: v._id, entry: v.entry || 'N/A'}
            })
            setVisitors(merged)
            const locmap = {}
            dat.forEach(v => {
                locmap[v.location] = locmap[v.location] ? ++locmap[v.location] : 1
            })
            const arr = []
            Object.keys(locmap).forEach((country, idx) => {
                arr.push({id: idx, country, value: locmap[country]})
            })
            setCountries(arr.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0))
            const entrymap = {}
            dat.forEach(v => {
                if(v.entry && v.entry.split('blog.lselawreview.com').length > 1) {
                    entrymap[v.entry.slice(29)] = entrymap[v.entry.slice(29)] ? ++entrymap[v.entry.slice(29)] : 1
                }
            })
            const arr2 = []
            Object.keys(entrymap).forEach((entry, idx) => {
                arr2.push({id: idx, entry, value: entrymap[entry]})
            })
            setEntries(arr2.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0))
        })()
    }, [])

    if(failed) {
        history.push('/')
    }

    return (
        <>
            <Navigation name="Visitors" />
            <Typography variant="h4" className={classes.title}>
                Top countries
            </Typography>
            <DataGrid autoHeight style={{width: '98%', margin: '10px auto'}} sortingOrder={['asc', 'desc']}
                rows={countries}
                columns={countryColumns} />
            <Typography variant="h4" className={classes.title}>
                Top entry points
            </Typography>
            <DataGrid autoHeight style={{width: '98%', margin: '10px auto'}} sortingOrder={['asc', 'desc']}
                rows={entries}
                columns={entryColumns} />
            <Typography variant="h4" className={classes.title}>
                All visitors
            </Typography>
            <DataGrid autoHeight style={{width: '98%', margin: '10px auto'}} sortingOrder={['asc', 'desc']}
                rows={visitors}
                columns={visitorColumns} />
        </>
    )
}
