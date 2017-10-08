import React, { Component } from 'react'
import Skeleton from '@component/Skeleton';

export default class Board extends Component {
  constructor() {
    super();
	}
	
  render() {
		return (
			<Skeleton>
				Board
			</Skeleton>
		)
  }
}
