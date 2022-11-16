import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {
        content: '',
        author: '',
      },
      isLoading: false,
      error: '',
    };
    this.getNewQuote = this.getNewQuote.bind(this);
    this.closeError = this.closeError.bind(this);
  }
  async getNewQuote() {
    this.setState({ isLoading: true });
    try {
      const quote = await fetch('https://api.quotable.io/random').then((res) =>
        res.json()
      );
      this.setState({
        quote: { author: quote.author, content: quote.content },
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error: error.message || error.err.message });
    }
  }
  componentDidMount() {
    this.getNewQuote();
  }

  closeError() {
    this.setState({ error: '' });
  }

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div className="container d-flex align-items-center justify-content-center h-100">
        <div className="card text-bg-light col-md-6" id="quote-box">
          <div className="card-header">Quote</div>
          {!isLoading ? (
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p id="text">{this.state.quote.content}</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title" id="author">
                    {this.state.quote.author}
                  </cite>
                </footer>
              </blockquote>
              <div className="text-center p-3">
                <button
                  className="btn btn-primary"
                  id="new-quote"
                  onClick={this.getNewQuote}
                >
                  new quote
                </button>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <a
                    href="https://twitter.com/intent/tweet"
                    id="tweet-quote"
                    className="btn btn-outline-info btn-sm"
                  >
                    Tweet this quote
                  </a>
                  <a
                    href="https://github.com/foogho/random-quote-machine"
                    target="_blank"
                    className="btn btn-outline-secondary btn-sm"
                  >Github</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <div className="placeholder-glow">
                <p className="placeholder col-12"></p>
                <footer className="placeholder col-6"></footer>
                <div className="text-center p-3">
                  <button className="btn btn-primary disabled">
                    getting quote ...
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            id="liveToast"
            className={
              'toast text-bg-danger' + (this.state.error ? ' show' : '')
            }
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">an Error occurred...!</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={this.closeError}
              ></button>
            </div>
            <div className="toast-body">{this.state.error}</div>
          </div>
        </div>
      </div>
    );
  }
}
