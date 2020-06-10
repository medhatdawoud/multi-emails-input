const listOfValidEmails = [];

/**
 * checking if email is valid using regex
 *
 * @param {string} email - an email to be checked
 * @param {string} limitEmailsToDomain - optional parameter to limit email domain
 */
function isValidEmail(email, limitEmailsToDomain) {
  const expression = new RegExp(
    '^([a-zA-Z0-9_\\-\\.]+)@' +
      (limitEmailsToDomain || '([a-zA-Z0-9_\\-\\.]+)') +
      '\\.([a-zA-Z]{2,5})$'
  );

  return expression.test(email);
}

/**
 * checking in case we have emails in the list we show 'more' word
 */
function checkAndFixInputPlaceHolder() {
  const hasEmails = listOfValidEmails.length > 0;
  const inputBox = document.querySelector('input.email-input');
  if (hasEmails) {
    inputBox.placeholder = 'add more people...';
  } else {
    inputBox.placeholder = 'add people...';
  }
}

/**
 * generates an email block
 *
 * @param {Element} emailsContainer - emails container element created by lib
 * @param {string} email - email to be added to list
 * @param {object} options - provided options from user
 */
function addEmailToList(emailsContainer, email, options) {
  email = email.trim();
  if (!email) return;
  const emailBlock = document.createElement('span');
  emailBlock.innerText = email;
  emailBlock.setAttribute('data-value', email);
  emailBlock.classList.add('email-block');

  // check if email is duplicate and add style and tooltip
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
    emailBlock.classList.add(options.invalidEmailClass); // optional
  } else {
    listOfValidEmails.push(email);
    emailBlock.classList.add(options.validEmailClass); // optional
  }

  // stop propagation to enable selection email block
  emailBlock.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  const removeBtn = document.createElement('span');
  removeBtn.innerHTML = '&times;';
  removeBtn.classList.add('remove-button');
  removeBtn.addEventListener('click', function () {
    if (this.parentElement.className.indexOf(' invalid-email') === -1) {
      listOfValidEmails.splice(
        parseInt(this.parentElement.getAttribute('data-value')),
        1
      );
    }
    this.parentElement.parentNode.removeChild(this.parentElement);
    checkAndFixInputPlaceHolder();
  });
  emailBlock.appendChild(removeBtn);

  emailsContainer.appendChild(emailBlock);
  checkAndFixInputPlaceHolder();
}

/**
 * creates input box and add event listening
 *
 * @param {Element} emailsContainer - emails container element created by lib
 * @param {Object} options - provided options from user
 */
function createTextBox(emailsContainer, options) {
  const input = document.createElement('input');
  input.classList.add('email-input');
  input.placeholder = 'add people...';
  input.setAttribute('type', 'email');

  // create email block in case user press 'Enter' or comma
  input.addEventListener('keypress', function (e) {
    if (e.key === ',' || e.key === 'Enter') {
      if (e.target.value !== '') {
        addEmailToList(emailsContainer, e.target.value, options);
      }
      e.preventDefault();
      e.target.value = '';
    }
  });

  // create email block in case user lose focus
  input.addEventListener('blur', function (e) {
    if (e.target.value !== '') {
      addEmailToList(emailsContainer, e.target.value, options);
      e.target.value = '';
    }
  });

  // listen to the paste event to split and show emails blocks
  input.addEventListener('paste', function (e) {
    setTimeout(function () {
      const pastedContent = e.target.value.split(',');
      pastedContent.forEach(function (element) {
        addEmailToList(emailsContainer, element, options);
        e.target.value = '';
      });
    }, 50);
  });

  return input;
}

/**
 * return the valid array of emails
 */
function getEmailsList() {
  return listOfValidEmails;
}

/**
 * main function for the library to convert div selector to multi emails input
 *
 * @param {Element} selector - main div selector that needs to be converted into multiple emails input
 * @param {Object} options - provided options from user
 */
function EmailsInput(selector, options) {
  if (!options) options = {};

  selector.classList.add('lib-emails-input-container');
  const emailsContainer = document.createElement('span');
  emailsContainer.classList.add('emails-container');

  const input = createTextBox(emailsContainer, options);

  selector.appendChild(emailsContainer);

  selector.addEventListener('click', function () {
    input.focus();
  });

  selector.appendChild(input);

  return {
    getEmailsList,
    addEmail: function (email) {
      addEmailToList(emailsContainer, email, options);
    },
  };
}
