import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Navigation from '../components/Navigation'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles({
    page: {
        padding: '2% 10%'
    },
    reset: {
        backgroundColor: red,
        '&:hover': {
            backgroundColor: '#990000'
        }
    },
    flex: {
        display: 'flex',
        flexDirection: 'column'
    },
    textarea: {
        minHeight: '150px',
        padding: '5px'
    },
    button: {
        margin: '5px'
    },
    select: {
        marginLeft: '5px'
    },
    label: {
        margin: '5px 0',
        fontSize: '1.1rem'
    }
})

const bodyRegexSimple = /\[([^\[]+)\]/g
const bodyRegexFtn = /\[\^\^\[([^\[]+)\]\^\^\]\(\#\_ftn[^\)]+\)/g

const footnoteRegexSimple = /\[([^\[]+)\] (.+\n)*/g
const footnoteRegexFtn = /\[\[([^\[]+)\]\]\(\#\_ftnref[^\)]+\) (.+\n)*/g

export default function Converter() {

    const classes = useStyles()

    const [hasConverted, setHasConverted] = useState(false)
    const [format, setFormat] = useState('simple')

    const body = useRef(null)
    const footnote = useRef(null)

    function convertArticleBody() {
        if (hasConverted) { return }

        let regex = format === "simple" ? bodyRegexSimple : bodyRegexFtn
        body.current.value = body.current.value.replace(regex, "<a class=\"inline-reference\" id=\"inline$1\" href=\"#$1\">$1</a>")
    }

    function convertFootnotes() {
        if (hasConverted) { return }

        let regex = format === "simple" ? footnoteRegexSimple : footnoteRegexFtn
        footnote.current.value = footnote.current.value.replace(regex, "<a class=\"reference\" id=\"$1\" href=\"#inline$1\">[$1]</a>\n$2")
    }

    function lockArticle() {
        body.current.setAttribute('readonly', '')
        body.current.style.color = 'gray'

        footnote.current.setAttribute('readonly', '')
        footnote.current.style.color = 'gray'
    }

    async function copyArticleToClipboard() {
        let bodyTextbox = body.current
        let footnoteTextbox = footnote.current
        let text = bodyTextbox.value + footnoteTextbox.value

        console.log(await navigator.clipboard.writeText(text))
        alert("Article converted and copied to clipboard successfully.")
    }

    function convertCopyButtonClicked() {
        lockArticle()
        convertArticleBody()
        convertFootnotes()
        copyArticleToClipboard()
        setHasConverted(true)
    }

    function convertButtonClicked() {
        lockArticle()
        convertArticleBody()
        convertFootnotes()
        alert("Article converted successfully.")
        setHasConverted(true)
    }

    function resetButtonClicked() {
        setHasConverted(false)
        let bodyTextbox = body.current
        bodyTextbox.value = ""
        bodyTextbox.style.color = 'black'
        bodyTextbox.removeAttribute('readonly')

        let footnoteTextbox = footnote.current
        footnoteTextbox.value = ""
        footnoteTextbox.style.color = 'black'
        footnoteTextbox.removeAttribute('readonly')
    }

    return (
        <>
            <Navigation name="Article Converter" />
            <div className={classes.page}>
                <Typography variant="h4">LSE Law Review Article Converter</Typography>
                    <div className={classes.flex}>
                        <label for="bodytextbox" className={classes.label}>Main Article Body:</label>
                        <textarea className={classes.textarea} id="bodytextbox" ref={body} placeholder="Type or paste the main article body here, then click the buttons below to convert the footnote format."></textarea>
                    </div>
                    <br />

                    <div className={classes.flex} style={{height: '25%'}}>
                        <label for="footnotestextbox" className={classes.label}>Footnotes:</label>
                        <textarea className={classes.textarea} id="footnotestextbox" ref={footnote} placeholder="Type or paste the article footnotes section here, then click the buttons below to convert the footnote format."></textarea>
                    </div>
                    <br />

                    <div className={classes.button} style={{height: '10%'}}>
                        <label for="formatpicker" className={classes.label}>Format: </label>
                        <Select defaultValue="simple" id="formatpicker" className={classes.select}>
                            <MenuItem value="simple">Simple: [1] </MenuItem>
                            <MenuItem value="ftn">Advanced: [^^[1]^^](#_ftn1) </MenuItem>
                        </Select>
                        <br />
                        <Button variant="contained" color="primary" onClick={convertCopyButtonClicked} className={classes.button}>Convert and Copy Entire Article</Button>
                        <Button variant="contained" color="primary" onClick={convertButtonClicked} className={classes.button}>Convert Only</Button>
                        <Button variant="contained" color="secondary" onClick={resetButtonClicked} className={classes.button} style={{float: 'right'}}>Reset</Button>
                    </div>
            </div>
        </>
    )
}
