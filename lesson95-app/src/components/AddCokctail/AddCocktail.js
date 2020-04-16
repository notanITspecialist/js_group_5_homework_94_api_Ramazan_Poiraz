import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Box from "@material-ui/core/Box";
import {addCocktailAct} from "../../actions/cocktail";
import Toast from "light-toast";
import Chip from "@material-ui/core/Chip";
import {useDispatch} from "react-redux";

const AddCocktail = () => {
    const dispatch = useDispatch();

    const initialCocktail = {
        name: '',
        ingredients: [{name: '', amount: ''}],
        recipe: '',
        image: ''
    };
    const [cocktail, setCocktail] = useState(initialCocktail);

    const changeCocktail = e => setCocktail({...cocktail, [e.target.name]: e.target.value});

    const addIngredient = () => setCocktail({...cocktail, ingredients: [...cocktail.ingredients, {name: '', amount: ''}]});

    const deleteIngredient = id => {
        const state = {...cocktail};
        state.ingredients.splice(id, 1);

        setCocktail(state);
    };

    const changeIngredient = (e, id) => {
        const state = {...cocktail};
        state.ingredients[id][e.target.name] = e.target.value;

        setCocktail(state);
    };

    const addCocktail = e => {
        e.preventDefault();

        cocktail.ingredients.forEach((e, id) => {
            if(e.name.length < 2 || e.amount < 1) {
                Toast.fail('Fill in the fields of ingredient number '+(id+1), 1000);
            }
        });

        if(cocktail.name.length < 3) return Toast.fail('The name must be 3 characters long', 1500);
        if(cocktail.ingredients.length < 1) return Toast.fail('A cocktail must have at least 1 ingredient', 1500);
        if(cocktail.recipe.length < 11) return Toast.fail('The name must be 10 characters long', 1500);
        if(!cocktail.image) return Toast.fail('Add a image', 1500);

        const data = new FormData();

        Object.keys(cocktail).forEach(e => {
            if(e === 'ingredients'){
                return data.append(e, JSON.stringify(cocktail[e]));
            }
            data.append(e, cocktail[e]);
        });

        dispatch(addCocktailAct(data));
    };

    return (
        <div>
            <form style={{width: '50%'}}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Cocktail name"
                    name="name"
                    autoFocus
                    value={cocktail.name}
                    onChange={changeCocktail}
                    error={cocktail.name.length > 0 && cocktail.name.length < 3}
                    helperText="The name must be 3 characters long"
                />

                <Typography variant={'h5'}> Ingredients </Typography>

                <List>
                {cocktail.ingredients.map((e, id) => (
                    <ListItem key={id} style={{padding: '0'}}>
                        <Box mr={2}>
                            <Chip label={id+1} />
                        </Box>
                        <Grid container key={id} spacing={1}>
                            <Grid item xs={7}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    name='name'
                                    label="Name"
                                    value={cocktail.ingredients[id].name}
                                    onChange={e => changeIngredient(e, id)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="amount"
                                    label="Amount"
                                    name="amount"
                                    value={cocktail.ingredients[id].amount}
                                    onChange={e => changeIngredient(e, id)}
                                />
                            </Grid>
                        </Grid>
                        <Box ml={2}>
                            <ListItemSecondaryAction>
                                <IconButton type='button' aria-label="delete" centerRipple onClick={() => deleteIngredient(id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </Box>
                    </ListItem>
                ))}
                </List>

                <Button type='button' variant="contained" onClick={addIngredient}>
                    Add ingredient
                </Button>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="recipe"
                    label="Recipe"
                    type='textarea'
                    name="recipe"
                    multiline
                    rows={4}
                    value={cocktail.recipe}
                    onChange={changeCocktail}
                    error={cocktail.recipe.length > 0 && cocktail.recipe.length < 10}
                    helperText="The recipe must be 10 characters long"
                />

                <Grid>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={e => setCocktail({...cocktail, image: e.target.files[0]})}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" type='button' component="span">
                            Upload image
                        </Button>
                    </label>
                </Grid>

                <Box mt={1}>
                    <Button variant="contained" color='primary' onClick={addCocktail}>
                        Add cocktail
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddCocktail;