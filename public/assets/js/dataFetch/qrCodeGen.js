
const QRCodeGenerator = (eventMappingList)=>{
  for(let [key,value] of Object.entries(eventMappingList)){
    // console.log(`${key}:${value}`)
    new QRCode(key.toString(),value);
  }
}

