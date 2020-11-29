import React from 'react';
import style from './Randomquotes.module.scss';
import Gstyle from '../../styles/Global.module.scss';
const axios = require('axios').default;


class Quote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`${Gstyle['mt-auto']}`}>
        <h1>{this.props.content}</h1>
        <em>{this.props.author}</em>
      </div>
    );
  }
}

class Randomquotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "\"Citation par défaut\"",
      author: "Auteur par défaut",
      bg: ""
    }
    this.changeQuote = this.changeQuote.bind(this);
  }
  changeQuote() {
axios.get(`https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`)
      .then(response => {
        const randomQuote = response.data.quotes[Math.floor(Math.random() * Math.floor(response.data.quotes.length))];
        const randomHue = Math.floor(Math.random() * 360);
        const randomBgPastel = 'hsl(' + randomHue + ', 100%, 90%)';
        this.setState({
          content: `"${randomQuote.quote}"`,
          author: randomQuote.author,
          bg: randomBgPastel
        })
      })
  }
  render() {
    return (
      <div className={`${style['Randomquote']} ${Gstyle['d-flex-col-content-center']} ${Gstyle['txt-center']}`} style={{backgroundColor: this.state.bg}}>
        <a className={`${style['tweeter-ctr']}`} target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${this.state.content}%20-%20${this.state.author}`}>
          <span className={`${Gstyle['visu-hidden']}`}>Tweeter cette citation</span>
          <svg className={`${style['tweeter-ico']}`} aria-hidden="true" focusable="false" data-icon="twitter" role="img" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
        </a>
        <Quote content={this.state.content} author={this.state.author} />
        <div className={`${Gstyle['mt-auto']}`} >
          <button onClick={this.changeQuote} className={`${Gstyle['btn']}`} >Changer de citation</button>
        </div>
      </div>
    );
  }
}

export default Randomquotes;