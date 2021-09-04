import { getSelector } from '../lib/axiosHandler'
import type { ApiRequest, ApiResponse } from '../lib/types'

type Dictionary = {
  [key:string]: string
}

interface Info {
  catch: string
  presentation: string
  data: Dictionary
}

export default async (req:ApiRequest<{ info_url?: string }>, res:ApiResponse<Info>) => {
  try {
    const { info_url = '' } = req.query

    const $ = await getSelector('/talents/' + info_url)

    //Presentation of talent
    const talentCatch = $('div.bg_box').find('p.catch').text()
    const talentPresentation = $('div.bg_box').find('p.txt').text()

    //Data of talent
    const talentData:Dictionary = {}
    
    $('div.table_box dl').each((_, elem) => {
      const key = $(elem).find('dt').text()
      const data = $(elem).find('dd').text()

      talentData[key] = data
    })

    res.status(200).json({
      catch: talentCatch,
      presentation: talentPresentation,
      data: talentData
    })
  } catch (e) {
    res.status(400).json({
      error: (e as Error).message
    })
  }
}