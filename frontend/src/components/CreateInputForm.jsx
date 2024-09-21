import React, { useState } from 'react';
import { Form, Button, Label, FormInput, Segment } from 'semantic-ui-react';
import { deepCopyArrayOfObjects } from '@utils/functions.js';

/**
 * @typedef {Object} FormField
 * @property {string} name - The name of the form field.
 * @property {string} value - The default value of the form field.
 * @property {boolean} required - Whether the form field is required.
 */

/**
 *
 * @param {Object} props
 * @param {import('./CreateInputForm').FormField[]} props.state default state
 * @param {String} props.stateKey the key of the object state that we are going to edit
 * @param {Function} props.setState sets the new updated state after the user interacts with it
 * @returns
 */
function InputWLabel({ state, setState, curStateIndex }) {
  return (
    <Segment basic>
      <Label style={{ minWidth: 50, margin: 0 }} size='medium'>
        {state[curStateIndex].name}
      </Label>
      <FormInput
        style={{ margin: 0 }}
        id={`${curStateIndex}`}
        error={state[curStateIndex]?.error}
        size='small'
        placeholder={state[curStateIndex].name}
        value={state[curStateIndex].value}
        onChange={(event) => {
          // i love mutating state
          let newState = deepCopyArrayOfObjects(state);
          newState[curStateIndex] = { ...newState[curStateIndex], value: event.target.value, error: false };
          setState(newState);
        }}
      ></FormInput>
    </Segment>
  );
}

/**
 *
 * @param {import('./CreateInputForm').FormField[]} state
 * @param {Function} setState
 */
function CreateInputs(state, setState) {
  const InputWLabelArr = [];
  for (let i = 0; i < state.length; i++) {
    InputWLabelArr.push(<InputWLabel key={`${state[i].name}-${i}`} state={state} setState={setState} curStateIndex={i} />);
  }
  return InputWLabelArr;
}

/**
 * Makes deep copy
 * @param {FormField[]} formFieldArr
 * @param {Int} index
 * @returns {FormField[]} new form field array with updated value at given index
 */
function addErrToFormField(formFieldArr, index) {
  return formFieldArr.map((field, i) => {
    if (i === index) {
      return { ...field, error: `${field.name} is required` };
    }
    return { ...field };
  });
}

/**
 *
 * @param {FormField[]} formFieldArr
 * @param {Int} index
 * @returns {FormField[]} new form field array with updated value at given index
 */
function removeErrFromFormField(formFieldArr, index) {
  return formFieldArr.map((field, i) => {
    if (i === index) {
      return { ...field, error: false };
    }
    return { ...field };
  });
}

/**
 * Calls on Submit with a object which holds keys of names you sent in the form field and values of the user inputted values
 * 
 *
 * @param {Object} props
 * @param {FormField[]} props.formFields
 * @param {Function} props.onSubmit
 * @param {String} buttonText
 * @example <CreateInputForm
            onSubmit={({ method, route, data }) => { // heres what it returning getting destructured
              axios({ method, data, url: route, baseUrl: null }).then((ress) => setRes('good response'));
            }}
            formFields={[
              { name: 'method', value: '', required: true },
              { name: 'route', value: '/api/', required: true },
              { name: 'data', value: '', required: false },
            ]}
          />
          {res}
        
 */
export default function CreateInputForm({ onSubmit, formFields, buttonText = 'Submit' }) {
  const [inputFields, setInputFields] = useState(formFields);

  function mapStateToObject() {
    // clense
    let finalObj = {};
    for (let i = 0; i < inputFields.length; i++) {
      finalObj[inputFields[i].name] = inputFields[i].value;
    }
    return finalObj;
  }

  /**
   * updates error tag and updates state, if it does not need to change anything it returns true
   * @returns {Boolean} if current form is valid
   */
  function validate() {
    let valid = true;
    let updatedFields = inputFields;
    for (let i = 0; i < inputFields.length; i++) {
      if (updatedFields[i].required === true && updatedFields[i].value === '') {
        updatedFields = addErrToFormField(updatedFields, i);
        valid = false;
      } else {
        updatedFields = removeErrFromFormField(updatedFields, i);
      }
    }
    setInputFields(updatedFields);
    return valid;
  }

  return (
    <Form
      key={'input_form'}
      onSubmit={() => {
        if (validate()) {
          onSubmit(mapStateToObject());
          setInputFields(formFields);
        }
      }}
    >
      {CreateInputs(inputFields, setInputFields)}
      <Button key={'form_button'}>{buttonText}</Button>
    </Form>
  );
}
