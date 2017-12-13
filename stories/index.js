import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import ButtonRemove from '../src/components/button/remove/ButtonRemove';

import 'font-awesome/css/font-awesome.css';


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={ action('clicked') }>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={ action('clicked') }>😀 😎 👍 💯</Button>);

storiesOf('ButtonRemove', module)
  .add('with text', () => <ButtonRemove onClick={ action('clicked') } />)