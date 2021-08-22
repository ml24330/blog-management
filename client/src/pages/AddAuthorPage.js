import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLocalStorage from '../useLocalStorage'
import Navigation from '../components/Navigation'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Warning from '../components/Warning'
import { API_URL } from '../config'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import placeholder from '../assets/images/placeholder.png'

const AUTHOR_TEMPLATE = {
    name: '',
    category: '',
    bio: ''
}

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

export default function AddAuthorPage() {

    const [author, setAuthor] = useLocalStorage('author', AUTHOR_TEMPLATE)
    const [status, setStatus] = useState('')
    const [loggedIn, setLoggedIn] = useState(true)
    const [image, setImage] = useState(null)

    const classes = useStyles()

    const exists = (v) => {
        return v !== undefined
    }

    const handleInput = (e, field) => {
        setAuthor(prevAuthor => {
            return {...prevAuthor, [field]: e.target.value}
        })
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
        const res = await fetch(`${API_URL}/authors`, {
            credentials: 'include',
            method: 'POST',
            body: formData
        })
        if(res.status === 401) {
            setLoggedIn(false)
            return
        }
        if(res.status === 200) {
            const { _id } = await res.json()
            setStatus(<>Author successfully added. Click <Link className={classes.link} to={`/author/${_id}`}>here</Link> to view.</>)
            handleClear()
        } else {
            setStatus(`An error occurred! API returned with status ${res.status}.`)
        }
    }

    const handleClear = () => {
        setAuthor(AUTHOR_TEMPLATE)
        setImage(null)
    }

    return (
        <>
            <Navigation name={'New Author'} />

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
                    <TextField className={classes.input_long} label="Bio" value={author.bio} onChange={e => handleInput(e, 'bio')} />
                </div>)}

                {exists(author.category) && (<div className={classes.input_long}>
                    <InputLabel style={{fontSize: '0.8rem'}}>Category</InputLabel>
                    <Select value={author.category || ''} onChange={e => handleInput(e, 'category')}>
                        <MenuItem value="editor">Editor</MenuItem>
                        <MenuItem value="contributor">Contributor</MenuItem>
                    </Select>
                </div>)}

                {exists(image) && (<div>
                    {image === null ? 
                        (<img className={classes.image} src={placeholder} alt="placeholder" />) :
                        (<img className={classes.image} src={image} onError={(e)=>{e.target.onerror = null; e.target.src= URL.createObjectURL(image)}} alt="avatar" />)
                    }  
                    <div>
                        <input className={classes.input_long} type="file" accept=".png,.jpg,.jpeg,.gif,.webp,.heif" onChange={e => setImage(e.target.files[0])} />
                        {image !== null && <span className={classes.remove} onClick={() => setImage(null)}>Remove image</span>}
                    </div>
                </div>)}

                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
                <Typography>
                    {status}
                </Typography>
            </div>
        </>
    )
}
