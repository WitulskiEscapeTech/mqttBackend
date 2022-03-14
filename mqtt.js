const mqtt = require('mqtt')
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'backend',

}
const client  = mqtt.connect('mqtt://localhost:1883', options)

client.on('connect', function () {
  console.log('Connected')
  client.subscribe('test', function (err) {
    if (!err) {
      client.publish('test', 'Hello mqtt')
    }

    if(err){
        console.log(err)
    }

  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
})

