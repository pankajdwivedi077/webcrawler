const { JSDOM } = require('jsdom')

async function crawlWebPage(website, webpage, pages){
    
    const baseUrlObj = new URL(website)
    const currUrl = new URL (webpage)
    if (baseUrlObj.hostname !== currUrl.hostname){
        return pages
    }

    const normalizedCurrentUrl = normalizedUrl(webpage)
    if (pages[normalizedCurrentUrl] > 0){
        pages[normalizedCurrentUrl]++
        return pages
    }

    pages[normalizedCurrentUrl] = 1

    console.log(`crawling the ${webpage}`)

     try {
        const response = await fetch(webpage)

        const htmlBody = await response.text()

        const nextUrls = getUrlFromHtml(htmlBody, website)

        for (const nextUrl of nextUrls){
          pages = await crawlWebPage(website, nextUrl, pages)
        }
        
     } catch (err){
        console.log(`error in fetch: ${err.message} on page ${webpage}`)
     }
    return pages  
}

function getUrlFromHtml(htmlbody, baseURL){
  const urls = []
  const dom  = new JSDOM(htmlbody)
  const  linkElements = dom.window.document.querySelectorAll('a')
  for (const linkElement of linkElements){
    if(linkElement.href.slice(0,1) === '/'){
        // relative url
        try {
            const urlObj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlObj.href)
        } catch (err){
            console.log(`error with relative url: ${err.message}`)
        }

    }else{
        // absolute url
        try {
            const urlObj = new URL(linkElement.href)
            urls.push(urlObj.href)
        } catch (err){
            console.log(`error with absolute url: ${err.message}`)
        }
    }
    
  }
  return urls
}

function normalizedUrl(urlString) {
    const urlObj = new URL(urlString);
    let result = `${urlObj.hostname}${urlObj.pathname}`;
    
    if (result.endsWith('/')) {
        result = result.slice(0, -1);
    }

    return result;
}

module.exports = { normalizedUrl, getUrlFromHtml, crawlWebPage }