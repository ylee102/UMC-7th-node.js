
import express from 'express'          // -> ES Module
import handleAddStoreMission from './controllers/store.controller.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//가게에 미션추가. 
app.post('/api/v1/stores/:storeId/mission', handleAddStoreMission)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})