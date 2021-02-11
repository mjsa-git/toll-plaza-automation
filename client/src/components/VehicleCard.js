import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Moment from 'moment';

export const VehicleCard = ({ data = {}, processTransaction, id }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [tripSelected, setTripSelected] = useState({})

    useEffect(() => {
        if (data['charges'] && data['charges'].length > 0) {
            setTripSelected(data['charges'][0])
        }
    }, [data])

  

    return (
        <Card className={classes.root} id={id}>
            <CardMedia
                className={classes.cover}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1P0UKtu5fZRNHe1468n6gCzWsIkpUmsnnQ&usqp=CAU"
                title={data.model}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {data.vehicleNo}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {data.model}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Toll Charges
          </Typography>
                    <Grid
                        justify="space-between"
                        container
                        spacing={12 }
                        className={classes.amountGrid}
                    >
                        <Grid item>
                            {data.transactionAction == "COLLECT" && data.charges ? (
                                <Select
                                    value={tripSelected}
                                    onChange={(e) => setTripSelected(e.target.value)}
                                    displayEmpty

                                >
                                    {data.charges.map(charge => (
                                        <MenuItem value={charge} >
                                            <Typography variant="h5" >
                                                {`${charge.tripType} - ₹${charge.price}`}
                                            </Typography>
                                        </MenuItem>
                                    ))}

                                </Select>
                            ) : (
                                    <Typography variant="h3" >
                                        {`₹ ${data.amount}`}
                                    </Typography>
                                )}

                        </Grid>
                        <Grid item>
                            {data.transactionAction == "COLLECT" && <Button variant="contained" color="primary" onClick={() => processTransaction(data, tripSelected)}> Collected </Button>}
                            {data.transactionAction == "PASS" && <Button variant="contained" color="primary" onClick={() => processTransaction(data)}> Print Reciept     </Button>}


                        </Grid>

                    </Grid>
                    {data.dateTime && (<Typography variant="overline" >
                        {`Issued At: ${ Moment(data.dateTime).format('DD-MM-YYYY HH:mm:ss')}`}
                    </Typography>)}


                </CardContent>
                {/* <div className={classes.controls}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon className={classes.playIcon} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </div> */}
            </div>

        </Card >
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: 15
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: "center",
        alignItems: "center"
    },
    content: {
        width: "100%",
        marginLeft: 25
    },
    cover: {
        width: 151
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    amountGrid: {
        flex: 1,
        width: "100%",
        marginRight: 10
    }
}));