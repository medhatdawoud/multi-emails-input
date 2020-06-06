# multi-emails-input

multi-emails-input is a small library to convert a div into a multiple emails input, basically if you have any `div` and you want to convert it into a multi emails input this lib is best to do that.

## How to use?

You can start by adding the JavaScript file into html.

```html
<script src="<PATH_TO_LIB>/emails-input.js"></script>
```

Also add the CSS file into your head tag

```html
<link rel="stylesheet" src="<PATH_TO_LIB>/emails-input.css" />
```

You can wrap your div selector with the provided function as follow:

```html
<div id="emails-input"></div>
<script>
  const inputContainerNode = document.querySelector('#emails-input');
  const emailsInput = EmailsInput(inputContainerNode);
</script>
```

This will convert the normal div into a multi emails input container.

<img src="https://i.imgur.com/JR7DHZz.gif" width="100%">

## Features

- Email block can be created by pressing `Enter`, entering comma `,` , or by losing focus on the input field `blur` event.
- A Block can be deleted by the `X` sign in each block.
- Pasted emails will be converted into blocks immediately. (e.g., “`max@mail.ru`, `ivan@mail.ru`”) they should be converted into multiple blocks.
- Invalid emails are not added to the returned list.
- Duplicated emails have different style to expose them and can be deleted.
- `EmailsInput` function as shown in the example above returns an object of 2 
  - `list`: an array of valid emails as shown in the element. 
  - `addEmail`: a function that you can send an email and it will be added to the list.

## Options

- `limitEmailsToDomain`: is an option to define what email is valid and what is not so for example if you provided this option as `gmail` then any email other than gmail will be considered as invalid.
- `invalidEmailClass`: is an option to provide a different class for the invalid emails that overrides the default style in case the user needs to.
- `validEmailClass`: is an option to provide a different class for the valid emails same as the invalid one.
- Example:

```js
const emailsInput = EmailsInput(inputContainerNode, {
  limitEmailsToDomain: 'gmail',
  invalidEmailClass: 'custom-invalid-email',
  validEmailClass: 'custom-valid-email',
});
```
