import React, { Component } from "react";
import SearchForm from "../components/SearchForm/index";
import { List } from "../components/List/index";
import Card from "../components/Card/index";
import API from "../utils/API";

class Search extends Component {
  state = {
    books: [],
    q: "",
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getBooks = () => {
    API.getBooks(this.state.q)
      .then((res) => {
        this.setState({
          books: res.data,
          currentPage: 1,
        });
      })
      .catch(() => {
        this.setState({
          books: [],
          message: "Your search did not match any book results",
          currentPage: 1,
        });
      });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.getBooks();
  };

  handleBookSave = (id) => {
    const book = this.state.books.find((book) => book.id === id);
    API.saveBook({
      id: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors.toString(),
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
    }).then(() => this.getBooks());
  };
  render() {
    return (
      <div>
        <SearchForm
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          q={this.state.q}
        />
        <div className="container" style={{ marginTop: "2em" }}>
          <h5>Results</h5>
          <List>
            {this.state.books.map((book) => (
              <Card
                key={book.id}
                title={book.volumeInfo.title}
                subtitle={book.volumeInfo.subtitle}
                link={book.volumeInfo.infoLink}
                authors={book.volumeInfo.authors.toString()}
                image={book.volumeInfo.imageLinks.thumbnail}
                description={book.volumeInfo.description}
                Button={() => (
                  <button
                    onClick={() => this.handleBookSave(book.id)}
                    className="btn btn-outline-secondary heading-subtitle ml-2"
                  >
                    Save
                  </button>
                )}
              />
            ))}
          </List>
        </div>
      </div>
    );
  }
}

export default Search;
