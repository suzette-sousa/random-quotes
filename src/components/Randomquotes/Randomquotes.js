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
        <h2>{this.props.author}</h2>
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
axios.get(`https://gist.githubusercontent.com/tbondois/963f51cfa2b8c5efbba9387472bd3c6d/raw/8a9b8dda6494ed9ddef560f508c9cc94f5588a3b/citations.json`)
      .then(response => {
        const randomQuote = response.data[Math.floor(Math.random() * Math.floor(response.data.length))];
        const randomHue = Math.floor(Math.random() * 360);
        const randomBgPastel = 'hsl(' + randomHue + ', 100%, 85%)';
        this.setState({
          content: randomQuote.content,
          author: randomQuote.author,
          bg: randomBgPastel
        })
      })
  }
  render() {
    return (
      <div className={`${style['Randomquote']} ${Gstyle['d-flex-col-content-center']} ${Gstyle['txt-center']}`} style={{backgroundColor: this.state.bg}}>
        <Quote content={this.state.content} author={this.state.author} />
        <div className={`${Gstyle['mt-auto']}`} >
          <button onClick={this.changeQuote} className={`${Gstyle['btn']}`} >Changer de citation</button>
        </div>
      </div>
    );
  }
}

export default Randomquotes;