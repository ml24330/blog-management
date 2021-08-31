import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Navigation from '../components/Navigation'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TurndownService from 'turndown'

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

const bodyRegexSimple = new RegExp(/\\*\[(\d+)\\*\]/g)

const footnoteRegexSimple = new RegExp(/\\*\[(\d+)\\*\]/g)

export default function Converter() {

    const classes = useStyles()

    const [hasConverted, setHasConverted] = useState(false)

    const body = useRef(null)
    const footnote = useRef(null)
    const pastebin = useRef(null)

    const handlePaste = (ref) => {
        if(hasConverted) {
            return
        }
        const startpos = ref.current.selectionStart
        const endpos = ref.current.selectionEnd
        pastebin.current.focus()
        setTimeout(() => {
            const html = pastebin.current.innerHTML
            pastebin.current.innerHTML = ''
            const turndownService = new TurndownService()
            const md = turndownService.turndown(html)
            const output = `${ref.current.value.substring(0, startpos)}${md}${ref.current.value.substring(endpos)}`
            ref.current.focus()
            ref.current.value = output
            ref.current.selectionEnd = endpos + md.length
        }, [])
    }

    function convertArticleBody() {
        if (hasConverted) { return }

        body.current.value = body.current.value.replace(bodyRegexSimple, "<a class=\"inline-reference\" id=\"inline$1\" href=\"#$1\">$1</a>")
    }

    function convertFootnotes() {
        if (hasConverted) { return }

        footnote.current.value = footnote.current.value.replace(footnoteRegexSimple, "\n<a class=\"reference\" id=\"$1\" href=\"#inline$1\">[$1]</a>")
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
        let text = bodyTextbox.value + '\n\n*****\n\n' + footnoteTextbox.value

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
                        <textarea className={classes.textarea} id="bodytextbox" onPaste={() => handlePaste(body)} ref={body} placeholder="Type or paste the main article body here, then click the buttons below to convert the footnote format."></textarea>
                    </div>
                    <br />

                    <div className={classes.flex} style={{height: '25%'}}>
                        <label for="footnotestextbox" className={classes.label}>Footnotes:</label>
                        <textarea className={classes.textarea} id="footnotestextbox" ref={footnote} onPaste={() => handlePaste(footnote)} placeholder="Type or paste the article footnotes section here, then click the buttons below to convert the footnote format."></textarea>
                    </div>

                    <div className={classes.button} style={{height: '10%'}}>
                        <br />
                        <Button variant="contained" color="primary" onClick={convertCopyButtonClicked} className={classes.button}>Convert and Copy Entire Article</Button>
                        <Button variant="contained" color="primary" onClick={convertButtonClicked} className={classes.button}>Convert Only</Button>
                        <Button variant="contained" color="secondary" onClick={resetButtonClicked} className={classes.button} style={{float: 'right'}}>Reset</Button>
                    </div>
            </div>

            <div contentEditable={true} ref={pastebin} style={{opacity: 0, position: 'fixed'}}></div>
        </>
    )
}
