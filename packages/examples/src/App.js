import React, {useReducer, useState} from 'react'
import {ThemeProvider} from 'styled-components'
import {DateRangeInput} from '@datepicker-react/styled'

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

function reducer(state, action) {
  console.log(state, action)
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [numberOfMonths, setNumberOfMonths] = useState(2)

  function onClick() {
    setNumberOfMonths(1)
  }

  return (
    <div
      style={{
        marginTop: '600px',
        height: '80px',
        width: '100%',
        background: '#001217',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button onClick={onClick}>Number of months = 1</button>
      <div style={{width: '279px'}}>
        <ThemeProvider
          theme={{
            reactDatepicker: {
              inputCalendarWrapperPosition: 'absolute',
              inputCalendarWrapperHeight: '20px',
              inputCalendarWrapperWidth: '20px',
              inputCalendarWrapperTop: '10px',
              inputCalendarWrapperLeft: '10px',
              daySize: [30, 50],
              // selectDatePadding: '30px 0 0',
              // fontFamily: 'arial',
              // selectDateLabelFontSize: '20px',
              // selectDateDateFontSize: '30px',
              // selectDateLabelColor: 'red',
              // selectDateDateColor: 'red',
              // selectDateDateFontWeight: 700,
              // selectDateDatePadding: '0 0 50px',
            },
          }}
        >
          <DateRangeInput
            minBookingDate={new Date()}
            maxBookingDate={new Date(2020, 6, 27)}
            startDate={state.startDate}
            endDate={state.endDate}
            onDateChange={data => dispatch({type: 'dateChange', payload: data})}
            numberOfMonths={numberOfMonths}
            focusedInput={state.focusedInput}
            onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
            // styles={{
            //   inputGridTemplateColumns: '1fr 20px 1fr',
            //   inputGridBackground: '#ffffff',
            //   inputGridBorder: '1px solid #d0d0d0',
            //   inputGridBorderRadius: '2px',
            //
            //   inputBorder: '0',
            //   inputMinHeight: '48px',
            //   inputStartDatePadding: '0 0 0 44px',
            //   inputEndDatePadding: '0',
            //   inputArrowIconColor: 'red',
            //   inputArrowIconOpacity: 1,
            //   inputCalendarWrapperTop: '18px',
            //
            //   daySize: '45px',
            //   selectDateGridTemplateColumns: '126px 50px 126px',
            //   datepickerBottom: '100px',
            // }}
          />
        </ThemeProvider>
      </div>
    </div>
  )
}

export default App
