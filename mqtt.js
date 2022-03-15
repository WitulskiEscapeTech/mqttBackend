const mqtt = require('mqtt')

const topics = { 
  initTopic: "init"
}

const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'backend',

}
const client  = mqtt.connect('mqtt://localhost:1883', options)

function listenForNewDevices(topic){
  client.subscribe(topic, function (err) {
    if (!err) {
      console.log("Listening for new Devices...")
    }
    if(err){
        console.log(err)
    }

  })
}

function handleNewDevice(message){
  const newDeviceSettings = JSON.parse(message)
  console.log(newDeviceSettings)
}

function handleMessges(topic, message){

  if(topic == topics.initTopic){
    handleNewDevice(message)
  }
  
}


client.on('connect', function () {
  console.log('Connected')
  listenForNewDevices(topics.initTopic)
})

client.on('message', function (topic, message) {

  handleMessges(topic, message)

})

