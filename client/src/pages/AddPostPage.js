import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../useLocalStorage'
import PreviewComponent from '../components/PreviewComponent'
import Navigation from '../components/Navigation'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import Warning from '../components/Warning'
import { API_URL } from '../config'

const POST_TEMPLATE = {
    title: '',
    author: '',
    authors: [],
    categories: [],
    visits: 0,
    content: '',
    date: Date.now()
}

const useStyles = makeStyles({
    page: {
        padding: '2% 10%'
    },
    input_long: {
        margin: '15px 5px',
        width: '100%'
    },
    input: {
        margin: '15px 5px',
        width: 'max(20%,200px)'
    },
    icon: {
        position: 'absolute',
        width: '40px',
        transform: 'translate(-40px,33px)',
        cursor: 'pointer',
        '&:hover': {
            color: 'purple'
        }
    },
    button: {
        margin: '20px 10px',
        width: '10%'
    },
    textarea: {
        margin: '5px',
        width: '100%',
        maxHeight: '300px',
        overflow: 'scroll',
        '&:hover': {
            maxHeight: 'unset'
        }
    },
    link: {
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:hover': {
            color: 'purple'
        }
    }
})

export default function AddPostPage() {

    const [post, setPost] = useLocalStorage('post', POST_TEMPLATE)
    const [newAuthor, setNewAuthor] = useLocalStorage('n-a', '')
    const [newCategory, setNewCategory] = useLocalStorage('n-c', '')
    
    const [status, setStatus] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true)

    const classes = useStyles()

    const exists = (v) => {
        return v !== undefined
    }

    const handleInput = (e, field) => {
        setPost(prevPost => {
            return {...prevPost, [field]: e.target.value}
        })
    }

    const handleInputForArray = (e, field, idx) => {
        setPost(prevPost => {
            const newArray = prevPost[field].map((item, index) => index === idx ? e.target.value : item)
            return {...prevPost, [field]: newArray}
        })
    }

    const handleAdd = (value, field) => {
        if(!value) return
        setPost(prevPost => {
            const newArray = [...prevPost[field]]
            newArray.push(value)
            return {...prevPost, [field]: newArray}
        })
    }

    const handleRemoveFromArray = (idx, field) => {
        setPost(prevPost => {
            const newArray = [...prevPost[field]]
            newArray.splice(idx, 1)
            return {...prevPost, [field]: newArray}
        })
    }

    const handleClear = () => {
        setPost(POST_TEMPLATE)
        setNewAuthor('')
        setNewCategory('')
    }

    const handleSubmit = async () => {
        if(!post.title || !post.date || !post.authors.length || !post.categories.length || !post.content) {
            setStatus('Missing fields!')
            return
        }
        if(post.visits < 0 || post.visits % 1) {
            setStatus('The number of visits must be a non-negative integer!')
            return
        }
        let _post
        if(post.authors.length > 1) {
            _post = {
                title: post.title,
                authors: post.authors,
                categories: post.categories,
                date: post.date,
                content: post.content
            }
        } else {
            _post = {
                title: post.title,
                author: post.authors[0],
                categories: post.categories,
                date: post.date,
                content: post.content
            }
        }
        const post_res = await fetch(`${API_URL}/posts`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(_post)
        })
        if(post_res.status === 401) {
            setLoggedIn(false)
            return
        }
        if(post_res.status !== 200) {
            setStatus(`An error occurred! API returned with status ${post_res.status}`)
            return
        }
        const data = await post_res.json()
        const slug_exists = await fetch(`${API_URL}/visits/${data.slug}`, {
            credentials: 'include'
        })
        if(slug_exists.status === 401) {
            setLoggedIn(false)
            return
        }
        if(slug_exists.status !== 200) {
            const visits_create_res = await fetch(`${API_URL}/visits/${data.slug}`, {
                credentials: 'include',
                method: 'POST'
            })
            if(visits_create_res.status === 401) {
                setLoggedIn(false)
                return
            }
            if(visits_create_res.status !== 200) {
                setStatus(`An error occurred! API returned with status ${visits_create_res.status}`)
                return
            } 
        }
        const visits_set_res = await fetch(`${API_URL}/visits/${data.slug}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ type: 'set', value: post.visits })
        })
        if(visits_set_res.status === 401) {
            setLoggedIn(false)
            return
        }
        if(visits_set_res.status !== 200) {
            setStatus(`An error occurred! API returned with status ${visits_set_res.status}`)
            return
        }
        setStatus(<>Post successfully added. Click <Link className={classes.link} to={`/post/${data._id}`}>here</Link> to view.</>)
        handleClear()
    }

    return (
        <>
            <Navigation name={'New Post'} />

            <PreviewComponent setIsOpen={setIsOpen} isOpen={isOpen} post={post} />
            
            <div className={classes.page} >
                {!loggedIn && <Warning />}
                <Link to="/posts">
                    <Button variant="outlined" color="primary">
                        Back to all posts
                    </Button>
                </Link>

                {exists(post.title) && (<div>
                    <TextField className={classes.input_long} label="Title" value={post.title} onChange={e => handleInput(e, 'title')} />
                </div>)}

                {exists(post.date) && (<div>
                    <TextField className={classes.input_long} label="Date" type="date" value={new Date(post.date || 0).toISOString().substr(0,10)} onChange={e => handleInput(e, 'date')} />
                </div>)}

                {exists(post.categories) && (<div>{post.categories.map((cat, idx) => (
                    <span key={idx} ><TextField className={classes.input} label="Category" value={cat} onChange={e => handleInputForArray(e, 'categories', idx)} /><CancelOutlinedIcon style={{color: 'darkred'}} className={classes.icon} onClick={() => handleRemoveFromArray(idx, 'categories')} /></span>
                ))}
                    <TextField className={classes.input} label="New Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                    <AddIcon style={{color: 'green'}} className={classes.icon}  onClick={() => {handleAdd(newCategory, 'categories'); setNewCategory('')}} />
                </div>)}

                {exists(post.authors) && (<div>{post.authors.map((author, idx) => (
                    <span key={idx} ><TextField className={classes.input} label="Author" value={author} onChange={e => handleInputForArray(e, 'authors', idx)} /><CancelOutlinedIcon style={{color: 'darkred'}} className={classes.icon} onClick={() => handleRemoveFromArray(idx, 'authors')} /></span>
                ))}
                    <TextField className={classes.input} label="New Author" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
                    <AddIcon style={{color: 'green'}} className={classes.icon} onClick={() => {handleAdd(newAuthor, 'authors'); setNewAuthor('')}} />
                </div>)}

                {exists(post.visits) && (<div>
                    <TextField className={classes.input_long} label="Views" type="number" value={post.visits} onChange={e => handleInput(e, 'visits')} />
                </div>)}

                {exists(post.content) && (<div>
                    <TextField className={classes.textarea} multiline={true} label="Content" value={post.content || ''} onChange={e => handleInput(e, 'content')} />
                </div>)}

                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                <Button className={classes.button}  variant="contained" onClick={() => {setIsOpen(true);window.scrollTo(0,0)}}>Preview</Button>
                <Button className={classes.button}  variant="contained" color="secondary" onClick={handleClear}>Clear</Button>

                <Typography>
                    {status}
                </Typography>
            </div>
        </>
    )
}