# hl-api
A webscraping API for information found in Hololive Website (NOT affiliated to it in any way, shape or form)

## Table of Contents
- [Introduction](#introduction)
- [Technologies](#technologies)
- [Endpoints](#endpoints)
- [To-Do](#to-do)
## Introduction
This project aims to create an API to get information from the [Hololive Website](https://hololive.hololivepro.com/en) by webscraping some of its pages and returning JSONs for better handling of its contents.

**This project is NOT affiliated with Cover or anything for that matter, its just a fan project for easy access to information**

## Technologies
- TypeScript v4.4.2
- Vercel v1.12.1
- Axios v0.21.1
- Cheerios v1.0.0rc.10

## Endpoints
<hr />

```ts
//Endpoint: /api

//Parameters:
{}

//Returns: List of all talents
{
  name: string //Name of the talent (Example: Nanashi Mumei)
  info_url: string //URL portion for the info (Example: nanashi-mumei)
  image_url: string //URL for the image used in the website
}[]
```

<hr />

```ts
//Endpoint: /api/info

//Parameters:
{
  info_url: string //Example: nanashi-mumei
}

//Returns: Information from the talent
{
  catch: string //Catch-phrase of the talent
  presentation: string //Presentation info of the talent
  data: { //All the different information from the 'Data' section
    [key:string]: string 
  }
}
```

<hr />

```ts
//Endpoint: /api/schedule

//Parameters:
{}

//Returns: Schedule from hololive ('Today' originally starts from 00:00 JST)
{
  yesterday: {
    is_live: boolean //If the stream is live or not
    title: string //Title of the stream
    url: string //URL of the stream
    start: Date //Start date of the stream (In UTC)
    talent: string //Name of the talent (Can be in JP for certain talents)
  }[],
  today: {
    is_live: boolean
    title: string
    url: string
    start: Date
    talent: string
  }[],
  tomorrow: {
    is_live: boolean
    title: string
    url: string
    start: Date
    talent: string
  }[]
}
```

<hr />

## To-Do