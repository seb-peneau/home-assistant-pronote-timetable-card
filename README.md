# home-assistant-pronote-timetable-card
Carte pour Home Assistant qui affiche l'emploi du temps du lendemain à partir des données Pronote. Cette visualisation est compatible avec les anciens navigateurs (testé sur un Ipad Air en IOS 12)

## Installation

### Pre-requis
Vous  devez avoir préalablement avoir installé le plugin Pronote dans HomeAssistant : https://www.hacf.fr/pronote/

### Creation du composant carte
Placer le fichier pronote-calendar.js dans un repertoire www de votre installation HomeAssistant.

Redémarez votre instance HomeAssistant pour qu'il prenne en compte le fichier.

### Ajout des ressources dashboard
Dans les parametres de votre dashboard, ajoutez 2 ressources :

https://unpkg.com/@webcomponents/custom-elements en module javascript (pour la compatibilité avec les anciens navigateurs)

Si votre fichier est à la racine de www :
```
/local/pronote-calendar.js
```
sinon,

```
/local/path_apres_wwww/pronote-calendar.js
```
### Création de la carte

Créer une carte manuelle avec les parametres suivants : 

```yaml
type: custom:pronote-calendar
title: Emploi du temps de machin
entity: sensor.pronote_***_timetable_next_day
```
