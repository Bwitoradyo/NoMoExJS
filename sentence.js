module.exports = function() {
  var rand = Math.floor(Math.random() * 3)+1;
  var sentence = '';
  switch(rand){
    case 1:
      sentence = "hello from the console";
      break;
    case 2:
      sentence = "hello from the sentence module";
      break;
    case 3:
      sentence = "some random module";
      break;
    default:
      sentence = "I am default";
  }
    return sentence;


}
