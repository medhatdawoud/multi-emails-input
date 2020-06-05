const listOfEmails = [];

// polifill for the remove function for IE11
if (!('remove' in Element.prototype)) {
  Element.prototype['remove'] = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

function isValidEmail(email) {
  const expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return expression.test(email);
}

function checkAndFixInputPlaceHolder() {
  const hasEmails = listOfEmails.length > 0;
  const inputBox = document.querySelector('input.email-input');
  if (hasEmails) {
    inputBox.placeholder = 'add more people...';
  } else {
    inputBox.placeholder = 'add people...';
  }
}

function addEmailToList(emailsContainer, email) {
  const emailBlock = document.createElement('span');
  emailBlock.classList.add('email-block');
  if (!isValidEmail(email)) {
    emailBlock.classList.add('invalid-email');
  } else {
    listOfEmails.push(email);
  }
  emailBlock.innerText = email;
  emailBlock.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  const removeBtn = document.createElement('span');
  removeBtn.innerHTML = '&times;';
  removeBtn.classList.add('remove-button');
  removeBtn.addEventListener('click', function () {
    listOfEmails.splice(this.parentElement.innerText, 1);
    this.parentElement.remove();
    checkAndFixInputPlaceHolder();
  });
  emailBlock.appendChild(removeBtn);

  emailsContainer.appendChild(emailBlock);
  checkAndFixInputPlaceHolder();
}

function EmailsInput(selector) {
  selector.classList.add('emails-input');
  const emailsContainer = document.createElement('span');
  const input = document.createElement('input');
  input.classList.add('email-input');
  input.placeholder = 'add people...';
  input.setAttribute('type', 'email');

  input.addEventListener('keypress', function (e) {
    if (e.key === ',' || e.key === 'Enter') {
      if (e.target.value !== '') {
        addEmailToList(emailsContainer, e.target.value);
      }
      e.preventDefault();
      e.target.value = '';
    }
  });

  input.addEventListener('blur', function (e) {
    if (e.target.value !== '') {
      addEmailToList(emailsContainer, e.target.value);
      e.target.value = '';
    }
  });

  input.addEventListener('paste', function (e) {
    setTimeout(function () {
      const pastedContent = e.target.value.split(',');
      pastedContent.forEach(function (element) {
        addEmailToList(emailsContainer, element);
        e.target.value = '';
      });
    }, 50);
  });

  selector.appendChild(emailsContainer);
  selector.addEventListener('click', function () {
    input.focus();
  });

  selector.appendChild(input);

  // TODO: fix logic of the valid emails after deleting some is not correct
  return {
    value: listOfEmails,
  };
}
