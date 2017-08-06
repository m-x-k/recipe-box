"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
  _inherits(Item, _React$Component);

  function Item(props) {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: this.props.item, className: "item" },
        this.props.item
      );
    }
  }]);

  return Item;
}(React.Component);

var Items = function (_React$Component2) {
  _inherits(Items, _React$Component2);

  function Items(props) {
    _classCallCheck(this, Items);

    return _possibleConstructorReturn(this, (Items.__proto__ || Object.getPrototypeOf(Items)).call(this, props));
  }

  _createClass(Items, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { id: "items" },
        this.props.items.map(function (item) {
          return React.createElement(Item, { item: item, recipeId: _this3.props.recipeId });
        })
      );
    }
  }]);

  return Items;
}(React.Component);

var Recipe = function (_React$Component3) {
  _inherits(Recipe, _React$Component3);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this4 = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

    _this4.state = {
      childVisible: false
    };
    return _this4;
  }

  _createClass(Recipe, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "recipeName",
            onClick: function onClick() {
              return _this5.onClick();
            } },
          this.props.recipe.name
        ),
        this.state.childVisible ? React.createElement(Items, {
          items: this.props.recipe.items,
          recipeId: this.props.recipe.id
        }) : null
      );
    }
  }, {
    key: "onClick",
    value: function onClick() {
      this.setState({ childVisible: !this.state.childVisible });
    }
  }]);

  return Recipe;
}(React.Component);

var RecipeBox = function (_React$Component4) {
  _inherits(RecipeBox, _React$Component4);

  function RecipeBox(props) {
    _classCallCheck(this, RecipeBox);

    var _this6 = _possibleConstructorReturn(this, (RecipeBox.__proto__ || Object.getPrototypeOf(RecipeBox)).call(this, props));

    var recipes = localStorage.getItem('recipes');
    if (recipes === undefined || recipes === null) {
      _this6.state = _this6.props.sampleRecipes;
    } else {
      _this6.state = JSON.parse(recipes);
    }
    _this6.handleSubmit = _this6.handleSubmit.bind(_this6);
    _this6.deleteRecipe = _this6.deleteRecipe.bind(_this6);
    _this6.clearModal = _this6.clearModal.bind(_this6);
    return _this6;
  }

  _createClass(RecipeBox, [{
    key: "deleteRecipe",
    value: function deleteRecipe(recipeId) {
      var recipes = this.state.recipes;
      recipes = recipes.filter(function (elem, index, arr) {
        return recipeId !== elem.id;
      });
      var recipesState = { recipes: recipes };
      this.setState(recipesState);
      localStorage.setItem('recipes', JSON.stringify(recipesState));
    }
  }, {
    key: "editRecipe",
    value: function editRecipe(recipeId) {
      var recipes = this.state.recipes;
      var recipe = recipes.filter(function (elem, index, arr) {
        return recipeId === elem.id;
      })[0];
      console.log(recipe);
      this.refs.recipe.value = recipe.name;
      this.refs.recipeId.value = recipe.id;
      this.refs.items.value = recipe.items;
    }
  }, {
    key: "clearModal",
    value: function clearModal() {
      this.refs.recipe.value = "";
      this.refs.recipeId.value = "";
      this.refs.items.value = "";
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
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
      recipes = recipes.filter(function (elem, index, arr) {
        return recipeId !== elem.id;
      });

      recipes.push(recipe);
      var recipesState = { recipes: recipes };
      this.setState(recipesState);
      localStorage.setItem('recipes', JSON.stringify(recipesState));
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      return React.createElement(
        "div",
        { id: "box" },
        React.createElement(
          "div",
          { id: "addRecipe" },
          React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement(
              "button",
              { type: "button",
                onClick: this.clearModal,
                className: "btn btn-lg btn-primary recipe-btn",
                "data-toggle": "modal", "data-target": "#myModal" },
              "Add Recipe"
            ),
            React.createElement(
              "div",
              { id: "myModal", className: "modal fade", role: "dialog" },
              React.createElement(
                "div",
                { className: "modal-dialog" },
                React.createElement(
                  "div",
                  { className: "modal-content" },
                  React.createElement(
                    "div",
                    { className: "modal-header" },
                    React.createElement(
                      "button",
                      { type: "button", className: "close",
                        "data-dismiss": "modal" },
                      "\xD7"
                    ),
                    React.createElement(
                      "h4",
                      { className: "modal-title" },
                      "Add recipes"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "modal-body" },
                    React.createElement(
                      "div",
                      { className: "form-group" },
                      React.createElement("input", { ref: "recipeId", type: "hidden",
                        name: "recipeId" }),
                      React.createElement("input", { ref: "recipe", type: "text",
                        className: "form-control",
                        name: "recipe", placeholder: "Recipe name" })
                    ),
                    React.createElement(
                      "div",
                      { className: "form-group" },
                      React.createElement("textarea", { ref: "items", name: "items",
                        className: "form-control",
                        placeholder: "bread, milk, cheese ..." })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "modal-footer" },
                    React.createElement("input", { type: "submit", value: "Submit",
                      "data-toggle": "modal",
                      "data-target": "#myModal",
                      className: "btn btn-default" })
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          "div",
          { id: "recipes", className: "recipes" },
          this.state.recipes.map(function (row) {
            return React.createElement(
              "div",
              { className: "recipe" },
              React.createElement(Recipe, { recipe: row }),
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                  "button",
                  { className: "btn btn-danger",
                    onClick: function onClick() {
                      return _this7.deleteRecipe(row.id);
                    } },
                  "Delete"
                ),
                React.createElement(
                  "button",
                  { "data-toggle": "modal", "data-target": "#myModal",
                    className: "btn btn-warning",
                    onClick: function onClick() {
                      return _this7.editRecipe(row.id);
                    } },
                  "Edit"
                )
              )
            );
          })
        )
      );
    }
  }]);

  return RecipeBox;
}(React.Component);

var sampleRecipes = {
  "recipes": [{
    "id": "1",
    "name": "Spaghetti carbonara",
    "items": ["spaghetti", "bacon", "eggs", "olive oil", "salt", "pepper"]
  }, {
    "id": "2",
    "name": "Pancakes",
    "items": ["plain flour", "whole milk", "eggs"]
  }, {
    "id": "3",
    "name": "Chocolate chip cookies",
    "items": ["flour", "baking soda", "butter", "sugar", "salt", "eggs", "milk chocolate chips"]
  }]
};

ReactDOM.render(React.createElement(RecipeBox, { sampleRecipes: sampleRecipes }), document.getElementById('container'));

