/**
* Makecode block for CO2 sensor
*/

namespace SGBotic {

   // let rxBuffer = pins.createBuffer(9)
    let txBuffer = pins.createBuffer(9)
    let rxBuffer: Buffer = null
    let co2: number
    

    /**
    * Read CO2 concentration
    */
    //% subcategory=CO2  color=#C433FF 
    //% blockId="CO2_read" block="CO2 (PPM)"
    //% weight=100 color=#C433FF 
    export function Co2(): number {
      txBuffer.setNumber(NumberFormat.UInt8LE, 0, 0xFF)
      txBuffer.setNumber(NumberFormat.UInt8LE, 1, 0x01) 
      txBuffer.setNumber(NumberFormat.UInt8LE, 2, 0x86) 
      txBuffer.setNumber(NumberFormat.UInt8LE, 3, 0) 
      txBuffer.setNumber(NumberFormat.UInt8LE, 4, 0) 
      txBuffer.setNumber(NumberFormat.UInt8LE, 5, 0) 
      txBuffer.setNumber(NumberFormat.UInt8LE, 6, 0) 
      txBuffer.setNumber(NumberFormat.UInt8LE, 7, 0) 
      txBuffer.setNumber(NumberFormat.UInt8LE, 8, 0x79) 
      serial.writeBuffer(txBuffer)
      basic.pause(1)
      
      rxBuffer = serial.readBuffer(9)
      
      if((rxBuffer[0] === 0xFF) && (rxBuffer[1] === 0x86))
      {
        
        co2 = rxBuffer[2] 
        co2 = (co2 * 256) + rxBuffer[3]
       // co2 = (co2 << 8)| rxBuffer[3]
      
        return co2
      }else
        return 0
    }
}