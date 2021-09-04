import { getSelector } from '../lib/axiosHandler'
import type { ApiRequest, ApiResponse } from '../lib/types'

interface Talent {
  name: string
  info_url: string
  image_url: string
}

export default async (req:ApiRequest, res:ApiResponse<{ talents: Talent[] }>) => {
  try {
    const $ = await getSelector('/talents')

    const talents:Talent[] = []

    $('span').remove()
    $('ul.talent_list > li').each((_, elem) => {
      const fullPath = $(elem).find('a').attr('href') //Example input: https://(...)/nanashi-mumei/
      const infoPath = fullPath.split('/').reverse()[1] //Example output: /nanashi-mumei

      talents.push({
        name: $(elem).text().trim(),
        info_url: infoPath.substr(0), //Example url: nanashi-mumei
        image_url: $(elem).find('img').attr('src')
      })
    })

    res.status(200).json({ talents })
  } catch (e) {
    res.status(400).json({
      error: (e as Error).message
    })
  }
}