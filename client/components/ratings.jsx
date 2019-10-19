import React from 'react';

export default class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
      rated: false
    };
  }

  // componentDidUpdate(prevState) {
  //   if (prevState !== this.state) {
  //     let body = {
  //       id: this.props.id,
  //       rating: this.state.rating
  //     };

  //     fetch('/api/project.php', {
  //       method: 'PATCH',
  //       header: { 'content-type': 'application/json' },
  //       body: JSON.stringify(body)
  //     })
  //       .then(this.setState({ rated: true }))
  //       .catch(err => console.error(err));
  //   }
  // }

  rate(rating) {
    this.setState({
      rating: rating
    });
  }

  render() {
    var stars = [];

    for (let i = 1; i < 6; i++) {
      let className = 'star-rating__star fas fa-star fa-lg';

      if (this.state.rating >= i && this.state.rating != null) {
        className += ' is-selected';
      }

      stars.push(
        <i
          key={i}
          className={className}
          onClick={this.state.rated ? null : this.rate.bind(this, i)}>
        </i>
      );
    }

    return (
      <div className="star-rating">
        <div className="row star-rating-container ml-0">
          {stars}
          <div className="rating-number-container ml-2">
            <p className="mr-3">{(parseFloat(this.state.rating)).toFixed(2)}/5</p>
          </div>
        </div>
        {this.state.rated ? <p>Rated</p> : null }
        <div className="ml-0 row rating-details-container">
          <p>Total Ratings: {this.props.rating_count}</p>
        </div>
      </div>
    );
  }
}
