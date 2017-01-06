# Objectives

1. Lightweight
2. Codeblocks and math equation editing support
3. Optionally attach file with uploads
4. Extract data in a form that can be saved in a Mongo Database


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
     eg: ```textEditor.init(["forecolor", "backcolor", "unlink", "insertimage"]);  ```  
     The items are inserted in the order shown. For a full set of options, go to texteditor.js and look at TextEditor.Prototype.toolbarElements.
2. Storing and persisting data on a single editor can be done using the helper functions:
  1. textEditor.storableData() returns html in a storable format. This should be sanitized by the backend before storage.
  2. textEditor.persistData(data) takes the data as an argument and regenerates the editor as it looked earlier.
3. To generate and use multiple text editors, the following functions are useful:
  1. textEditor.generateN(n, options) can be called after creating a new TextEditor. It replaces the original div with div's having class names differing by a number. For example, 
  ```
  var textEditor = new TextEditor('.main-container');
  textEditor.generateN(2, ['code', 'forecolor', 'backcolor', 'unlink']);
  ```
  Creates 2 textEditors with classes main-container0 and main-container1. Since the text editors are appended to the parent element, it is good practice to surround the main-container div with some sort of parent div that contains all the text editors.
  2. textEditor.singleToolbar() removes all the extra toolbars of each textEditor and makes the toolbar fixed to the center of the page.
  3. textEditor.storableDataN(n, dataObject) takes the number of text editors (n) and populates the data object with the data from each of the text editors.
  4. textEditor.persistDataN(n, data) takes the data object returned by the storableDataN function and the number of textEditors and populates the right text editor with the right data.
  5. textEditor.displayMode() removes the ability to edit the text editors and hides all toolbars.
  6. textEditor.makeEditable() reverses the effects of textEditor.displayMode() and reintroduces a single toolbar.

# Attributions
Skeleton code taken from https://code.tutsplus.com/tutorials/create-a-wysiwyg-editor-with-the-contenteditable-attribute--cms-25657

#Issues to be fixed
1. Each toolbar affects all the other text editors too. This is not a problem for most actions, but undo and redo cannot be used across multiple text boxes because of this. A temporary fix is to only use a single toolbar throughout the page, but this still doesn't solve the underlying issue
