var TextEditor = function(containerName) {
  this.name = containerName;

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

    if(this.toolbarOptions.indexOf("forecolor") != -1) {
      this.forePalette = $(this.name + ' .fore-palette');
      for (var i = 0; i < this.colorPalette.length; i++) {
        this.forePalette.append('<a href="#" data-command="forecolor" data-value="' + '#' + this.colorPalette[i] + '" style="background-color:' + '#' + this.colorPalette[i] + ';" class="palette-item"></a>');
      }
    }

    if(this.toolbarOptions.indexOf("backcolor") != -1) {
      this.forePalette = $(this.name + ' .fore-palette');

      this.backPalette = $(this.name + ' .back-palette');
      for (var i = 0; i < this.colorPalette.length; i++) {
        this.backPalette.append('<a href="#" data-command="backcolor" data-value="' + '#' + this.colorPalette[i] + '" style="background-color:' + '#' + this.colorPalette[i] + ';" class="palette-item"></a>');
      }
    }

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
      } else document.execCommand($(this).data('command'), false, null);
    });

    return this;
  }

}

TextEditor.prototype.toolbarElements = {
  undo: '<a href="#" data-command="undo"><i class="fa fa-undo"></i></a>',
  redo: '<a href="#" data-command="redo"><i class="fa fa-repeat"></i></a>',
  forecolor: '<div class="fore-wrapper"><i class="fa fa-font" style="color:#C96;"></i>'
    +'<div class="fore-palette">'
    +  '</div>'
    +'</div>',

  backcolor:  '<div class="back-wrapper"><i class="fa fa-font" style="background:#C96;"></i>'
    +'<div class="back-palette">'
    +  '</div>'
    +'</div>',
  bold: '<a href="#" data-command="bold"><i class="fa fa-bold"></i></a>',
  italic: '<a href="#" data-command="italic"><i class="fa fa-italic"></i></a>',
  underline: '<a href="#" data-command="underline"><i class="fa fa-underline"></i></a>',
  strikeThrough: '<a href="#" data-command="strikeThrough"><i class="fa fa-strikethrough"></i></a>',
  justifyLeft: '<a href="#" data-command="justifyLeft"><i class="fa fa-align-left"></i></a>',
  justifyCenter: '<a href="#" data-command="justifyCenter"><i class="fa fa-align-center"></i></a>',
  justifyRight: '<a href="#" data-command="justifyRight"><i class="fa fa-align-right"></i></a>',
  justifyFull: '<a href="#" data-command="justifyFull"><i class="fa fa-align-justify"></i></a>',
  indent: '<a href="#" data-command="indent"><i class="fa fa-indent"></i></a>',
  outdent: '<a href="#" data-command="outdent"><i class="fa fa-outdent"></i></a>',
  insertUnorderedList: '<a href="#" data-command="insertUnorderedList"><i class="fa fa-list-ul"></i></a>',
  insertOrderedList: '<a href="#" data-command="insertOrderedList"><i class="fa fa-list-ol"></i></a>',
  h1: '<a href="#" data-command="h1">H1</a>',
  h2: '<a href="#" data-command="h2">H2</a>',
  createlink: '<a href="#" data-command="createlink"><i class="fa fa-link"></i></a>',
  unlink: '<a href="#" data-command="unlink"><i class="fa fa-unlink"></i></a>',
  insertimage: '<a href="#" data-command="insertimage"><i class="fa fa-image"></i></a>',
  p: '<a href="#" data-command="p">P</a>',
  subscript: '<a href="#" data-command="subscript"><i class="fa fa-subscript"></i></a>',
  superscript: '<a href="#" data-command="superscript"><i class="fa fa-superscript"></i></a>',

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
