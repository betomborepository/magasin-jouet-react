import React, { Component } from 'react';


class Jouet extends Component {
  nom = "Gundam";
  description = "Jouet pr enfant"
  prix = 100
  image = "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Gundam.jpg/250px-Gundam.jpg"


  render() {
    if(this.props.type === "basket")    {
      var button1 = (<th><button onClick={() => this.props.supprimerBasket()}>Supprimer</button></th>)
      var button2 = (<th><button onClick={() => this.props.decrementerBasket()}>Retirer</button></th>)
      var button3= ""
    }else{ 
    
     var button1 = (<th><button onClick={() => this.props.supprimerJouet()}>Supprimer</button></th>)
     var button2 = (<th><button onClick={() => this.props.editerJouer()}>Editer</button></th>)
    var button3 = (<th><button onClick={() => this.props.ajouterbasket()}>Ajouter Catalogue</button></th>)
    
      } 
      if(this.props.stock <= 0)
        return ""; 
   
        return (
      <tr>
              <th>{this.props.nom}</th>
              <th>{this.props.description}</th> 
              <th>{this.props.prix}</th>
              <th><img style={{height: '100px'}} src = {this.props.image}/></th>
              <th>{this.props.stock}</th>
              {button1}
              {button2}
              {button3}
              
              
              
      </tr>
    );
  }
}

export default Jouet;
