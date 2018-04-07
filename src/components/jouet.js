import React, { Component } from 'react';


class Jouet extends Component {
  nom = "Gundam";
  description = "Jouet pr enfant"
  prix = 100
  image = "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Gundam.jpg/250px-Gundam.jpg"

  render() {
    return (
      <tr>
              <th>{this.props.nom}</th>
              <th>{this.props.description}</th> 
              <th>{this.props.prix}</th>
              <th><img style={{height: '100px'}} src = {this.props.image}/></th>
              <th><button onClick={() => this.props.supprimerJouet()}>Supprimer</button></th>
              <th><button onClick={() => this.props.editerJouer()}>Editer</button></th>
      </tr>
    );
  }
}

export default Jouet;
