let formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
};

fillFormFields();

refs.form.addEventListener('input', onInput);

refs.form.addEventListener('submit', onSubmit);

function fillFormFields() {
  try {
    const savedFormData = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (!savedFormData) return;

    formData = { ...savedFormData };

    const savedFormDataKeys = Object.keys(savedFormData);

    savedFormDataKeys.forEach(
      key => (refs.form.elements[key].value = savedFormData[key])
    );
  } catch (error) {
    console.log(error.message);
  }
}

function onInput({ target: { name, value } }) {
  formData[name] = value.trim();

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmit(e) {
  e.preventDefault();

  if (!formData.email.trim() || !formData.message.trim())
    return alert('Fill please all fields');

  console.log(formData);

  localStorage.removeItem('feedback-form-state');

  formData.email = '';
  formData.message = '';

  refs.form.reset();
}
