<br />
<p align="center">
    <img src="https://cdn.discordapp.com/attachments/912175023509348352/919042398133317632/images.png" alt="Logo" width="90" height="90">
  </a>

  <h3 align="center">[ Upkeep ]</h3>

  <p align="center">
    A Magic the gathering Deck Builder <a href="https://upkeep-mtg.herokuapp.com/">upkeep.com</a>
    <br />
    <a href="https://upkeep-mtg.herokuapp.com/" target="_blank"><strong>Check out Upkeep!</strong></a>
    <br />
    <br />
  </p>
</p>

<h2 align="center"> Synopsis </h2>
<br/>
Upkeep is a magic the gathering deck builder that uses scryfall's api to browse through all the cards in magic the gathering and create a custom deck. It also allows you to look at other user's decks to give you ideas on how to build your own. You are able to create a user, post/delete/browse decks using REST api, and post comments on a single public deck. This site also showcases the ability to create full CRUD (Create, Read, Update, Destroy) functionality between a 
front and backend server, while also being able to manuever through third party api to get specifically the data I'm looking for.

<h2 align="center">Technologies Used</h2>
<br />
<div align="center">
   <img src="https://user-images.githubusercontent.com/83699039/139297272-dcf4b5fa-7fc6-450d-aefd-102bcd899877.png" width="100px" />
   <img src="https://user-images.githubusercontent.com/83699039/139297672-03f03106-a3d5-49e0-8c23-0b04a50a0e87.png" width="80px" />
   <img src="https://user-images.githubusercontent.com/83699039/139297300-7bd0cc7d-1833-4727-b1e2-5a89e447f91f.png" width="150px" />
   <img src="https://user-images.githubusercontent.com/83699039/139297303-609fff3b-1d2a-4e37-b6a6-f2e736ada553.png" width="150px" />
   <img src="https://user-images.githubusercontent.com/83699039/139297308-d8ba18ed-de1a-4530-9fdd-9845cb426378.png" width="100px" />
</div>

## Overall Structure
### Backend
The backend was created using Flask and SQLAlchemy with a Postgresql database, the API uses RESTFUL API conventions for intuitive queries, as well as making fetch requests to scryfalls api to search through cards and obtain card information.

### Frontend
The frontend of this application utilizes React and Redux to ensure a smooth user experience with dynamically rendered components

### Full List of Technologies Used
* React
* JavaScript
* Python
* Redux
* Flask
* SQLAlchemy
* Postgresql
* CSS

