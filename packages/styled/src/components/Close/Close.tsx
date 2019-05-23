import React from 'react'
import styled from 'styled-components'
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  fontSize,
  FontSizeProps,
  fontFamily,
  FontFamilyProps,
  fontWeight,
  FontWeightProps,
} from 'styled-system'
import CloseIcon from '../../icons/CloseIcon'
// eslint-disable-next-line import/no-unresolved
import {CloseTheme} from '../../@types/theme'
import useThemeProps from '../../hooks/useThemeProps'
import globalStyles from '../../globalStyles'

interface TextProps
  extends ColorProps,
    SpaceProps,
    FontSizeProps,
    FontFamilyProps,
    FontWeightProps {}
const Text = styled('div')<TextProps>`
  ${space}
  ${color}
  ${fontSize}
  ${fontFamily}
  ${fontWeight}
  float: left;
  transition: color 0.15s;
`

const Wrapper = styled('button')<ColorProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: transparent;
  padding: 0;
  border: 0;

  svg {
    transition: color 0.15s;
  }

  &:hover {
    ${Text} {
      ${color}
    }

    svg {
      ${color}
    }
  }
`

interface CloseProps {
  onClick(): void
  rtl: boolean
}

function Close({onClick, rtl}: CloseProps) {
  const theme: CloseTheme = useThemeProps({
    fontFamily: globalStyles.fontFamily,
    closeMargin: rtl ? '1px 16px 0 0' : '1px 0 0 16px',
    closeColor: '#929598',
    closeHoverColor: '#343132',
    closeFontSize: '12px',
    closeFontWeight: 600,
  })

  return (
    <Wrapper
      onClick={onClick}
      // @ts-ignore
      color={theme.closeHoverColor}
      data-testid="DatepickerClose"
    >
      <CloseIcon width="15px" height="16px" color="#ADADAD" />
      <Text
        m={theme.closeMargin}
        // @ts-ignore
        color={theme.closeColor}
        fontSize={theme.closeFontSize}
        fontFamily={theme.fontFamily}
        fontWeight={theme.closeFontWeight}
      >
        Close
      </Text>
    </Wrapper>
  )
}

export default Close
