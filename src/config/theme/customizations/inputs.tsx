import * as React from 'react';
import { Theme, Components, alpha } from '@mui/material/styles';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { app } from '@/config/app';


export const inputsCustomizations: Components<Theme> = {
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginLeft: '2px'
      }
    }
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        border: 'none',
      },
      input: {
        '&::placeholder': {
            opacity: 0.7,
            color: alpha(app.colors.primary,0.5),
        }
      }
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: 0,
      },
      root: ({ theme }) => ({
        padding: '8px 12px',
        color: (theme).palette.text.primary,
        borderRadius: (theme).shape.borderRadius + 5,
        border: `1px solid #ccc`,
        backgroundColor: (theme).palette.background.default,
        transition: 'border 150ms ease-in',
        [`&.${outlinedInputClasses.focused}`]: {
            outline: `2px solid #2b6cb0`,
          },
        ...theme.applyStyles('dark', {
            backgroundColor: '#ccc',
            color: 'black',
            [`&.${outlinedInputClasses.focused}`]: {
                outlineColor: `#ccc`,
              },
        }),
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem',
            },
          },
        ],
      }),
      notchedOutline: {
        border: 'none',
      },
    },
  },

  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 6,
        color: 'black',
        ...theme.applyStyles('dark', {
          color: '#ccc'
        })
      }),
    },
  },
};
