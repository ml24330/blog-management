import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../useLocalStorage'
import placeholder from '../assets/images/placeholder.png' 
import Navigation from '../components/Navigation'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Warning from '../components/Warning'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { API_URL } from '../config'

const useStyles = makeStyles({
    page: {
        padding: '2% 10%'
    },
    input_long: {
        margin: '15px 5px',
        width: '100%'
    },
    button: {
        margin: '20px 10px',
        width: '10%'
    },
    link: {
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:hover': {
            color: 'purple'
        }
    },
    image: {
        width: '30%',
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

export default function AuthorPage({ match, history }) {

    const [author, setAuthor] = useLocalStorage(`author_${match.params.id}`, {})
    const [image, setImage] = useState()
    const [modified, setModified] = useLocalStorage(`modified_${match.params.id}`, false)
    const [status, setStatus] = useState('')
    const [loggedIn, setLoggedIn] = useState(true)

    const classes = useStyles()

    useEffect(() => {
        if(!modified) {
            (async () => {
                const res = await fetch(`${API_URL}/authors/${match.params.id}`, {
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
                if(dat.image) {
                    setImage(dat.image)
                } else {
                    setImage(null)
                }
                setAuthor(dat)
            })()
        }
    }, [modified])

    const cleanUp = () => {
        localStorage.removeItem(`author_${match.params.id}`)
        localStorage.removeItem(`image_${match.params.id}`)
        localStorage.removeItem(`modified_${match.params.id}`)
    }

    const exists = (v) => {
        return v !== undefined
    }

    const handleInput = (e, field) => {
        setModified(true)
        setAuthor(prevAuthor => {
            return {...prevAuthor, [field]: e.target.value}
        })
    }
    
    const handleClear = () => {
        setModified(false)
    }

    const handleSubmit = async () => {
        if(!author.name || !author.bio || !author.category) {
            setStatus('Missing fields!')
            return
        }
        setStatus('Saving...')
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', author.name)
        formData.append('bio', author.bio)
        formData.append('category', author.category)
        const res = await fetch(`${API_URL}/authors/${author._id}`, {
            credentials: 'include',
            method: 'PATCH',
            body: formData
        })
        if(res.status === 401) {
            setLoggedIn(false)
            return
        }
        if(res.status === 200) {
            setModified(false)
            setStatus(<>Author successfully edited. <span className={classes.link} onClick={() => {setModified(false);window.location.reload()}}>Refresh</span> the page to see.</>)
            
        } else {
            setStatus(`An error occurred! API returned with status ${res.status}.`)
        }
    }

    const handleDelete = async () => {
        const alert = window.confirm(`Are you sure you want to delete the author ${author.name}? This cannot be undone.`)
        if(alert === false) {
            return
        }
        setStatus('Deleting...')
        const res = await fetch(`${API_URL}/authors/${author._id}`, {
            credentials: 'include',
            method: 'DELETE'
        })
        if(res.status === 401) {
            setLoggedIn(false)
            return
        }
        if(res.status === 204) {
            setStatus(<>Author successfully deleted. Go back to all authors <Link className={classes.link} to={`/authors`}>here</Link>.</>)
            cleanUp()
        } else {
            setStatus(`An error occurred! API returned with status ${res.status}.`)
        }
    }

    const handleRemoveImage = () => {
        setModified(true)
        setImage(null)
    }

    return (
        <>
            <Navigation name={author.name} />

            <div className={classes.page}>
                {!loggedIn && <Warning />}
                <Link to="/authors">
                    <Button variant="outlined" color="primary">
                        Back to all authors
                    </Button>
                </Link>

                {exists(author.name) && (<div>
                    <TextField className={classes.input_long} label="Name" value={author.name} onChange={e => handleInput(e, 'name')} />
                </div>)}

                {exists(author.bio) && (<div>
                    <TextField className={classes.input_long} label="Bio" value={author.bio || ''} onChange={e => handleInput(e, 'bio')} />
                </div>)}

                {exists(author.category || '') && (<div className={classes.input_long}>
                    <InputLabel style={{fontSize: '0.8rem'}}>Category</InputLabel>
                    <Select value={author.category} onChange={e => handleInput(e, 'category')}>
                        <MenuItem value="editor">Editor</MenuItem>
                        <MenuItem value="contributor">Contributor</MenuItem>
                    </Select>
                </div>)}

                <div>
                    {!image ? 
                        (<img className={classes.image} src={placeholder} alt="placeholder" />) :
                        (<img className={classes.image} src={image} onError={(e)=>{e.target.onerror = null; e.target.src= URL.createObjectURL(image)}} alt="avatar" />)
                    }
                    <div>
                        <input className={classes.input_long} type="file" accept=".png,.jpg,.jpeg,.gif,.webp,.heif" onChange={e => {setModified(true); setImage(e.target.files[0])}} />
                        {image && <span className={classes.remove} onClick={handleRemoveImage} >Remove image</span>}
                    </div>
                </div>

                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleClear}>Reset</Button>
                <Typography>
                    {status}
                </Typography>
            </div>
        </>
    )
}
