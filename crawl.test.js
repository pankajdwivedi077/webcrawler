const { normalizedUrl, getUrlFromHtml } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalizedUrl strip protocol', () => {
    const input = 'https://youtube.com'
    const actual = normalizedUrl(input)
    const expected = 'youtube.com'
    expect(actual).toEqual(expected)
})

test('normalizedUrl strip trailing slash', () => {
    const input = 'https://youtube.com/'
    const actual = normalizedUrl(input)
    const expected = 'youtube.com'
    expect(actual).toEqual(expected)
})

test('normalizedUrl capitals', () => {
    const input = 'https://Youtube.com/'
    const actual = normalizedUrl(input)
    const expected = 'youtube.com'
    expect(actual).toEqual(expected)
})

test('normalizedUrl strip http', () => {
    const input = 'http://youtube.com/'
    const actual = normalizedUrl(input)
    const expected = 'youtube.com'
    expect(actual).toEqual(expected)
})

test('getUrlFromHtml absolute', () => {
    const inputHTMLBody = 
    `<html>
       <body>
         <a href="https://youtube.com/">
           Youtube
         </a>
      </body>
    </html>  
    `

    const inputBaseUrl = "https://youtube.com/"
    const actual = getUrlFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ["https://youtube.com/"]
    expect(actual).toEqual(expected)
})

test('getUrlFromHtml relative', () => {
    const inputHTMLBody = 
    `<html>
       <body>
         <a href="/path/">
           Youtube
         </a>
      </body>
    </html>  
    `

    const inputBaseUrl = "https://youtube.com"
    const actual = getUrlFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ["https://youtube.com/path/"]
    expect(actual).toEqual(expected)
})

test('getUrlFromHtml both', () => {
    const inputHTMLBody = 
    `<html>
       <body>
         <a href="https://youtube.com/path1/">
           Youtube path1
         </a>
         <a href="/path2/">
           Youtube path2
         </a>
      </body>
    </html>  
    `

    const inputBaseUrl = "https://youtube.com"
    const actual = getUrlFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ["https://youtube.com/path1/", "https://youtube.com/path2/"]
    expect(actual).toEqual(expected)
})

test('getUrlFromHtml bad url', () => {
    const inputHTMLBody = 
    `<html>
       <body>
         <a href="invalid">
           Invalid url
         </a>
        
      </body>
    </html>  
    `

    const inputBaseUrl = "https://youtube.com"
    const actual = getUrlFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})