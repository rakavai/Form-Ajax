# Form-Ajax
The JQuery form plugin which allows you to submit the form using ajax very easily.

###Getting Started and Example code
####Quick Start

*Add a form to your document:*
```html
  <form action="http://rakibul-hasan.com/external/mock-data.php" method="post" id="the-form">
      First name: <input type="text" name="firstname"><br>
      Last name: <input type="text" name="lastname"><br>
      <button type="submit" style="" data-show-loading="true">Submit</button>
  </form>
```

*Include jquery and add FormAjax plugin:*
```javascript
$(document).ready(function(){
    $("#the-form").formAjax(function (output) {
          alert(output.success);
    });
});
```
###Some features and options
* Show 'loading' in ui
 * After adding attrubute `data-show-loading="true"` in any element inside the form will show `Loading...` on submitting the form.
    
    Custom text can be shown by adding attribute `data-loading-text`. ex.
  
 * Example  
    ```html
    <span data-show-loading="true" data-loading-text="Custom loading sign..."></span>
    ```
    ```html
    <button type="submit" style="" data-show-loading="true">Submit</button>
    ```

* Prevent double submission of form
  * Just add the `data-lock="auto"` in the form.
    This will prevent the form submission twice untill the from submission is completed even if a user try to submit it .
  * Example
    ```html
    <form action="..." data-lock="auto">
      ...
    </form>
    ```
* Reset form input value
  * To reset the form automatically after succesfull form submission just add `data-reset="auto"`
  * Example
    ```html
    <form action="..." data-reset="auto">
      ...
    </form>
    ```
    
* File upload
  * Using this plugin you can upload file using ajax. Just don't forget to add `enctype="multipart/form-data"` and method type post with the form.


####Little bit more about `$("...").formAjax()`:
*Handle error and always function*
```javascript
  $("#the-form").formAjax(
      function (output) {
          //This function will be called on success
          alert(output.success);
      },
      function(jqXHR, textStatus){
          //This function will be called if an error is raised
          alert("Error Occured: "+textStatus);
      },
      function(){
          //This function will be called always after response
      }
  );

```
