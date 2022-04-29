import React from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import {Dialog, Grid, Typography} from "@mui/material";
import {Bars} from "react-loader-spinner";

const Loader = () => {
    const { promiseInProgress } = usePromiseTracker()
    return (
        promiseInProgress && <Dialog
            open={promiseInProgress || false}
            onClose={() => {}}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }
            }}
        >
            <Grid>
                <Bars height={100} width={110} color={'#032746'} />
                <Typography>Loading...</Typography>
            </Grid>
        </Dialog>
    )
}

export default Loader;
