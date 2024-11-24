import React from "react";
import ProgressBar from "@/Pages/partials/ProgressBar.jsx";
import Results from "@/Pages/partials/Results.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
    createTheme,
    ThemeProvider,
    FormControl,
    TextField,
    useTheme,
    Button,
    InputAdornment
} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {outlinedInputClasses} from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid2';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '--TextField-brandBorderColor': '#E0E3E7',
                        '--TextField-brandBorderHoverColor': '#B2BAC2',
                        '--TextField-brandBorderFocusedColor': '#6F7E8C',
                        '& label.Mui-focused': {
                            color: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: 'var(--TextField-brandBorderColor)',
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderHoverColor)',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: 'var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiFilledInput: {
                styleOverrides: {
                    root: {
                        '&::before, &::after': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
            MuiInput: {
                styleOverrides: {
                    root: {
                        '&::before': {
                            borderBottom: '2px solid var(--TextField-brandBorderColor)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                            borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                        },
                        '&.Mui-focused:after': {
                            borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                        },
                    },
                },
            },
        },
    });

export default function Checking() {

    const outerTheme = useTheme();

    const [url, setUrl] = React.useState("");
    const [results, setResults] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [urlError, setUrlError] = React.useState(false);

    const onChangeUrl = ({target}) => {
        setUrl(target.value);
    }
    const token = document.head.querySelector('meta[name="csrf-token"]').content;

    const handleClickSubmit = (e) => {
        setLoading(true)

        let isWrongUrl = urlValidate(url)
        setUrlError(isWrongUrl)

        if (isWrongUrl) return

        fetch('/check', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN": token
            },
            body: JSON.stringify({'url': url})
        })
            .then((response) => response.json())
            .then((data) => {
                setResults({...data})
                setError(null)
            })
            .catch((err) => {
                setResults(null)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }

    const handleClickClearUrl = () => {
        setUrl('')
        setUrlError(false)
    }

    const urlValidate = (str) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !pattern.test(str);
    }

    return (
        <React.Fragment>

            <CssBaseline/>
            <Container maxWidth="xl">

                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" component="div">
                                PageSpeed Metrics Monitor
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>

                <ThemeProvider theme={customTheme(outerTheme)}>

                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <FormControl
                                fullWidth sx={{mt: 7}}
                                variant="standard"
                            >
                                <TextField
                                    error={urlError}
                                    type="email"
                                    label="Enter a web page URL"
                                    placeholder="https://example.com/article"
                                    variant="standard"
                                    sx={{m: 0, width: '50ch'}}
                                    value={url}
                                    onChange={onChangeUrl}
                                    slotProps={{
                                        input: {
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    disabled={!url}
                                                    onClick={handleClickClearUrl}
                                                    edge="end"
                                                >
                                                    <HighlightOffIcon/>
                                                </IconButton>
                                            </InputAdornment>,
                                        },
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <Button
                                disabled={!url || loading}
                                onClick={handleClickSubmit}
                                variant="contained"
                                size="small">Analyze</Button>
                        </Grid>
                    </Grid>

                    {loading ?
                        <>
                            <Typography color='primary' variant="h4" sx={{mt: 3, mb: 3}}>
                                Waiting for the response from Google API
                            </Typography>
                            <ProgressBar/>
                        </>
                        : null
                    }

                    {results ?
                        <>
                            <Typography color='success' variant="h4" sx={{mt: 3, mb: 3}}>
                                Results
                            </Typography>
                            <Results results={results} url={url}/>
                        </>
                        : null}

                </ThemeProvider>
            </Container>
        </React.Fragment>
    )
}
