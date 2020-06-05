const listOfEmails = [];

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
  emailBlock.addEventListener('click', (e) => e.stopPropagation());

  const removeBtn = document.createElement('span');
  removeBtn.innerHTML = '&times;';
  removeBtn.classList.add('remove-button');
  removeBtn.addEventListener('click', function () {
    listOfEmails.splice(this.parentElement.innerText, 1);
    this.parentElement.remove();
    checkAndFixInputPlaceHolder();
  });
  emailBlock.append(removeBtn);

  emailsContainer.append(emailBlock);
  checkAndFixInputPlaceHolder();
}

function EmailsInput(selector) {
  selector.classList.add('emails-input');
  const emailsContainer = document.createElement('span');
  const input = document.createElement('input');
  input.classList.add('email-input');
  input.placeholder = `add people...`;
  input.setAttribute('type', 'email');

  input.addEventListener('keypress', (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      if (e.target.value !== '') {
        addEmailToList(emailsContainer, e.target.value);
      }
      e.preventDefault();
      e.target.value = '';
    }
  });

  input.addEventListener('blur', (e) => {
    if (e.target.value !== '') {
      addEmailToList(emailsContainer, e.target.value);
      e.target.value = '';
    }
  });

  input.addEventListener('paste', (e) => {
    setTimeout(function () {
      const pastedContent = e.target.value.split(',');
      pastedContent.forEach((element) => {
        addEmailToList(emailsContainer, element);
        e.target.value = '';
      });
    }, 50);
  });

  selector.append(emailsContainer);
  selector.addEventListener('click', () => {
    input.focus();
  });

  selector.append(input);

  return {
    value: listOfEmails,
  };
}
