import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addAppraisal, getCocktailInfo, publishCocktail} from "../../actions/cocktail";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import PublishIcon from '@material-ui/icons/Publish';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const Cocktail = props => {
    const dispatch = useDispatch();
    const cocktail = useSelector(state => state.cocktails.cocktail);
    const user = useSelector(state => state.authorization.user);

    useEffect(() => {
        dispatch(getCocktailInfo(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    const appraisal = cocktail.appraisals && (cocktail.appraisals.reduce((a = 0, c) => a + c.appraisal, 0) / cocktail.appraisals.length).toString();

    return (
        <div>
            <Grid container style={{marginBottom: '15px'}}>
                <Grid item xs={4} style={{marginRight: '20px'}}>
                    <Box boxShadow={3} style={{width: '100%'}}>
                        <img style={{width: '100%'}} src={cocktail.image} alt={cocktail.name}/>
                    </Box>
                </Grid>
                <Grid item>
                    <Typography variant='h4'>
                        {cocktail.name}
                    </Typography>
                    { cocktail.appraisals &&
                        <Typography variant='h5'>
                            Rating: {appraisal.slice(0,5)} ({cocktail.appraisals.length} votes)
                        </Typography>
                    }
                    <Typography variant='h5'>
                        Ingredients:
                    </Typography>
                    <ul>
                        {cocktail.ingredients && cocktail.ingredients.map((e, id) => (
                            <li key={id} style={{fontSize: '20px'}}>{e.name + ' - ' + e.amount}</li>
                        ))}
                    </ul>
                </Grid>
                <Grid item>
                    <Box m={2}>
                        <Chip
                            label="Publish"
                            icon={cocktail.publish ? <DoneIcon/> : <CloseIcon/>}
                        />
                    </Box>
                </Grid>
            </Grid>
            {user.token && cocktail.user && cocktail.user._id !== user._id &&
            <FormControl component="fieldset">
                <FormLabel component="legend">Assessment</FormLabel>
                <RadioGroup value={cocktail.myAppraisal} onChange={event => dispatch(addAppraisal(props.match.params.id, event.target.value))}>
                    <Grid container>
                        <Grid item><FormControlLabel value="1" control={<Radio/>} label="1"/></Grid>
                        <Grid item><FormControlLabel value="2" control={<Radio/>} label="2"/></Grid>
                        <Grid item><FormControlLabel value="3" control={<Radio/>} label="3"/></Grid>
                        <Grid item><FormControlLabel value="4" control={<Radio/>} label="4"/></Grid>
                        <Grid item><FormControlLabel value="5" control={<Radio/>} label="5"/></Grid>
                    </Grid>
                </RadioGroup>
            </FormControl>
            }
            <Typography variant='h4'>Recipe:</Typography>
            <p>{cocktail.recipe}</p>
            {
                user.role === 'admin' && cocktail.publish === false &&
                <Button
                    onClick={() => dispatch(publishCocktail(props.match.params.id))}
                    variant="contained"
                    color="primary"
                    endIcon={<PublishIcon/>}
                >
                    Publish
                </Button>
            }
        </div>
    );
};

export default Cocktail;