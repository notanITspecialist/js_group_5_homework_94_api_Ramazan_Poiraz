import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getMyPublication} from "../../actions/cocktail";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import {NavLink as ToLink} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: 300,
        height: '100%',
        margin: 5,
        textDecoration: 'none'
    },
    media: {
        height: 400
    },
    list: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const MyPublications = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const myPublications = useSelector(state => state.cocktails.myCocktails);

    useEffect(() => {
        dispatch(getMyPublication())
    }, [dispatch]);

    const publications = myPublications.map(e => (
        <Box boxShadow={3} className={classes.root} key={e._id} component={ToLink} to={'/cocktail/'+e._id}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={e.image}
                        title={e.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {e.name}
                        </Typography>
                        <Chip
                            label="Publish"
                            icon={e.publish ? <DoneIcon /> : <CloseIcon />}
                        />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    ));
    return (
        <div>
            <Typography gutterBottom variant="h4" component="h2">Your cocktails</Typography>
            <div className={classes.list}>
                {publications}
            </div>
        </div>
    );
};

export default MyPublications;