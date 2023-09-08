const {crawlWebPage } = require('./crawl')
const { printReport } = require('./report')

async function main() {
  if (process.argv.length < 3) {
     console.log('no website provied')
     process.exit(1)
  }

  if (process.argv.length > 3) {
     console.log('too many command line args')
     process.exit(1)
  }
  const baseUrl = process.argv[2]

  console.log(`starting crwal ${baseUrl}`)
  const pages = await crawlWebPage(baseUrl, baseUrl, {})

//   for (const page of Object.entries(pages)){
//     console.log(page)
//   }
  printReport(pages)
}

 main()