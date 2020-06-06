const listOfValidEmails = [];

// polifill for the remove function for IE11
if (!('remove' in Element.prototype)) {
  Element.prototype['remove'] = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

function isValidEmail(email, limitEmailsToDomain) {
  const expression = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@' +
      (limitEmailsToDomain || '([a-zA-Z0-9_\\-\\.]+)') +
      '\\.([a-zA-Z]{2,5})$'
  );

  return expression.test(email);
}

function checkAndFixInputPlaceHolder() {
  const hasEmails = listOfValidEmails.length > 0;
  const inputBox = document.querySelector('input.email-input');
  if (hasEmails) {
    inputBox.placeholder = 'add more people...';
  } else {
    inputBox.placeholder = 'add people...';
  }
}

function addEmailToList(emailsContainer, email, options) {
  email = email.trim();
  if (!email) return;
  const emailBlock = document.createElement('span');
  emailBlock.innerText = email;
  emailBlock.setAttribute('data-value', email);
  emailBlock.classList.add('email-block');

  if (listOfValidEmails.indexOf(email) > -1) {
    emailBlock.classList.add('duplicate');
    const tooltip = document.createElement('span');
    tooltip.classList.add('tooltip');
    tooltip.innerText = 'Duplicated email';
    emailBlock.appendChild(tooltip);
    emailBlock.addEventListener('mouseenter', function (e) {
      tooltip.style.display = 'block';
    });
    emailBlock.addEventListener('mouseout', function (e) {
      tooltip.style.display = 'none';
    });
  }

  if (!isValidEmail(email, options.limitEmailsToDomain)) {
    emailBlock.classList.add('invalid-email');
    emailBlock.classList.add(options.invalidEmailClass);
  } else {
    listOfValidEmails.push(email);
    emailBlock.classList.add(options.validEmailClass);
  }
  emailBlock.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  const removeBtn = document.createElement('span');
  removeBtn.innerHTML = '&times;';
  removeBtn.classList.add('remove-button');
  removeBtn.addEventListener('click', function () {
    if (this.parentElement.className.indexOf(' invalid-email') === -1) {
      listOfValidEmails.splice(
        this.parentElement.getAttribute('data-value'),
        1
      );
    }
    this.parentElement.remove();
    checkAndFixInputPlaceHolder();
  });
  emailBlock.appendChild(removeBtn);
  emailsContainer.appendChild(emailBlock);
  checkAndFixInputPlaceHolder();
}

function EmailsInput(selector, options) {
  if (!options) options = {};
  selector.classList.add('emails-input');
  const emailsContainer = document.createElement('span');
  emailsContainer.classList.add('emails-container');
  const input = document.createElement('input');
  input.classList.add('email-input');
  input.placeholder = 'add people...';
  input.setAttribute('type', 'email');

  input.addEventListener('keypress', function (e) {
    if (e.key === ',' || e.key === 'Enter') {
      if (e.target.value !== '') {
        addEmailToList(emailsContainer, e.target.value, options);
      }
      e.preventDefault();
      e.target.value = '';
    }
  });

  input.addEventListener('blur', function (e) {
    if (e.target.value !== '') {
      addEmailToList(emailsContainer, e.target.value, options);
      e.target.value = '';
    }
  });

  input.addEventListener('paste', function (e) {
    setTimeout(function () {
      const pastedContent = e.target.value.split(',');
      pastedContent.forEach(function (element) {
        addEmailToList(emailsContainer, element, options);
        e.target.value = '';
      });
    }, 50);
  });

  selector.appendChild(emailsContainer);
  selector.addEventListener('click', function () {
    input.focus();
  });

  selector.appendChild(input);

  return {
    list: listOfValidEmails,
    addEmail: function (email) {
      addEmailToList(emailsContainer, email, options);
    },
  };
}
