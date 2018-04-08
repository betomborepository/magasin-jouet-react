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
      modifKey : "" ,
      basket : {},
      basketmessage : ""     
    };
  }


  render() {

    let list = Object.keys(this.state.jouets).map(
			(key, index) => { 
        var el = this.state.jouets[key];		
       // console.log(el)	
				return   <Jouet stock ={el.stock} ajouterbasket={this.ajouterbasket.bind(this, key)} editerJouer={this.editerJouer.bind(this, key)} supprimerJouet={this.supprimerJouet.bind(this,key)} key ={key} nom = {el.nom} description = {el.description} prix = {el.prix} image = {el.image} />
      
			}
    );
    
    let basketList = Object.keys (this.state.basket).map(
			(key, index) => {
        var el = this.state.basket[key];	
        if(el == null)
        {
          return ;	
        }
        
        // console.log(el)	
				return   <Jouet decrementerBasket ={this.decrementerBasket.bind(this, key )} stock ={el.stock} supprimerBasket = {this.supprimerBasket.bind(this, key)} type = "basket" ajouterbasket={this.ajouterbasket.bind(this, key)} editerJouer={this.editerJouer.bind(this, key)} supprimerJouet={this.supprimerJouet.bind(this,key)} key ={key} nom = {el.nom} description = {el.description} prix = {el.prix} image = {el.image} />
      
			}
    );


    var prixTotal = this.getPrixTotal();
    var nbrObjet = this.getNombreJouet();
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
        <h2>List de Jouets </h2>
          <table  style={{ border: '1px solid black'}} >
             <thead>
            <tr>
              <th>nom</th>
              <th>description</th> 
              <th>prix</th>
              <th>image</th>
              <th>stock</th>      
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

        <div className ="container" id = "list-basket">
        <h2>List basket </h2>
        <p>Nombre de jouets  :{nbrObjet}</p>
        <p>Prix Total : {prixTotal}</p>
          <table  style={{ border: '1px solid black'}} >
             <thead>
            <tr>
              <th>nom</th>
              <th>description</th> 
              <th>prix</th>
              <th>image</th>
              <th>stock</th>
            </tr>
            </thead>
            <tbody>
              {basketList} 
            </tbody>         
          </table>
          <div>
            <button onClick={this.validerCommande.bind(this)} >
              Valider la commende
            </button>
            {this.state.basketmessage}
          </div>
        </div>
        
   
      </div>
    );
  }

    getNombreJouet()
    {
      var total = 0;
      var basket = this.state.basket;
      Object.keys(basket).map(function(key){
        var el = basket[key];
        if(el != null)
        {
          total = total + el.stock;
        }
           
      }
      );

      return total;
    }

    getPrixTotal()
    {
      var total = 0;
      var basket = this.state.basket;
      Object.keys(basket).map(function(key){
        var el = basket[key];
        if(el != null)
        {
          total = total + el.stock * el.prix;
        }
           
      }
      );

      return total;
    }
    validerCommande()
    {
        var basketmessage = this.state.basketmessage;
        basketmessage  = (<p>votre commande a été fait. Merci :)</p>)

        const basket = {...this.state.basket};
        Object.keys(basket).map(function(key)
        {
           basket[key] = null;
        })
        

        
        this.setState({basket});
        this.setState({basketmessage})
        //message commande valider
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


    ajouterbasket(key){
      const basket = { ...this.state.basket };
      const jouets = { ...this.state.jouets };
   

       // Ajouter le nouveau jouet
       
       var jouetbasket = this.state.basket[key];
       var jouet = this.state.jouets[key];
      if(jouetbasket == null)
      {
        jouetbasket = { ...this.state.jouets[key]}
        jouetbasket.stock = 0;
      }
            
      //transfert
      jouet.stock = jouet.stock - 1;
      jouetbasket.stock = jouetbasket.stock + 1 ;

      jouets[key] = jouet;
      basket [key] = jouetbasket;
      

      console.log(jouets);
      console.log(basket);
       // on met a jour l'etat
       this.setState({  jouets });        
       this.setState({  basket });        
    }

  supprimerBasket(key) {
      // faire une copie de l'objet hobbies
     console.log(key)
      const basket = { ...this.state.basket };
  
       basket[key] = null;
       
  
      this.setState({ basket });
      console.log(this.state.basket)
    }

    decrementerBasket(key) {
      const basket = { ...this.state.basket };
      const jouets = { ...this.state.jouets };
   

       // Ajouter le nouveau jouet
       
       var jouetbasket = this.state.basket[key];
       var jouet = this.state.jouets[key];
     
            
      //transfert
      jouet.stock = jouet.stock + 1;
      jouetbasket.stock = jouetbasket.stock - 1 ;

      jouets[key] = jouet;
      basket [key] = jouetbasket;
      

      console.log(jouets);
      console.log(basket);


       // on met a jour l'etat
       this.setState({  jouets });        
       this.setState({  basket });        
    }

  
}

export default App;
