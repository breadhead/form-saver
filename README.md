# form-saver

> Provides an easy way to save data in the process of filling out forms.

It compatible only with [react-final-form](https://github.com/final-form/react-final-form).

## Instalation

`yarn add @breadhead/form-saver react-final-form final-form`

## Usage

### Auto-Save with Debounce

> Listen for value changes and automatically submit different values after a debounce period.

```js
import { withAutoSaveWithDebounce } from '@breadhead/form-saver'
import { Field, Form, FormSpy } from 'react-final-form'

const sendDataToBackend = (fields) => ...
const saveDataToLocalStorage = (fields, diff) => ...

const SaveSpy = withAutoSaveWithDebounce(FormSpy)

const PersonForm = () => (
  <Form onSubmit={sendDataToBackend}>
    {() =>
      <form>
        <SaveSpy save={saveDataToLocalStorage}>Saving...</SaveSpy>

        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />

        <Field
          name="secondName"
          component="input"
          type="text"
          placeholder="First Name"
        />

        <button type="submit">Send</button>
      </form>
    }
  </Form>
)
```

### Auto-Save on Field Blur

> Listen for values and active field changes to automatically save values when fields are blurred.

```js
import { withAutoSaveOnFieldBlur } from '@breadhead/form-saver'
import { Field, Form, FormSpy } from 'react-final-form'

const sendDataToBackend = (fields) => ...
const saveDataToLocalStorage = (fields, diff) => ...

const SaveSpy = withAutoSaveOnFieldBlur(FormSpy)

const PersonForm = () => (
  <Form onSubmit={sendDataToBackend}>
    {() =>
      <form>
        <SaveSpy
          debounce={1500}
          save={saveDataToLocalStorage}
        >
          Saving...
        </SaveSpy>

        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />

        <Field
          name="secondName"
          component="input"
          type="text"
          placeholder="First Name"
        />

        <button type="submit">Send</button>
      </form>
    }
  </Form>
)
```

Also, you can add `setFieldData` from [final-form-set-field-data](https://github.com/final-form/final-form-set-field-data) to displaying saving status for each field. Example:

```js
import { withAutoSaveOnFieldBlur, withSavingIndicator } from '@breadhead/form-saver'
import setFieldData from 'final-form-set-field-data'
import { Field, Form, FormSpy } from 'react-final-form'

const sendDataToBackend = (fields) => ...
const saveDataToLocalStorage = (fields, diff) => ...

const SaveSpy = withAutoSaveOnFieldBlur(FormSpy)
const SavingIndicator = withSavingIndicator(Field)

const PersonForm = () => (
  <Form
    onSubmit={sendDataToBackend}
    mutators={{ setFieldData }}
  >
    {({ form }) =>
      <form>
        <SaveSpy
          save={saveDataToLocalStorage}
          setFieldData={form.mutators.setFieldData}
        >
          Saving...
        </SaveSpy>

        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="First Name"
        />
        <SavingIndicator name="firstName">
          First name saving...
        </SavingIndicator>

        <Field
          name="secondName"
          component="input"
          type="text"
          placeholder="First Name"
        />
        <SavingIndicator name="secondName">
          Second name saving...
        </SavingIndicator>

        <button type="submit">Send</button>
      </form>
    }
  </Form>
)
```