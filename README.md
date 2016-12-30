# Objectives

1. Lightweight
2. Codeblocks and math equation editing support
3. Optionally attach file with uploads
4. Extract data in a form that can be saved in a Mongo Database

# Attributions
Skeleton code taken from https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657

#Progress
1. Created an object TextEditor which can be flexibly used to rapidly generate multiple rich-text editors. To do so, follow these steps: 
  1. Add html for the container within which you want the TextEditor. 
      eg:  
      ``` 
        <div class = "main-container"></div> 
      ```
  2. Include jQuery and texteditor.js in your html file in that order
  3. Call a script tag as so after the two previous script tags  
      ```
        <script>  
          var textEditor = new TextEditor('.main-container'); //Note the . indicating the class name  
          textEditor.init();  
          textEditor.show();  
        </script>
      ```
  4. textEditor.init takes an argument for toolbar display items. You can pass these options in as an array.
     eg: textEditor.init(["forecolor", "backcolor", "unlink", "insertimage"]);  
     The items are inserted in the order shown. For a full set of options, go to texteditor.js and look at TextEditor.Prototype.toolbarElements. 

#Issues to be fixed
1. Each toolbar affects all the other text editors too. This is not a problem for most actions, but undo and redo cannot be used across multiple text boxes because of this. 
