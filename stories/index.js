import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonRemove from '../src/components/button/remove/ButtonRemove';
import Dialog from '../src/components/dialog';
import Tooltip from '../src/components/Tooltip';
import InputText from '../src/components/Input/Text/InputText';
import IconBadge from '../src/components/IconBadge';

import 'font-awesome/css/font-awesome.css';

storiesOf('InputText', module)
	.add('input with label', () => (
		<InputText id="input" label='With Label' />
	))

	.add('input with value', () => (
		<InputText id="input" label='With Label' value='initial value' />
	))

	.add('input with change listener', () => (
		<InputText id="input" label='With Change Listener' onChange={action('change')} />
	))

	.add('input with throttled change listener', () => (
		<InputText id="input" label='With Throttled (1 second)' onChange={action('change')} throttled={1000} />
	))

storiesOf('ButtonRemove', module)
	.add('with text', () => <ButtonRemove onClick={action('clicked')} />)

storiesOf('Dialog', module)
	.add('visible', () => <Dialog visible={true}>text</Dialog>)
	.add('not visible', () => <Dialog visible={false}>text</Dialog>)
	.add('with title', () => <Dialog visible={true} title='titel'>text</Dialog>)

storiesOf('Tooltip', module)
	.add('on div', () => (
		<div style={{ height: 500, width: 500 }}>
			<div id="tooltip" />
			<Tooltip text="this is a orange box">
				<div style={{ width: 50, height: 50, background: "orange" }}></div>
			</Tooltip>
			<Tooltip text="this is a black box">
				<div style={{ width: 50, height: 50, marginLeft: 50, background: "black" }}></div>
			</Tooltip>
		</div>))

storiesOf('IconBadge', module)
	.add('mail 0', () => <IconBadge icon="fa fa-envelope-o" counter={0} />)
	.add('mail 1', () => <IconBadge icon="fa fa-envelope-o" counter={1} />)
	.add('mail 10000', () => <IconBadge icon="fa fa-envelope-o" counter={10000} />)
