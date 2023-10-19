const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

//test 7
  it("constructor sets position and default values for mode and generatorWatts", function()  {
    const sampleRover = new Rover(2);
    expect(sampleRover.position).toBe(2);
    expect(sampleRover.mode).toBe("NORMAL");
    expect(sampleRover.generatorWatts).toBe(110);
  });
//test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    const sampleRover = new Rover(2);
    const sampleMessage = new Message("test message", ['sample command'])
    expect(sampleRover.receiveMessage(sampleMessage).message).toBe("test message");
  });
//test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the same message", function() {
    const sampleCommands = [new Command("STATUS_CHECK"), new Command("STATUS_CHECK")];
    const sampleMessage = new Message("test message", sampleCommands)
    const sampleRover = new Rover(2);
    //console.log(sampleRover.receiveMessage(sampleMessage).results);
    expect(sampleRover.receiveMessage(sampleMessage).results.length).toBe(2);
  });
//test 10
  it("responds correctly to the status check command", function() {
    const sampleCommands = [new Command("STATUS_CHECK")];
    const sampleMessage = new Message("test message", sampleCommands);
    const sampleRover = new Rover(111, "NORMAL", 888);
    sampleRover.receiveMessage(sampleMessage);
    expect(sampleRover.receiveMessage(sampleMessage).results[0].roverStatus).toEqual(
      expect.objectContaining({
        mode: "NORMAL",
        generatorWatts: 888,
        position: 111
      })
    )
  });

//test 11
  it("responds correctly to the mode change command", function() {
    const sampleCommands = [new Command("STATUS_CHECK"), new Command("MODE_CHANGE", "LOW_POWER")];
    const sampleMessage = new Message("test message", sampleCommands);
    const sampleRover = new Rover(111, "NORMAL", 888);
    sampleRover.receiveMessage(sampleMessage);
    expect(sampleRover.receiveMessage(sampleMessage).results[1].completed).toEqual(true)
  });

//test 12

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    const sampleCommands = [new Command("STATUS_CHECK"), new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 444)];
    const sampleMessage = new Message("test message", sampleCommands);
    const sampleRover = new Rover(888, "NORMAL", 111);  
    sampleRover.receiveMessage(sampleMessage);
    //expect rover in low-power to have same position after a "move" command
    expect(sampleRover.receiveMessage(sampleMessage).results[2].completed).toEqual(false) 
    expect(sampleRover).toEqual(expect.objectContaining({
      mode: "LOW_POWER",
        generatorWatts: 111,
        position: 888
    }))
  });

//test 13
  it("responds with the position for the move command", function() {
    const sampleCommands = [new Command("STATUS_CHECK"), new Command("MOVE", 2222), new Command("STATUS_CHECK")];
    const sampleMessage = new Message("test message", sampleCommands);
    const sampleRover = new Rover(1111, "NORMAL", 111);  
    sampleRover.receiveMessage(sampleMessage);
    //expect here
    expect(sampleRover.position).toBe(2222);
  });

});
