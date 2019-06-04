import {advanceTo, clear} from 'jest-date-mock'
import * as React from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import {END_DATE, START_DATE} from '@datepicker-react/hooks'
import Datepicker from '.'

beforeEach(() => {
  advanceTo(new Date(2019, 2, 27, 0, 0, 0))
})

afterEach(() => {
  clear()
})

test('should have empty start and end date and focused start date', () => {
  const onDatesChange = jest.fn()
  const {container, getAllByText, getByText, getAllByTestId, getByTestId} = render(
    <Datepicker
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(getAllByText('Select').length).toBe(2)
  expect(getByText('March 2019'))
  expect(getByText('April 2019'))

  // Click on close (fire default function
  fireEvent.click(getByTestId('DatepickerClose'))

  // Test if first day is monday
  // @ts-ignore
  expect(getAllByTestId('DayLabel')[0]).toHaveTextContent('Mo')

  // Click on March 16
  const selectedDay = getAllByTestId('Day')[15]
  // @ts-ignore
  expect(selectedDay).toHaveTextContent('16')
  fireEvent.click(selectedDay)
  expect(onDatesChange).toHaveBeenCalledWith({
    startDate: new Date(2019, 2, 16, 0, 0, 0),
    endDate: null,
    focusedInput: END_DATE,
  })
})

test('should custom render day', () => {
  const onDatesChange = jest.fn()
  const {container, getAllByText, getByText, getAllByTestId, getByTestId} = render(
    <Datepicker
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
      onDayRender={(date: Date) => <div>{date.toDateString()}</div>}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(getAllByText('Select').length).toBe(2)
  expect(getByText('March 2019'))
  expect(getByText('April 2019'))

  // Click on close (fire default function
  fireEvent.click(getByTestId('DatepickerClose'))

  // Test if first day is monday
  // @ts-ignore
  expect(getAllByTestId('DayLabel')[0]).toHaveTextContent('Mo')

  // Click on March 16
  const selectedDay = getAllByTestId('Day')[15]
  // @ts-ignore
  expect(selectedDay).toHaveTextContent('16')
  fireEvent.click(selectedDay)
  expect(onDatesChange).toHaveBeenCalledWith({
    startDate: new Date(2019, 2, 16, 0, 0, 0),
    endDate: null,
    focusedInput: END_DATE,
  })
})

test('should select exact range', () => {
  const onDatesChange = jest.fn()
  const {container, getAllByText, getByText, getAllByTestId, getByTestId} = render(
    <Datepicker
      exactMinBookingDays
      minBookingDays={7}
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(getAllByText('Select').length).toBe(2)
  expect(getByText('March 2019'))
  expect(getByText('April 2019'))

  // Click on close (fire default function
  fireEvent.click(getByTestId('DatepickerClose'))

  // Test if first day is monday
  // @ts-ignore
  expect(getAllByTestId('DayLabel')[0]).toHaveTextContent('Mo')

  // Click on March 16
  const selectedDay = getAllByTestId('Day')[15]
  // @ts-ignore
  expect(selectedDay).toHaveTextContent('16')
  fireEvent.click(selectedDay)
  expect(onDatesChange).toHaveBeenCalledWith({
    startDate: new Date(2019, 2, 16, 0, 0, 0),
    endDate: new Date(2019, 2, 22, 0, 0, 0),
    focusedInput: null,
  })
})

test('should render vertical datepicker', () => {
  const onDatesChange = jest.fn()
  const {container} = render(
    <Datepicker
      vertical
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
    />,
  )
  expect(container).toMatchSnapshot()
})

test('should go to next and previous month - vertical variant', () => {
  const onDatesChange = jest.fn()
  const {container, getAllByTestId} = render(
    <Datepicker
      vertical
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
    />,
  )
  expect(container).toMatchSnapshot()

  // Go to next month
  act(() => {
    fireEvent.click(getAllByTestId('DatepickerNavButton')[1])
  })
  expect(container).toMatchSnapshot()

  // Go to prev month
  act(() => {
    fireEvent.click(getAllByTestId('DatepickerNavButton')[0])
  })
  expect(container).toMatchSnapshot()
})

test('should have empty end date and focused end date', () => {
  const onDatesChange = jest.fn()
  const {container, getAllByText, getByText, getAllByTestId} = render(
    <Datepicker
      firstDayOfWeek={0}
      minBookingDate={new Date(2019, 1, 16, 0, 0, 0)}
      maxBookingDate={new Date(2020, 1, 16, 0, 0, 0)}
      startDate={new Date(2019, 2, 16, 0, 0, 0)}
      endDate={null}
      focusedInput={END_DATE}
      onDatesChange={onDatesChange}
    />,
  )
  expect(container).toMatchSnapshot()
  expect(getByText('03/16/2019'))
  expect(getAllByText('Select').length).toBe(1)
  expect(getByText('March 2019'))
  expect(getByText('April 2019'))

  // Test if first day is sunday
  // @ts-ignore
  expect(getAllByTestId('DayLabel')[0]).toHaveTextContent('Su')

  // Click on March 19
  const selectedDay = getAllByTestId('Day')[18]
  // @ts-ignore
  expect(selectedDay).toHaveTextContent('19')
  fireEvent.click(selectedDay)
  expect(onDatesChange).toHaveBeenCalledWith({
    startDate: new Date(2019, 2, 16, 0, 0, 0),
    endDate: new Date(2019, 2, 19, 0, 0, 0),
    focusedInput: null,
  })
})

test('should execute onClose callback', () => {
  const onDatesChange = jest.fn()
  const onClose = jest.fn()
  const {getByTestId, getByText, getAllByText} = render(
    <Datepicker
      firstDayOfWeek={0}
      minBookingDate={new Date(2019, 1, 16, 0, 0, 0)}
      maxBookingDate={new Date(2020, 1, 16, 0, 0, 0)}
      startDate={new Date(2019, 2, 16, 0, 0, 0)}
      endDate={null}
      focusedInput={END_DATE}
      onDatesChange={onDatesChange}
      onClose={onClose}
      displayFormat="DD.MM.YYYY"
      phrases={{
        datepickerStartDatePlaceholder: 'test',
        datepickerStartDateLabel: 'test',
        datepickerEndDateLabel: 'test',
        datepickerEndDatePlaceholder: 'test',
        resetDates: 'test',
      }}
    />,
  )

  // Get formatted date
  getByText('16.03.2019')

  expect(getAllByText('test').length).toBe(4)

  fireEvent.click(getByTestId('DatepickerClose'))
  expect(onClose).toHaveBeenCalled()
})

test('should select today date with right arrow key', () => {
  advanceTo(new Date(2019, 2, 1, 0, 0, 0))

  const onDatesChange = jest.fn()
  const onClose = jest.fn()
  const {container, getAllByTestId} = render(
    <Datepicker
      firstDayOfWeek={0}
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
      onClose={onClose}
      displayFormat="DD.MM.YYYY"
    />,
  )

  fireEvent.keyDown(container, {key: 'ArrowRight'})
  // @ts-ignore
  expect(getAllByTestId('Day')[0]).toHaveFocus()
  clear()
})

test('should select today date with left arrow key', () => {
  advanceTo(new Date(2019, 2, 1, 0, 0, 0))

  const onDatesChange = jest.fn()
  const onClose = jest.fn()
  const {container, getAllByTestId} = render(
    <Datepicker
      firstDayOfWeek={0}
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
      onClose={onClose}
      displayFormat="DD.MM.YYYY"
    />,
  )

  fireEvent.keyDown(container, {key: 'ArrowLeft'})
  // @ts-ignore
  expect(getAllByTestId('Day')[0]).toHaveFocus()
  clear()
})

test('should select today date with up arrow key', () => {
  advanceTo(new Date(2019, 2, 1, 0, 0, 0))

  const onDatesChange = jest.fn()
  const onClose = jest.fn()
  const {container, getAllByTestId} = render(
    <Datepicker
      firstDayOfWeek={0}
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
      onClose={onClose}
      displayFormat="DD.MM.YYYY"
    />,
  )

  fireEvent.keyDown(container, {key: 'ArrowUp'})
  // @ts-ignore
  expect(getAllByTestId('Day')[0]).toHaveFocus()
  clear()
})

test('should select today date with down arrow key', () => {
  advanceTo(new Date(2019, 2, 1, 0, 0, 0))

  const onDatesChange = jest.fn()
  const onClose = jest.fn()
  const {container, getAllByTestId} = render(
    <Datepicker
      firstDayOfWeek={0}
      startDate={null}
      endDate={null}
      focusedInput={START_DATE}
      onDatesChange={onDatesChange}
      onClose={onClose}
      displayFormat="DD.MM.YYYY"
    />,
  )

  fireEvent.keyDown(container, {key: 'ArrowDown'})
  // @ts-ignore
  expect(getAllByTestId('Day')[0]).toHaveFocus()

  // Next week
  fireEvent.keyDown(getAllByTestId('Day')[0], {key: 'ArrowDown'})
  // @ts-ignore
  expect(getAllByTestId('Day')[7]).toHaveFocus()

  // Previous week
  fireEvent.keyDown(getAllByTestId('Day')[7], {key: 'ArrowUp'})
  // @ts-ignore
  expect(getAllByTestId('Day')[0]).toHaveFocus()

  // Next day
  fireEvent.keyDown(getAllByTestId('Day')[0], {key: 'ArrowRight'})
  // @ts-ignore
  expect(getAllByTestId('Day')[1]).toHaveFocus()

  // Previous day
  fireEvent.keyDown(getAllByTestId('Day')[1], {key: 'ArrowLeft'})
  // @ts-ignore
  expect(getAllByTestId('Day')[0]).toHaveFocus()

  clear()
})
