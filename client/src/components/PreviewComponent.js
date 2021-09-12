import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import removeMd from 'remove-markdown'
import readingTime from 'reading-time'
import time from '../assets/images/time.svg'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    modal: {
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100vw',
        backgroundColor: 'white',
        padding: '2% 0',
        minHeight: '100vh',
        margin: 0,
        zIndex: 999,
        textAlign: 'right'
    },
    button: {
        position: 'sticky',
        top: '15px',
        right: '20px'
    },
    image: {
        width: '60%',
        marginTop: '15px'
    },
    caption: {
        marginRight: '20%',
        textAlign: 'right',
        color: 'grey',
        fontSize: '1rem'
    }
})

export default function PreviewComponent({ setIsOpen, isOpen, post, image, caption }) {

    const classes = useStyles()

    const renderDate = (date) => {
        const MONTHS = {0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'}
        const d = new Date(date)
        const day = d.getDate()
        const month = MONTHS[d.getMonth()]
        const year = d.getFullYear()
        return `${day} ${month} ${year}`
    }
    
    return (
        <>
            {isOpen && (
                <div className={classes.modal}>
                    <Button className={classes.button} variant="contained" color="secondary" onClick={() => setIsOpen(false)}>Close</Button>
                    <div className="post-container">
                        {post.authors.length !== 0 && <span className="post-author">{post.authors.map((author, idx) => (
                            <span key={author}>
                                <span>{author}</span>
                                {idx+1 !== post.authors.length && <span> & </span>}
                            </span>
                        ))}</span>}
                        <span> - </span>
                        <span>{post.categories.map((category, idx) => (
                            <span key={category}>
                            <span>{category}</span>
                            {idx+1 !== post.categories.length && <span> & </span>}
                        </span>
                        ))}</span>
                        <div className="post-title"><ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.title}</ReactMarkdown></div>
                        <div className="post-meta">
                            <span className="post-date">{renderDate(post.date)}</span>
                            <span className="post-time"><img src={time} alt="time" />{Math.ceil(readingTime(removeMd(post.content).split('[1]')[0], { wordsPerMinute: 250 }).minutes)} min read</span>
                        </div>
                        {image && <>
                            <img className={classes.image} src={image} onError={(e)=>{e.target.onerror = null; e.target.src= URL.createObjectURL(image)}} alt="avatar" />
                            <div className={classes.caption}>{caption || ''}</div>
                        </>}
                        <div className="page-content">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
