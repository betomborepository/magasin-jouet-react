import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Jouet from './components/jouet.js'
import Formulaire from './components/formulaire'
import base from './components/base';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jouets: {
        hobby0: {nom : "Gundam", description : "mecha anime", prix : 1000, image : "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Gundam.jpg/250px-Gundam.jpg"}
      },
      modifnom : "",
      modifDesc : "",
      modifPrix : "",
      modifImage : "",
      modifKey : ""      
    };
  }


  render() {

    let list = Object.keys(this.state.jouets).map(
			(key, index) => {
        var el = this.state.jouets[key];		
        console.log(el)	
				return   <Jouet  editerJouer={this.editerJouer.bind(this, key)} supprimerJouet={this.supprimerJouet.bind(this,key)} key ={key} nom = {el.nom} description = {el.description} prix = {el.prix} image = {el.image} />
      
			}
    ); 
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>


        
        <p className="App-intro">
          Bienvenue à notre magasin de jouet.
        </p>

        <div className = "container" id = "ajout-form">
        <h2>Ajout </h2>
        <Formulaire  typeForm = "ajout" ajouterJouet = {this.ajouterJouet.bind(this)} id = "modif-form" />
        </div>

        <div className ="container" id = "list-form">
          <table  style={{ border: '1px solid black'}} >
             <thead>
            <tr>
              <th>nom</th>
              <th>description</th> 
              <th>prix</th>
              <th>image</th>
            </tr>
            </thead>
            <tbody>
              {list} 
            </tbody>         
          </table>
        </div>


        <div className ="container" id = "modif-form">
        <h2>Modification </h2>
    
          <Formulaire keyval ={this.state.modifKey} key ={this.state.modifKey} nom={this.state.modifnom} desc={this.state.modifDesc} prix={this.state.modifPrix} image={this.state.modifImage}  typeForm = "modif" ajouterJouet = {this.ajouterJouet.bind(this)} id = "modif-form" />
        </div>
   
      </div>
    );
  }


    // Appele avant render
    componentWillMount() {
      console.log("Component will mount");
      this.ref = base.syncState("jouets", {
        context: this,
        state: 'jouets'
      });
    }
  

    // appele quand le composant disparait, par ex
    // quand on quitte l'application
    componentWillUnmount() {
      console.log("Component will unmount");
      base.removeBinding(this.ref);
    }

    ajouterJouet(j) {
      // faire une copie de l'objet hobbies
      console.log(j);
      //return;
      const jouets = { ...this.state.jouets };
  
      // Ajouter le nouveau hobby
      const timestamp = Date.now();
      jouets[j.key] = j;
      // equivalent a : hobbies['hobby' + timestamp] = this.state.input;
  
      // on met a jour l'etat
      this.setState({ jouets });
      console.log(this.state.jouets)
    }
  
    supprimerJouet(key) {
      // faire une copie de l'objet hobbies
     console.log(this)
      const jouets = { ...this.state.jouets };
  
      // Supprime le hobby dont la cle key a ete passee en parametres
      //delete hobbies[key]; // ne marche pas avec firebase
      jouets[key] = null;
  
      // Mettre a jour l'etat
      // En ES6 vous pouvez juste taper {'hobbies'} au lieu de {hobbies:hobbies}
      this.setState({ jouets });
      console.log(this.state.jouets)
    }


    editerJouer(key)
    {
      //update the form on form
      var jouet = this.state.jouets[key];
      if (jouet == undefined)
      (
        console.log("jouet with key " + key + " is undefined")
      )
      this.setState({
        modifnom  : jouet.nom,
        modifDesc : jouet.description,
        modifKey :  key,
        modifPrix : jouet.prix,
        modifImage : jouet.image 
      })
    }
  
}

export default App;
