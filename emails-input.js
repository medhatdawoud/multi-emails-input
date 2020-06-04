const listOfEmails = [];

function isValidEmail(email) {
  const expression = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return expression.test(email);
}

function addEmailToList(emailsContainer, email) {
  const emailBlock = document.createElement('span');
  emailBlock.classList.add('email-block');
  if (!isValidEmail(email)) {
    emailBlock.classList.add('invalid-email');
  }
  emailBlock.innerText = email;
  const removeBtn = document.createElement('span');
  removeBtn.innerHTML = '&times;';
  removeBtn.classList.add('remove-button');
  removeBtn.addEventListener('click', function (e) {
    this.parentElement.remove();
  });
  emailBlock.append(removeBtn);
  listOfEmails.push(email);
  emailsContainer.append(emailBlock);
}

function EmailsInput(selector) {
  selector.classList.add('emails-input');
  const emailsContainer = document.createElement('span');
  const input = document.createElement('input');
  input.classList.add('email-input');
  input.placeholder = `add more people...`;
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
}
