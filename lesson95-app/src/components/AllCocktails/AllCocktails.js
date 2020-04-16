import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCocktails} from "../../actions/cocktail";
import Box from "@material-ui/core/Box";
import {NavLink as ToLink} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core/styles";

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

const AllCocktails = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const cocktails = useSelector(state => state.cocktails.cocktails);

    useEffect(() => {
        dispatch(getCocktails())
    }, [dispatch]);

    const allCocktails = cocktails && cocktails.map(e => (
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
            <Typography gutterBottom variant="h4" component="h2">Cocktails</Typography>
            <div className={classes.list}>
                {allCocktails}
            </div>
        </div>
    );
};

export default AllCocktails;