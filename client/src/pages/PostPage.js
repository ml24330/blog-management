import React, { useState, useEffect } from 'react'
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
        margin: '10px 5px',
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

export default function PostPage({ match, history }) {

    const [post, setPost] = useLocalStorage(`post_${match.params.id}`, {})
    const [modified, setModified] = useLocalStorage(`modified_${match.params.id}`, false)
    const [newAuthor, setNewAuthor] = useLocalStorage(`n-a_${match.params.id}`, '')
    const [newCategory, setNewCategory] = useLocalStorage(`n-c_${match.params.id}`, '')
    const [image, setImage] = useState(placeholder)
    const [hasImage, setHasImage] = useState(false)
    
    const [status, setStatus] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(true)

    const classes = useStyles()

    useEffect(() => {
        if(!modified) {
            (async () => {
                const res = await fetch(`${API_URL}/post/id/${match.params.id}`, {
                    credentials: 'include'
                })
                if(res.status === 401) {
                    setLoggedIn(false)
                    return
                }
                if(res.status === 404) {
                    history.push('/404')
                }
                const dat = await res.json()
                const visits_res = await fetch(`${API_URL}/visits/${dat.slug}`, {
                    credentials: 'include'
                })
                if(visits_res.status === 401) {
                    setLoggedIn(false)
                    return
                }
                const visits_dat = await visits_res.json()
                if(dat.author) {
                    dat.authors = [dat.author]
                }
                setPost({...dat, visits: visits_dat.visits})
            })()
        }
    }, [match.params.id, modified])

    useEffect(() => {
        (async () => {
            const res = await fetch(`${API_URL}/images/${post.slug}`, {
                credentials: 'include'
            })
            if(res.status !== 200) {
                setImage(placeholder)
            } else {
                const { image } = await res.json()
                if(image) {
                    setHasImage(true)
                    setImage(`data:image/png;base64,${new Buffer.from(image.data).toString('base64')}`)
                } else {
                    setImage(placeholder)
                }
            }
        })()
    }, [post.slug])

    const cleanUp = () => {
            localStorage.removeItem(`post_${match.params.id}`)
            localStorage.removeItem(`modified_${match.params.id}`)
            localStorage.removeItem(`n-a_${match.params.id}`)
            localStorage.removeItem(`n-c_${match.params.id}`)
        }

    const exists = (v) => {
        return v !== undefined
    }

    const handleInput = (e, field) => {
        setModified(true)
        setPost(prevPost => {
            return {...prevPost, [field]: e.target.value}
        })
    }

    const handleInputForArray = (e, field, idx) => {
        setModified(true)
        setPost(prevPost => {
            const newArray = prevPost[field].map((item, index) => index === idx ? e.target.value : item)
            return {...prevPost, [field]: newArray}
        })
    }

    const handleAdd = (value, field) => {
        if(!value) return
        setModified(true)
        setPost(prevPost => {
            const newArray = [...prevPost[field]]
            newArray.push(value)
            return {...prevPost, [field]: newArray}
        })
    }

    const handleRemoveFromArray = (idx, field) => {
        setModified(true)
        setPost(prevPost => {
            const newArray = [...prevPost[field]]
            newArray.splice(idx, 1)
            return {...prevPost, [field]: newArray}
        })
    }

    const handleReset = () => {
        setModified(false)
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
        formData.append('categories', post.categories)
        formData.append('date', post.date)
        formData.append('content', post.content)
        if(post.authors.length > 1) {
            formData.append('authors', post.authors)
        } else {
            formData.append('author', post.authors[0])
        }
        const post_res = await fetch(`${API_URL}/posts/${post._id}`, {
            credentials: 'include',
            method: 'PATCH',
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
        const visits_res = await fetch(`${API_URL}/visits/${post.slug}`, {
            credentials: 'include',
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ type: 'set', value: post.visits })
        })
        if(visits_res.status === 401) {
            setLoggedIn(false)
            return
        }
        if(visits_res.status !== 200) {
            setStatus(`An error occurred! API returned with status ${visits_res.status}`)
            return
        }
        if(typeof image == 'object' && image !== null) {
            const f = new FormData()
            f.append('image', image)
            const img_res = await fetch(`${API_URL}/images/${post.slug}`, {
                credentials: 'include',
                method: 'PATCH',
                body: f
            })
            if(img_res.status !== 200) {
                setStatus(`An error occurred! API returned with status ${img_res.status}`)
                return
            }
        } else if(image === null) {
            await fetch(`${API_URL}/images/${post.slug}`, {
                credentials: 'include',
                method: 'DELETE'
            })
        }
        setStatus(<>Post successfully saved. <span className={classes.link} onClick={() => {setModified(false);window.location.reload()}}>Refresh</span> the page to see.</>)
    }

    const handleDelete = async () => {
        const alert = window.confirm(`Are you sure you want to delete the post ${post.title}? This cannot be undone.`)
        if(alert === false) {
            return
        }
        setStatus('Deleting...')
        const post_res = await fetch(`${API_URL}/posts/${post._id}`, {
            credentials: 'include',
            method: 'DELETE'
        })
        if(post_res.status === 401) {
            setLoggedIn(false)
            return
        }
        if(post_res.status === 204) {
            setStatus(<>Post successfully deleted. Go back to all posts <Link className={classes.link} to={`/posts`}>here</Link>. </>)
            cleanUp()
        } else {
            setStatus(`An error occurred! API returned with status ${post_res.status}.`)
        }
    }

    const handleRemoveImage = () => {
        setHasImage(false)
        setImage(null)
    }

    return (
        <>
            <Navigation name={post.title} />
            
            <PreviewComponent setIsOpen={setIsOpen} isOpen={isOpen} post={post} image={hasImage && image} />

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
                        <input className={classes.input_long} type="file" accept=".png,.jpg,.jpeg,.gif,.webp,.heif" onChange={e => {setModified(true); setHasImage(true); setImage(e.target.files[0])}} />
                        {hasImage && <span className={classes.remove} onClick={handleRemoveImage} >Remove image</span>}
                    </div>
                </div>)}

                {exists(post.content) && (<div>
                    <TextField className={classes.textarea} multiline={true} label="Content" value={post.content || ''} onChange={e => handleInput(e, 'content')} />
                </div>)}

                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                <Button className={classes.button}  variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                <Button className={classes.button}  variant="contained" onClick={() => {setIsOpen(true);window.scrollTo(0,0)}}>Preview</Button>
                <Button className={classes.button}  variant="contained" color="secondary" onClick={handleReset}>Reset</Button>

                <Typography>
                    {status}
                </Typography>
            </div>
        </>
    )
}
