var TextEditor = function(containerName) {
  //HELPER FUNCTIONS


  //PROTOTYPE FUNCTIONS
  TextEditor.prototype.addCodeBlock = function(language) {
    var codeLanguage = language || 'markup';
    // get the selection range (or cursor     position)
    try {
      var range = window.getSelection().getRangeAt(0); 
      console.log(range);
      var strippedName = this.name.replace(/\#/g,'').replace(/\./g,'');
      var id = strippedName +  this.codeblock.count;

      this.codeblock.ids.push(id);
      this.codeblock.count = this.codeblock.count + 1;

      var newElement = document.createElement('div');
      newElement.id = id;
      my_parent = range.startContainer.parentNode.parentNode.id;
      if(my_parent === "editor" || my_parent === strippedName) {
        range.deleteContents();
        range.insertNode(newElement);
        var code_block = $('#'+id);
        code_block.height(100);
        code_block.css('border', '1px solid red');
        code_block.css('border-radius', '20px');
        code_block.css('margin', '5px');

        var flask = new CodeFlask;
        flask.run('#'+ id, {language: ''});
        flask.update('/* Your Code Here */');
      }

    } catch(e) {
      window.alert('Please place the cursor inside the textbox');
    }
  }

  TextEditor.prototype.toolbarElements = {
    undo: '<a href="javascript:" data-command="undo"><i class="fa fa-undo"></i></a>',
    redo: '<a href="javascript:" data-command="redo"><i class="fa fa-repeat"></i></a>',
    forecolor: '<div class="fore-wrapper"><i class="fa fa-font" style="color:#C96;"></i>'
      +'<div class="fore-palette">'
      +  '</div>'
      +'</div>',

    backcolor:  '<div class="back-wrapper"><i class="fa fa-font" style="background:#C96;"></i>'
      +'<div class="back-palette">'
      +  '</div>'
      +'</div>',
    bold: '<a href="javascript:" data-command="bold"><i class="fa fa-bold"></i></a>',
    italic: '<a href="javascript:" data-command="italic"><i class="fa fa-italic"></i></a>',
    underline: '<a href="javascript:" data-command="underline"><i class="fa fa-underline"></i></a>',
    strikeThrough: '<a href="javascript:" data-command="strikeThrough"><i class="fa fa-strikethrough"></i></a>',
    justifyLeft: '<a href="javascript:" data-command="justifyLeft"><i class="fa fa-align-left"></i></a>',
    justifyCenter: '<a href="javascript:" data-command="justifyCenter"><i class="fa fa-align-center"></i></a>',
    justifyRight: '<a href="javascript:" data-command="justifyRight"><i class="fa fa-align-right"></i></a>',
    justifyFull: '<a href="javascript:" data-command="justifyFull"><i class="fa fa-align-justify"></i></a>',
    indent: '<a href="javascript:" data-command="indent"><i class="fa fa-indent"></i></a>',
    outdent: '<a href="javascript:" data-command="outdent"><i class="fa fa-outdent"></i></a>',
    insertUnorderedList: '<a href="javascript:" data-command="insertUnorderedList"><i class="fa fa-list-ul"></i></a>',
    insertOrderedList: '<a href="javascript:" data-command="insertOrderedList"><i class="fa fa-list-ol"></i></a>',
    h1: '<a href="javascript:" data-command="h1">H1</a>',
    h2: '<a href="javascript:" data-command="h2">H2</a>',
    createlink: '<a href="javascript:" data-command="createlink"><i class="fa fa-link"></i></a>',
    unlink: '<a href="javascript:" data-command="unlink"><i class="fa fa-unlink"></i></a>',
    insertimage: '<a href="javascript:" data-command="insertimage"><i class="fa fa-image"></i></a>',
    p: '<a href="javascript:" data-command="p">P</a>',
    subscript: '<a href="javascript:" data-command="subscript"><i class="fa fa-subscript"></i></a>',
    superscript: '<a href="javascript:" data-command="superscript"><i class="fa fa-superscript"></i></a>',
    /*code:  '<div data-command= "code" class="code-wrapper"><i class="fa fa-code" style="color:#C96;"></i>'
          +'<div class="code-palette">'
          +  '</div>'
          +'</div>',*/
    code: '<a data-command="code"><i class = "fa fa-code"></i></a>'
    

  }

  TextEditor.prototype.buildFramework = function() {
    $(this.name).append(
      '<div class="toolbar">'
        + '</div>'
        + '<div id="editor" contenteditable>'
        +   '<p>Try making some changes here. Add your own text or maybe an image.</p>'
        + '</div>'
    );
    return this;
  }

  TextEditor.prototype.initCodePalette = function() {
    var textArea = this;
    $('.language-link').click(function() {

      var languageMap = {
        'Javascript': 'js',
        'HTML/ Markup': 'markup',
        'CSS' : 'css',
        'Other': ''
      }
        textArea.addCodeBlock(languageMap[$(this).text()]);

    })
  }

  //LOCAL FUNCTIONS AND VARIABLES
  this.name = containerName;
  this.codeblock = { }
  this.codeblock.count = 0;
  this.codeblock.ids = []

  this.init = function(toolbarOptions) {
    this.buildFramework().buildToolbar(toolbarOptions);
    return this;
  }


  this.buildToolbar = function(toolbarOptions) {
    this.colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
    this.toolbarOptions = toolbarOptions || ["undo", "redo", "bold", "forecolor", "insertimage"];
    var appendString = '';
    for(var option of this.toolbarOptions) {
      appendString += this.toolbarElements[option];
    };
    $(this.name + ' .toolbar').append(appendString);
    return this;
  }

  this.show = function() {

    this.initCodePalette();
    if(this.toolbarOptions.indexOf("forecolor") != -1) {
      this.forePalette = $(this.name + ' .fore-palette');
      for (var i = 0; i < this.colorPalette.length; i++) {
        this.forePalette.append('<a href="javascript:" data-command="forecolor" data-value="' + '#' + this.colorPalette[i] + '" style="background-color:' + '#' + this.colorPalette[i] + ';" class="palette-item"></a>');
      }
    }

    if(this.toolbarOptions.indexOf("backcolor") != -1) {
      this.forePalette = $(this.name + ' .fore-palette');

      this.backPalette = $(this.name + ' .back-palette');
      for (var i = 0; i < this.colorPalette.length; i++) {
        this.backPalette.append('<a href="javascript:" data-command="backcolor" data-value="' + '#' + this.colorPalette[i] + '" style="background-color:' + '#' + this.colorPalette[i] + ';" class="palette-item"></a>');
      }
    }

    var _this = this;
    $(this.name + ' .toolbar a').click(function(e) {
      var command = $(this).data('command');
      if (command == 'h1' || command == 'h2' || command == 'p') {
        document.execCommand('formatBlock', false, command);
      }
      if (command == 'forecolor' || command == 'backcolor') {
        document.execCommand($(this).data('command'), false, $(this).data('value'));
      }
      if (command == 'createlink' || command == 'insertimage') {
        url = prompt('Enter the link here: ', 'http:\/\/');
        document.execCommand($(this).data('command'), false, url);
      } 
      if (command == 'code') {
        _this.addCodeBlock();

      }
      else {
        document.execCommand($(this).data('command'), false, null);
      }
    });

    return this;
  }

}

