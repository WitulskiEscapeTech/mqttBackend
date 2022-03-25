const mqtt = require('mqtt')
const fs = require('fs')

//Standardized Responses

//Devices can either be listeners or activators

let devices = {}

let deviceTopics = {}

function readDevicesJson(){
  file = fs.readFileSync('./devices.json');
  json = JSON.parse(file)
  devices = json["devices"]
}

let defaultTopics = { 
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

function genTopic(topicName){

}

function findActivatorTopics(deviceName){
  topics = []
  for(let i=0; i<devices.length; i++){
    for(let j=0; j<devices[i].activators.length; j++){
      console.log("".concat(devices[i].name).concat(" listening to ".concat(devices[i].activators[j])))
      if(devices[i].activators[j] == deviceName){
        topics.push(devices[i].name)
      }
    }
  }
  return topics
}

function handleActivator(deviceName){
  deviceTopics = findActivatorTopics(deviceName)
  console.log(deviceTopics)
  response = {
    msgType: "newTopic",
    to: deviceName,
    content: deviceTopics
  }
  client.publish(defaultTopics.initTopic, JSON.stringify(response))
}

function handleListener(deviceName){
  response = {
    msgType: "newTopic",
    to: deviceName,
    content: deviceName
  }
  client.publish(defaultTopics.initTopic, JSON.stringify(response)) //tell deviceName to listen on a topic of its own name
}

function handleNewDevice(message){
  console.log("Handling new device")
  const newDeviceSettings = message.content
  console.log(newDeviceSettings)
  if(newDeviceSettings.type == "listener"){
    handleListener(newDeviceSettings.name)
  }
  else if(newDeviceSettings.type == "activator"){
    handleActivator(newDeviceSettings.name)
  }
  //findDevice(newDeviceSettings.name)
}

function handleMessges(topic, message){

  if(topic == defaultTopics.initTopic && message.msgType == "init"){
    handleNewDevice(message)
  }
  
}

readDevicesJson()

client.on('connect', function () {
  console.log('Connected')
  listenForNewDevices(defaultTopics.initTopic)
})

client.on('message', function (topic, message) {
  let jsonMessage = JSON.parse(message)
  handleMessges(topic, jsonMessage)

})

