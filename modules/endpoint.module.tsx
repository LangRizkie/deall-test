import useSWR from 'swr'

class Endpoint {
  static baseAPI = process.env.API_URL || 'https://localhost:3000'

  static fetcher = (url: string) => fetch(url).then((res) => res.json())
  static fetch = <T extends unknown>(api: string = this.baseAPI, url: string, state: boolean = true) =>
    useSWR<T>(state ? (api + url) : null, this.fetcher)
}

export default Endpoint
