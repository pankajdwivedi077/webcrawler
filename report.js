function printReport(pages){
    console.log("=========")
    console.log("REPORT")
    console.log("=========")
    const sortPages = sortPage(pages)
    for (const sortPage of sortPages){
        const url = sortPage[0]
        const hits = sortPage[1]
        console.log(`found ${hits} links to page: ${url}`)
    }
    console.log("=========")
    console.log("REPORT")
    console.log("=========")
}

function sortPage (pages) {
   const pagesArr = Object.entries(pages)
   pagesArr.sort((a,b) => {
    const aHits = a[1]; 
    const bHits = b[1]; 

    return bHits - aHits;
   })
   return pagesArr
}

module.exports =  { sortPage, printReport }