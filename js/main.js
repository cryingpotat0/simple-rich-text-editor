var textEditor = new TextEditor('.main-container');
textEditor.init();
textEditor.show();

var textEditor = new TextEditor('.main-container-2');
textEditor.init(["code", "forecolor", "backcolor", "unlink", "insertimage", "undo"]).show();


var createCodeSelector = function() {
  var languageMap = {
    'Javascript': 'js',
    'HTML/ Markup': 'markup',
    'CSS' : 'css',
    'Other': ''
  }
  var my_elem = $('.code-palette')
  my_elem.css('width', '100px');
  for(var language in languageMap) {
    my_elem.append('<div class = "language-link" >'+language+'</a></div>');
  }
}

createCodeSelector();
