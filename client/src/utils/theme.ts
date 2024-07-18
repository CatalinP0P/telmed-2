import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4b437e', // Customize your primary color here
    },
    secondary: {
      main: '#5ca4d9', // Customize your secondary color here
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
        input: {
          backgroundColor: 'white',
        },
      },
    },
  },
})

export default theme
