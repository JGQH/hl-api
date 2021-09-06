import allowCors from '../lib/cors'
import { getJson } from '../lib/axiosHandler'
import type { ApiRequest, ApiResponse, ApiEndpoint } from '../lib/types'

interface StreamInfo {
  is_live: boolean
  title: string
  url: string
  start: Date
  talent: string
}

interface HoloVideo {
  displayDate: string //Hour and minutes when the stream started
  datetime: string //Timestamp of the stream start, doesn't include miliseconds
  isLive: boolean //Self explanatory, is true if the stream is currently active and false otherwise
  platformType: 0 | 1 //1 is youtube, 0 is another 1 like Twitch or Joqr
  url: string //Youtube link for the stream
  thumbnail: string //Youtube thumbnail for the stream
  title: string //Title of the stream
  name: string //Name of the holomem
  talent: {
    iconImageUrl: string //Image of the holomem doing the stream
  }
  collaboTalents: {
    iconImageUrl: string //Mainly images of the holomem they're collabing with, generally empty
  }[]
}

interface HoloInfo {
  displayDate: string //Date of the year in the format {Month}.{Day}, example: '09.04'
  datetime: string //Starting time of the day, generally is just midnight, example: '2021/09/05 00:00:00'
  videoList: HoloVideo[] //List of all the videos in the given day
}

interface HoloList {
  dateGroupList: [HoloInfo, HoloInfo, HoloInfo] //Info of the videos from yesterday, today and tomorrow (Based on JST / GMT+9 timezone)
}

function getStreamInfo(holoVideo:HoloVideo):StreamInfo {
  return {
    is_live: holoVideo.isLive,
    title: holoVideo.title,
    url: holoVideo.url,
    start: new Date(holoVideo.datetime + ' GMT+0900'), //JST / GMT+9 is the original timezone returned from the API
    talent: holoVideo.name
  }
}

const talentsSchedule:ApiEndpoint = async (req:ApiRequest, res:ApiResponse<{ yesterday:StreamInfo[], today:StreamInfo[], tomorrow:StreamInfo[] }>) => {
  try {
    const schedule = await getJson<HoloList>('https://schedule.hololive.tv/api/list/7') //Hololive has its own API, but it has so much info that is only used for the website

    const yesterday:StreamInfo[] = schedule.dateGroupList[0].videoList.map(getStreamInfo)
    const today:StreamInfo[] = schedule.dateGroupList[1].videoList.map(getStreamInfo)
    const tomorrow:StreamInfo[] = schedule.dateGroupList[2].videoList.map(getStreamInfo)

    res.status(200).json({ yesterday, today, tomorrow })
  } catch (e) {
    res.status(400).json({
      error: (e as Error).message
    })
  }
}

export default allowCors(talentsSchedule, ['GET', 'OPTIONS'])