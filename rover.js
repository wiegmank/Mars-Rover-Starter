class Rover {
   constructor(position, mode = "NORMAL", generatorWatts = 110) {
      this.mode = mode;
      this.generatorWatts = generatorWatts;
      this.position = position;
   }

   receiveMessage(message) {

      let response = {
         message: message.name,
         results: []
      }
      for (let i = 0; i < message.commands.length; i++) {
         if (message.commands[i].commandType === "STATUS_CHECK") {
            response.results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         }
         
         else if (message.commands[i].commandType === "MODE_CHANGE") {
            if (message.commands[i].value === "NORMAL" || message.commands[i].value === "LOW_POWER") {
               response.results.push({
                  completed: true,
               }); this.mode = message.commands[i].value;
            };
         } else if (message.commands[i].commandType === "MOVE") {
            if (this.mode === "NORMAL") {
               response.results.push({
                  completed: true
               });
               this.position = message.commands[i].value;
            } else if (this.mode === "LOW_POWER") {
               response.results.push({
                  completed: false
               })
            }
         } 
      }
      return response;
   }
}

module.exports = Rover;