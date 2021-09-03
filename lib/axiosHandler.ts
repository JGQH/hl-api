import axios from 'axios'
import cheerio from 'cheerio'

const basePath = 'https://hololive.hololivepro.com/en'

export async function getSelector(path:string) {
  const response = await axios.get(basePath + path)

  return cheerio.load(response.data)
}