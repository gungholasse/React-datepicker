import React, {useMemo} from 'react'
import styled, {css} from 'styled-components'
import {ResponsiveValue, style, TLengthStyledSystem} from 'styled-system'
import {
  boxShadow,
  BoxShadowProps,
  background,
  BackgroundProps,
  color,
  ColorProps,
  fontFamily,
  FontFamilyProps,
  fontWeight,
  FontWeightProps,
  fontSize,
  FontSizeProps,
} from 'styled-system'
import Flex from '../Flex'
// eslint-disable-next-line import/no-unresolved
import {DayTheme} from '../../@types/theme'
import useThemeProps from '../../hooks/useThemeProps'
import globalStyles from '../../globalStyles'
import {BackgroundProperty, ColorProperty} from 'csstype'

const dayHeight = style({
  // React prop name and CSS property
  prop: 'dayHeight',
  // CSS property (if different from prop argument)
  cssProperty: 'height',
  // key for theme values
  key: 'dayHeight',
  // accessor function for transforming the value
  transformValue: n => n + 'px',
  // add a fallback scale object or array, if theme is not present
  scale: [0, 4, 8, 16, 32],
})

const dayWidth = style({
  // React prop name and CSS property
  prop: 'dayWidth',
  // CSS property (if different from prop argument)
  cssProperty: 'width',
  // key for theme values
  key: 'dayWidth',
  // accessor function for transforming the value
  transformValue: n => n + 'px',
  // add a fallback scale object or array, if theme is not present
  scale: [0, 4, 8, 16, 32],
})

const dayHoverColor = style({
  // React prop name and CSS property
  prop: 'dayHoverColor',
  // CSS property (if different from prop argument)
  cssProperty: 'color',
  // key for theme values
  key: 'dayHoverColor',
  // accessor function for transforming the value
  transformValue: n => n,
  // add a fallback scale object or array, if theme is not present
  scale: [0, 4, 8, 16, 32],
})

const daySelectedHoverColor = style({
  // React prop name and CSS property
  prop: 'daySelectedHoverColor',
  // CSS property (if different from prop argument)
  cssProperty: 'color',
  // key for theme values
  key: 'daySelectedHoverColor',
  // accessor function for transforming the value
  transformValue: n => n,
  // add a fallback scale object or array, if theme is not present
  scale: [0, 4, 8, 16, 32],
})

const dayHoverBackground = style({
  // React prop name and CSS property
  prop: 'dayHoverBackground',
  // CSS property (if different from prop argument)
  cssProperty: 'background',
  // key for theme values
  key: 'dayHoverBackground',
  // accessor function for transforming the value
  transformValue: n => n,
  // add a fallback scale object or array, if theme is not present
  scale: [0, 4, 8, 16, 32],
})

const daySelectedHoverBackground = style({
  // React prop name and CSS property
  prop: 'daySelectedHoverBackground',
  // CSS property (if different from prop argument)
  cssProperty: 'background',
  // key for theme values
  key: 'daySelectedHoverBackground',
  // accessor function for transforming the value
  transformValue: n => n,
  // add a fallback scale object or array, if theme is not present
  scale: [0, 4, 8, 16, 32],
})

interface StyledDayProps
  extends BoxShadowProps,
    BackgroundProps,
    ColorProps,
    FontSizeProps,
    FontFamilyProps,
    FontWeightProps {
  isActive: boolean
  disabled: boolean
  isStartOrEnd: boolean
  isWithinHoverRange: boolean
  dayHeight: number | (number | null)[] | undefined
  dayWidth: number | (number | null)[] | undefined
  borderAccessibilityColor: string
  daySelectedHoverBackground: ResponsiveValue<BackgroundProperty<TLengthStyledSystem>>
  dayHoverBackground: ResponsiveValue<BackgroundProperty<TLengthStyledSystem>>
  dayHoverColor: ResponsiveValue<ColorProperty>
  daySelectedHoverColor: ResponsiveValue<ColorProperty>
}
const StyledDay = styled('button')<StyledDayProps>`
  ${dayHeight}
  ${dayWidth}
  ${boxShadow}
  ${background}
  ${color}
  ${fontFamily}
  ${fontWeight}
  ${fontSize}
  cursor: pointer;
  border: 0;
  padding: 0;
  outline: 0;
  
  ${({disabled, isStartOrEnd}) =>
    disabled &&
    !isStartOrEnd &&
    css`
      cursor: initial;
      opacity: 0.4;
    `}
  
  ${({disabled, isActive, isStartOrEnd, isWithinHoverRange}) => {
    if (!disabled && !isActive && !isStartOrEnd && !isWithinHoverRange) {
      return css`
        &:hover {
          ${dayHoverBackground}
          ${dayHoverColor}
        }
      `
    } else if (isActive && !isStartOrEnd) {
      return css`
        &:hover {
          ${daySelectedHoverBackground}
          ${daySelectedHoverColor}
        }
      `
    }

    return ''
  }}
  
  &:focus {
    ${({borderAccessibilityColor}) => css`
      box-shadow: none;
      border: 2px solid ${borderAccessibilityColor};
    `}
  }
`

