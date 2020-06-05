# multi-emails-input

a small library to convert a div into a multiple emails input.

## features
- [ ] EmailsEditor component can be possible to use in any other form or app independently.
- [x] Email block should be created by pressing Enter, entering comma, or by losing focus on the input field. A Block can be deleted.
- [x] Input width must depend on the parent container’s width and height. If parent width changes, emails should be redistributed by rows.
- [x] Other than that input should neither depend on the form or page styles, nor conflict with them.
- [x] If input has too many emails, user should be able to scroll it.
- [x] Pasted emails should be converted into blocks immediately. If multiple comma-separated emails are pasted (e.g., “​ivan@mail.ru​, ​max@mail.ru​”), they should be converted into multiple blocks.
- [ ] "​Add email​" button adds a random email to the list.
- [ ] "​Get emails count​" button shows an alert with valid emails count.
- [x] Do NOT implement editing of added emails.
- [x] It should be possible to create several emails editors on the same page.
- [x] emails-input​ should have no external dependencies like React, Lodash or any polyfills. Usage of TypeScript, Less, Webpack, etc. is for your consideration.
- [ ] Tests are not mandatory, but having them is a plus.
- [x] Performance isn’t a big concern, but there should be no major flaws, such as memory leaks or re-rendering all email blocks every time you add or remove a single email.

## Sample input 
```sh
john@miro.com,invalid.email,mike@miro.com,alexander@miro.com
```

