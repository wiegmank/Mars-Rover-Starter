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
    console.log(sampleRover.receiveMessage(sampleMessage));
    console.log(sampleRover.receiveMessage(sampleMessage).results);
    console.log(sampleMessage.commands[0].commandType);
    expect(sampleRover.receiveMessage(sampleMessage).results.length).toBe(2);
  });
//test 10
  it("responds correctly to the status check command", function() {
    //expect here "STATUS_CHECK" command - roverStatus object describes state of 
    //rover object (values will depend on current state of rover)
    const sampleCommands = [new Command("STATUS_CHECK")];
    const sampleMessage = new Message("test message", sampleCommands);
    const sampleRover = new Rover(0);
    sampleRover.receiveMessage(sampleMessage)
    expect(sampleMessage.commands[0].commandType).toBe("STATUS_CHECK");
  });

//test 11
  it("responds correctly to the mode change command", function() {
    //expect here - check the 'completed' property and rover mode for accuracy; acceptable 'modes' are 'LOW_POWER'
    //and 'NORMAL'
  });

/*
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    //expect here
  });

  it("responds with the position for the move command", function() {
    //expect here
  });
*/
});
