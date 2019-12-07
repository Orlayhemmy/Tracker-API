const request = require('supertest');
const app = require('../index');
const { dbOff, flushCollections } = require('../dbConnection')

beforeAll(() => flushCollections())
afterAll(() => dbOff());

describe('Event Endpoints', () => {
  it('should create a new event', async () => {
    const res = await request(app)
      .post('/')
      .send({
        "start": "01/01/19",
        "end": "02/01/19",
        "title": "conference",
        "details": "Not available",
        "location": {
          "address": "Not available",
          "latLng": {
            "lat": "3.1",
            "lng": "2.1"
          }
        }
      })
    expect(res.status).toEqual(201)
    expect(res.body.success).toEqual(true)
    expect(res.body.event).not.toEqual(null)
  })

  it('should get all events', async () => {
    const res = await request(app)
      .get('/')
    expect(res.status).toEqual(200)
    expect(res.body.success).toEqual(true)
    expect(res.body.events).toHaveLength(1)
  })

  it('should throw an error when event date is taken ', async () => {
    const res = await request(app)
      .post('/')
      .send({
        "start": "01/01/19",
        "end": "02/01/19",
        "title": "conference",
        "details": "Not available",
        "location": {
          "address": "Not available",
          "latLng": {
            "lat": "3.1",
            "lng": "2.1"
          }
        }
      })
      expect(res.status).toEqual(409)
      expect(res.body.success).toEqual(false)
      expect(res.body.message).toEqual('An Event already exist at this venue on this day')
  })
})
