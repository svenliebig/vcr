import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonRemove from '../src/components/button/remove/ButtonRemove';
import InputText from '../src/components/input/text/InputText';


import 'font-awesome/css/font-awesome.css';

storiesOf('InputText', module)
  .add('input with label', () => (
      <InputText label='Label' />
  ))
  
storiesOf('ButtonRemove', module)
  .add('with text', () => <ButtonRemove onClick={ action('clicked') } />)