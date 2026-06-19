const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

const port = process.env.PORT || 3001
let connects = []

app.use(express.static('public'))

app.ws('/ws', (ws, req) => {
  connects.push(ws)

  ws.on('message', (message) => {
      connects.forEach((socket) => {
      if (socket.readyState === 1) {
        socket.send(message)
      }
    })
  const { text } = JSON.parse(message)
  let reply = "メッセージありがとうございます！キーワードを入れると返信が返ってくるかも…？"
  if(text === "犬"){
    reply = "ワン、ワワン。 ワン！ワンワンワンワン！！！キャオンクォン！クゥーンクンクンクーンキャイーンワオワオワオ！"
  }
  if(text === "電大"){
    reply = "東京電機大学（とうきょう でんきだいがく、英語: Tokyo Denki University）は、日本の私立大学。東京都足立区千住旭町に本部を置く。1907年創立、1949年大学設置。略称は電大、電機大、TDU。"
  }
  const botMessage = {
    id: "BOT",
    text: reply
  }
    connects.forEach((socket) => {
      if(socket.readyState === 1){
        socket.send(JSON.stringify(botMessage))
      }
    }) 
  })

  ws.on('close', () => {
    connects = connects.filter((conn) => conn !== ws)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
