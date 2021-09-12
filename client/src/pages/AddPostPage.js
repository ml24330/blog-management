import React, { useState, useRef } from 'react'
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
import placeholder from '../assets/images/placeholder.jpeg'
import TurndownService from 'turndown'

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
    },
    image: {
        width: '40%',
        margin: '10px 0'
    },
    remove: {
        color: 'red', 
        fontSize: '1.2rem', 
        cursor: 'pointer', 
        marginLeft: '5px',
        textDecoration: 'underline',
        '&:hover': {
            color: 'purple'
        }
    }
})

export default function AddPostPage() {

    const [post, setPost] = useLocalStorage('post', POST_TEMPLATE)
    const [newAuthor, setNewAuthor] = useLocalStorage('n-a', '')
    const [newCategory, setNewCategory] = useLocalStorage('n-c', '')
    
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [status, setStatus] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true)

    const classes = useStyles()

    const pastebin = useRef(null)
    const content = useRef(null)

    const exists = (v) => {
        return v !== undefined
    }

    const handlePaste = (e) => {
        const startpos = content.current.selectionStart
        const endpos = content.current.selectionEnd
        pastebin.current.focus()
        setTimeout(() => {
            const html = pastebin.current.innerHTML
            pastebin.current.innerHTML = ''
            const turndownService = new TurndownService()
            const md = turndownService.turndown(html)
            const output = `${post.content.substring(0, startpos)}${md}${post.content.substring(endpos)}`.replace(/\\/g, '')
            content.current.focus()
            setPost(prevPost => {
                return {...prevPost, content: output }
            })
            content.current.selectionEnd = endpos + md.length
        }, [])
    }

    const handleInput = (e, field) => {
        setPost(prevPost => {
            return {...prevPost, [field]: e.target.value}
        })
    }

    const handleInputForArray = (e, field, idx) => {
        setPost(prevPost => {
            const newArray = prevPost[field].map((item, index) => index === idx ? e.target.value : item)
            console.log(prevPost)
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
        setImage(null)
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
        setStatus('Saving...')
        const formData = new FormData()
        formData.append('title', post.title)
        formData.append('categories', JSON.stringify(post.categories))
        formData.append('date', post.date)
        formData.append('content', post.content)
        if(post.authors.length > 1) {
            formData.append('authors', JSON.stringify(post.authors))
        } else {
            formData.append('author', post.authors[0])
        }
        const post_res = await fetch(`${API_URL}/posts`, {
            credentials: 'include',
            method: 'POST',
            body: formData
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
        const f = new FormData()
        f.append('image', image)
        f.append('caption', caption)
        await fetch(`${API_URL}/images/${data.slug}`, {
            credentials: 'include',
            method: 'POST',
            body: f
        })
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

            <PreviewComponent setIsOpen={setIsOpen} isOpen={isOpen} post={post} image={image && image} caption={image && caption}/>
            
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

                {exists(image) && (<div>
                    {image === null ? 
                        (<img className={classes.image} src={placeholder} alt="placeholder" />) :
                        (<img className={classes.image} src={image} onError={(e)=>{e.target.onerror = null; e.target.src= URL.createObjectURL(image)}} alt="avatar" />)
                    }
                    <div>
                        <input className={classes.input_long} type="file" accept=".png,.jpg,.jpeg,.gif,.webp,.heif" onChange={e => setImage(e.target.files[0])} />
                        {image !== null && <>
                            <span className={classes.remove} onClick={() => setImage(null)} >Remove image</span>
                            <TextField className={classes.input_long} label="Caption" value={caption || ''} onChange={e => setCaption(e.target.value)} />
                        </>}
                    </div>
                </div>)}

                {exists(post.content) && (<div>
                    <TextField inputRef={content} onPaste={handlePaste} className={classes.textarea} multiline={true} label="Content" value={post.content || ''} onChange={e => handleInput(e, 'content')} />
                </div>)}

                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                <Button className={classes.button}  variant="contained" onClick={() => {setIsOpen(true);window.scrollTo(0,0)}}>Preview</Button>
                <Button className={classes.button}  variant="contained" color="secondary" onClick={handleClear}>Clear</Button>

                <Typography>
                    {status}
                </Typography>

                <div contentEditable={true} ref={pastebin} style={{opacity: 0, position: 'fixed'}}></div>
            </div>
        </>
    )
}