class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id={this.props.item} className="item">
        {this.props.item}
      </div>
    );
  }
}
class Items extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div id="items">
          {this.props.items.map(item =>
             <Item item={item} recipeId={this.props.recipeId} />
          )}
        </div>
    );
  }
}
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      childVisible: false
    }
  }

  render() {
    return(
      <div>
        <div className="recipeName"
          onClick={() => this.onClick()}>
          {this.props.recipe.name}
        </div>
        {
          this.state.childVisible
            ? <Items
                items={this.props.recipe.items}
                recipeId={this.props.recipe.id}
                />
            : null
        }
      </div>
    );
  }

  onClick() {
    this.setState({childVisible: !this.state.childVisible});
  }
}
class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
    var recipes = localStorage.getItem('recipes');
    if (recipes === undefined || recipes === null) {
      this.state = this.props.sampleRecipes;
    } else {
      this.state = JSON.parse(recipes);
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.clearModal = this.clearModal.bind(this);
  }

  deleteRecipe(recipeId) {
    var recipes = this.state.recipes;
    recipes = recipes.filter((elem, index, arr) =>
      recipeId !== elem.id
    );
    var recipesState = {recipes: recipes};
    this.setState(recipesState);
    localStorage.setItem('recipes', JSON.stringify(recipesState));
  }

  editRecipe(recipeId) {
    var recipes = this.state.recipes;
    var recipe = recipes.filter((elem, index, arr) =>
      recipeId === elem.id
    )[0];
    console.log(recipe);
    this.refs.recipe.value = recipe.name;
    this.refs.recipeId.value = recipe.id;
    this.refs.items.value = recipe.items;
  }

  clearModal() {
    this.refs.recipe.value = "";
    this.refs.recipeId.value = "";
    this.refs.items.value = "";
  }

  handleSubmit(event) {
    var recipes = this.state.recipes;
    var recipeId = event.target.recipeId.value;
    var recipeName = event.target.recipe.value;
    var items = event.target.items.value;
    var recipe = {
      "id": recipeId,
      "name": recipeName,
      "items": items.split(",")
    };

    // remove existing recipe
    recipes = recipes.filter((elem, index, arr) =>
      recipeId !== elem.id
    );

    recipes.push(recipe);
    var recipesState = {recipes: recipes};
    this.setState(recipesState);
    localStorage.setItem('recipes', JSON.stringify(recipesState));
    event.preventDefault();
  }

  render() {
    return(
      <div id="box">
        <div id="addRecipe">
          <form onSubmit={this.handleSubmit}>
            <button type="button"
              onClick={this.clearModal}
              className="btn btn-lg btn-primary recipe-btn"
              data-toggle="modal" data-target="#myModal">
              Add Recipe
            </button>

            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close"
                      data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Add recipes</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <input ref="recipeId" type="hidden"
                        name="recipeId" />
                      <input ref="recipe" type="text"
                        className="form-control"
                        name="recipe" placeholder="Recipe name" />
                    </div>
                    <div className="form-group">
                      <textarea ref="items" name="items"
                        className="form-control"
                        placeholder="bread, milk, cheese ...">
                      </textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input type="submit" value="Submit"
                      data-toggle="modal"
                      data-target="#myModal"
                      className="btn btn-default" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div id="recipes" className="recipes">
          {this.state.recipes.map(row =>
             <div className="recipe">
                <Recipe recipe={row} />
                <div className="form-group">
                  <button className="btn btn-danger"
                    onClick={() => this.deleteRecipe(row.id)}>
                    Delete
                  </button>
                  <button data-toggle="modal" data-target="#myModal"
                    className="btn btn-warning"
                    onClick={() => this.editRecipe(row.id)}>
                    Edit
                  </button>
                </div>
             </div>
          )}
        </div>
      </div>
    );
  }
}

var sampleRecipes = {
    "recipes": [
      {
        "id": "1",
        "name": "Spaghetti carbonara",
        "items": [
          "spaghetti",
          "bacon",
          "eggs",
          "olive oil",
          "salt",
          "pepper"
        ]
      },
      {
        "id": "2",
        "name": "Pancakes",
        "items": [
          "plain flour",
          "whole milk",
          "eggs"
        ]
      },
      {
        "id": "3",
        "name": "Chocolate chip cookies",
        "items": [
          "flour",
          "baking soda",
          "butter",
          "sugar",
          "salt",
          "eggs",
          "milk chocolate chips"
        ]
      }
    ]
};

ReactDOM.render(
  <RecipeBox sampleRecipes={sampleRecipes} />,
  document.getElementById('container')
);
