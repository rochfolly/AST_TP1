import { Metric, MetricsHandler } from '../src/metrics'

const met = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 12),
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 10),
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 8)
]

const db = new MetricsHandler('./db')

db.save('0', met, (err: Error | null) => {
  if(err) throw error
  console.log('Data populated')
})
