import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import Navigation from '../components/Navigation'
import Button from '@material-ui/core/Button'
import Warning from '../components/Warning'
import { API_URL, WEBSITE_URL } from '../config'

window.React = require('react')

const renderDate = (date) => {
    const MONTHS = {0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'}
    const d = new Date(date)
    const day = d.getDate()
    const month = MONTHS[d.getMonth()]
    const year = d.getFullYear()
    return `${day} ${month} ${year}`
}

export default function PostsPage() {

    const [posts, setPosts] = useState([])
    const [loggedIn, setLoggedIn] = useState(true)

    const columns = [
        {field: 'title', headerName: 'Title', flex: 3, minWidth: 150},
        {field: '_author', headerName: 'Author', flex: 1.5, minWidth: 150, valueFormatter: (params) => {
            return params.value.join(' & ')
        }},
        {field: '_categories', headerName: 'Categories', flex: 1.4, minWidth: 150},
        {field: 'date', headerName: 'Date', flex: 1.4, minWidth: 140, valueFormatter: (params) => {
            return renderDate(new Date(params.value))
        }},
        {field: 'content', headerName: 'Content', flex: 3, minWidth: 180},
        {field: '_id', sortable: false, headerName: '\n', flex: 0.7, minWidth: 80, renderCell: (params) => (
            <Link to={`/post/${params.value}`} style={{margin: 'auto'}} ><Button variant="contained" color="secondary" >Edit</Button></Link>
        )},
        {field: 'url', sortable: false, headerName: '\n', flex: 1.5, minWidth: 150, renderCell: (params) => (
            <a href={params.value} style={{margin: 'auto'}} rel="noopener noreferrer" target="_blank"><Button variant="contained" color="primary">View on blog</Button></a>
        )}
    ]

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/posts`, {
                credentials: 'include'
            })
            if(res.status === 401) {
                setLoggedIn(false)
                return
            }
            const dat = await res.json()
            const merged = dat.map(post => {
                let _author
                if(post.authors.length) {
                    _author = post.authors
                } else {
                    _author = [post.author]
                }
                const _categories = post.categories.join(' & ')
                const url = `${WEBSITE_URL}/${new Date(post.date).getFullYear()}/${('0' + (new Date(post.date).getMonth() + 1)).slice(-2)}/${post.slug}`
                const id = post._id
                return {...post, _author, url, id, _categories}
            })
            merged.reverse()
            setPosts(merged)
        })()
    }, [])

    return (
        <>
            <Navigation name={'All Posts'} />
            {!loggedIn && <Warning />}
            <div style={{margin: '20px', textAlign: 'center'}}>
                <Link to="/posts/add"><Button variant="contained" color="secondary" >Add Post</Button></Link>
            </div>
            <DataGrid autoHeight style={{width: '98%', margin: 'auto'}} sortingOrder={['asc', 'desc']}
                rows={posts}
                columns={columns} />
        </>
    )
}
