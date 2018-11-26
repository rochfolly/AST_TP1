import { LevelDB } from './leveldb'

export class Metric {
  public timestamp: Date
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = new Date(ts)
    this.value = v
  }
}

export class MetricsHandler {
  private db: any

  constructor(path: string) {
    this.db = LevelDB.open(path)
  }

  public save(key: number, met: Metric[], callback: (error: Error | null) => void) {
    //if WriteStream works
    const stream = WriteStream(this.db)

    stream.on('error', callback)
    stream.on('close', callback)

    met.forEach((m: Metric) => {
      stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value })
    })

    stream.end()

    //if WriteStream is not working
    met.forEach((m: Metric) => {
      this.db.put(`metric:${key}:${m.timestamp}`, m.value)
    })
  }

  public get(key: string, callback: (err: Error | null, result?: Metric[]) => void) {
    const stream = this.db.createReadStream()
    var met: Metric[] = []

    stream.on('error', callback)
    .on('end', (err:error) => {
      callback(null, met)
    })
    .on('data', (data:any) => {
      const [ , k, timestamp] = data.key.split(":")
      const value = data.value

      if (key !== k) {
        console.log(`LevelDB error : ${data} does not match key ${key}`)
      }
      else {
        data.push(new Metric(timestamp, value))
      }
    })
  }

  public delete(key: string, callback: (err: Error | null, result?: Metric[]) => void) {
    const stream = this.db.createReadStream()
    var met: Metric[] = []

    stream.on('error', callback)
    .on('end', (err:error) => {
      callback(null, met)
    })
    .on('data', (data:any) => {
      const [ , k, timestamp] = data.key.split(":")
      const value = data.value

      if (key !== k) {
        console.log(`LevelDB error : ${data} does not match key ${key}`)
      }
      else {
        data.push(new Metric(timestamp, value))
      }
    })
  }

  static get(callback: (error: Error | null, result?: Metric[]) => void) {
    callback(null, [
      new Metric('2013-11-04 14:00 UTC', 12),
      new Metric('2013-11-04 14:30 UTC', 15)
    ])
  }
}

/*module.exports = {
  get: (callback) => {
    callback(null, [
      { timestamp: new Date('2013-11-04 14:00 UTC').getTime(), value:12}
    , { timestamp: new Date('2013-11-04 14:30 UTC').getTime(), value:15}
    ])
  }
} */
