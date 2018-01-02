import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonRemove from '../src/components/button/remove/ButtonRemove';
import Dialog from '../src/components/dialog';
import InputText from '../src/components/input/text/InputText';


import 'font-awesome/css/font-awesome.css';

storiesOf('InputText', module)
  .add('input with label', () => (
      <InputText id="input" label='With Label' />
  ))

  .add('input with value', () => (
      <InputText id="input" label='With Label' value='initial value' />
  ))

  .add('input with change listener', () => (
    <InputText id="input" label='With Change Listener' onChange={ action('change') } />
  ))

  .add('input with throttled change listener', () => (
    <InputText id="input" label='With Throttled (1 second)' onChange={ action('change') } throttled={ 1000 } />
  ))
  
storiesOf('ButtonRemove', module)
  .add('with text', () => <ButtonRemove onClick={ action('clicked') } />)

storiesOf('Dialog', module)
.add('visible', () => <Dialog visible={ true }>text</Dialog>)
.add('not visible', () => <Dialog visible={ false }>text</Dialog>)
.add('with title', () => <Dialog visible={ true } title='titel'>text</Dialog>)