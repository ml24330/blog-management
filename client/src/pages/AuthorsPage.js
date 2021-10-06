import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import Navigation from '../components/Navigation'
import Button from '@material-ui/core/Button'
import Warning from '../components/Warning'
import { API_URL, WEBSITE_URL } from '../config'

export default function AuthorsPage() {

    const [authors, setAuthors] = useState([])
    const [loggedIn, setLoggedIn] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/authors`, {
                credentials: 'include'
            })
            if(res.status === 401) {
                setLoggedIn(false)
                return
            }
            const dat = await res.json()
            const withId = dat.map(author => {
                const id = author._id
                const url = `${WEBSITE_URL}/author/${author.name}`
                const _image = author.image ? 'Yes' : 'No'
                return {...author, id, url, _image}
            })
            setAuthors(withId)
        })()
    }, [])

    const columns = [
        {field: 'name', headerName: 'Name', flex: 1.8, minWidth: 150},
        {field: 'category', headerName: 'Category', flex: 1.4, minWidth: 150, valueFormatter: (params) => params.value.charAt(0).toUpperCase() + params.value.slice(1) },
        {field: 'bio', headerName: 'Bio', flex: 5, minWidth: 150},
        {field: '_image', headerName: 'Has avatar?', flex: 1.3, minWidth: 150},
        {field: '_id', sortable: false, headerName: '\n', flex: 0.7, minWidth: 80, renderCell: (params) => (
            <Link style={{margin: 'auto'}} to={`/author/${params.value}`}><Button variant="contained" color="secondary">Edit</Button></Link>
        )},
        {field: 'url', sortable: false, headerName: '\n', flex: 1.5, minWidth: 150, renderCell: (params) => (
            <a href={params.value} style={{margin: 'auto'}} rel="noopener noreferrer" target="_blank"><Button variant="contained" color="primary">View on blog</Button></a>
        )}
    ]

    return (
        <>
            <Navigation name={'All Authors'} />
            <div style={{margin: '20px', textAlign: 'center'}}>
                {!loggedIn && <Warning />}
                <Link to="/authors/add"><Button variant="contained" color="secondary" >Add Author</Button></Link>
            </div>
            <DataGrid autoHeight style={{width: '98%', margin: 'auto'}} sortingOrder={['asc', 'desc']}
                rows={authors}
                columns={columns} />
        </>
    )
}
