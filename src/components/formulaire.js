import React, { Component } from 'react';


class Formulaire extends Component {
  getInfoJouet()
  {
    var nom = document.getElementById(this.idNom).value;
    var description = document.getElementById(this.idDesc).value;
    var prix = document.getElementById(this.idPrix).value;
    var image = document.getElementById(this.idImage).value;
    
   
    var key = document.getElementById(this.idKey).value;
    if(key === ""){
      var key =  Date.now() + "-" + nom;
    }

    var j = {key,nom, description, prix, image};
    console.log("get info-jouet value:")
    console.log(j);
    return j;    
  }
  render() {

    this.idKey = this.props.typeForm + "key";
    this.idNom = this.props.typeForm + "nom";
    this.idDesc = this.props.typeForm + "desc";
    this.idPrix = this.props.typeForm + "prix";
    this.idImage = this.props.typeForm + "image";
   
    return (
    <div id = {this.props.typeForm}>
      <div>
        <label>Nom:<br/></label><input type="text" name="nom" id={this.idNom} defaultValue ={this.props.nom}/><br/>
      </div>
      <input type = "hidden" id = "key" value={this.props.key}/>
      <input type = "hidden" id = {this.idKey} value={this.props.keyval}/>
      
      <div>
      <label>description:<br/></label> <input type="text" id={this.idDesc} name="description" defaultValue={this.props.desc}/>
      </div>

      <div>
        <label> prix:<br/></label> <input type="number" name="prix" id = {this.idPrix} defaultValue ={this.props.prix}/>
      </div>


      <div>
      <label>image Url:<br/></label> <input type="text" name="url" id = {this.idImage} defaultValue={this.props.image} />
      </div>


      <div>
      <input onClick ={ () => this.props.ajouterJouet(this.getInfoJouet())} type="submit" defaultValue = "valider"/>
      </div>
    </div>
    );
  }
}

export default Formulaire;
