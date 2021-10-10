import React from 'react'
import { Spacer } from '../Spacer'
import { render } from '@testing-library/react-native'

// useless test for circleci
it('should have the correct styles', () => {
  const { queryByTestId } = render(<Spacer />)

  expect(queryByTestId('spacer')).toHaveStyle({ width: 10, height: 10 })
})