function getColor(
  isActive: boolean,
  isStartOrEnd: boolean,
  isWithinHoverRange: boolean,
  {
    selectedFirstOrLast,
    normal,
    selected,
    rangeHover,
  }: {
    selectedFirstOrLast: ResponsiveValue<ColorProperty>
    selected: ResponsiveValue<ColorProperty>
    normal: ResponsiveValue<ColorProperty>
    rangeHover: ResponsiveValue<ColorProperty>
  },
) {
  if (isStartOrEnd) {
    return selectedFirstOrLast
  } else if (isActive) {
    return selected
  } else if (isWithinHoverRange) {
    return rangeHover
  } else {
    return normal
  }
}

interface DayProps {
  day: string
  date: Date
  isActive: boolean
  disabled: boolean
  isStartOrEnd: boolean
  isWithinHoverRange: boolean
  onDaySelect(date: Date): void
  onDayHover(date: Date): void
}
function Day({
  day,
  isActive,
  isStartOrEnd,
  disabled,
  onDaySelect,
  onDayHover,
  date,
  isWithinHoverRange,
}: DayProps) {
  const theme: DayTheme = useThemeProps({
    fontFamily: globalStyles.fontFamily,
    daySize: globalStyles.daySize,
    dayFontWeight: 500,
    dayFontSize: '14px',
    dayColor: '#58595b',
    dayHoverColor: '#58595b',
    daySelectedColor: '#ffffff',
    daySelectedHoverColor: '#ffffff',
    dayHoverRangeColor: '#ffffff',
    daySelectedFirstOrLastColor: '#ffffff',
    dayBackground: '#ffffff',
    dayHoverBackground: '#e6e7e8',
    daySelectedBackground: '#71c9ed',
    daySelectedHoverBackground: '#39beef',
    dayHoverRangeBackground: '#71c9ed',
    daySelectedFirstOrLastBackground: '#00aeef',
    dayBorderColor: '#e6e7e8',
    daySelectedBorderColor: '#71c9ed',
    dayHoverRangeBorderColor: '#71c9ed',
    daySelectedFirstOrLastBorderColor: '#00aeef',
    dayAccessibilityBorderColor: '#009fef',
  })
  const borderColor = useMemo(
    () =>
      getColor(isActive, isStartOrEnd, isWithinHoverRange, {
        // @ts-ignore
        selectedFirstOrLast: theme.daySelectedFirstOrLastBorderColor,
        // @ts-ignore
        selected: theme.daySelectedBorderColor,
        // @ts-ignore
        normal: theme.dayBorderColor,
        // @ts-ignore
        rangeHover: theme.dayHoverRangeColor,
      }),
    [isActive, isStartOrEnd, theme, isWithinHoverRange],
  )
  const background = useMemo(
    () =>
      getColor(isActive, isStartOrEnd, isWithinHoverRange, {
        // @ts-ignore
        selectedFirstOrLast: theme.daySelectedFirstOrLastBackground,
        // @ts-ignore
        selected: theme.daySelectedBackground,
        // @ts-ignore
        normal: theme.dayBackground,
        // @ts-ignore
        rangeHover: theme.dayHoverRangeBackground,
      }),
    [isActive, isStartOrEnd, theme, isWithinHoverRange],
  )
  const color = useMemo(
    () =>
      getColor(isActive, isStartOrEnd, isWithinHoverRange, {
        // @ts-ignore
        selectedFirstOrLast: theme.daySelectedFirstOrLastColor,
        // @ts-ignore
        selected: theme.daySelectedColor,
        // @ts-ignore
        normal: theme.dayColor,
        // @ts-ignore
        rangeHover: theme.dayHoverRangeColor,
      }),
    [isActive, isStartOrEnd, theme, isWithinHoverRange],
  )

  return (
    <StyledDay
      role="button"
      onClick={() => onDaySelect(date)}
      onMouseEnter={() => onDayHover(date)}
      disabled={disabled && !isWithinHoverRange}
      isActive={isActive}
      isStartOrEnd={isStartOrEnd}
      isWithinHoverRange={isWithinHoverRange}
      dayHeight={theme.daySize}
      dayWidth={theme.daySize}
      background={background}
      color={color}
      fontFamily={theme.fontFamily}
      fontWeight={theme.dayFontWeight}
      fontSize={theme.dayFontSize}
      // @ts-ignore
      daySelectedHoverBackground={theme.daySelectedHoverBackground}
      // @ts-ignore
      dayHoverBackground={theme.dayHoverBackground}
      // @ts-ignore
      dayHoverColor={theme.dayHoverColor}
      // @ts-ignore
      daySelectedHoverColor={theme.daySelectedHoverColor}
      // @ts-ignore
      borderAccessibilityColor={theme.dayAccessibilityBorderColor}
      boxShadow={`1px 0 0 0 ${borderColor},
        0 1px 0 0 ${borderColor},
        1px 1px 0 0 ${borderColor},
        1px 0 0 0 ${borderColor} inset,
        0 1px 0 0 ${borderColor} inset`}
      data-testid="Day"
    >
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        {day}
      </Flex>
    </StyledDay>
  )
}

export default React.memo(Day)
