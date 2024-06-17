class PronoteCalendar extends HTMLElement {
    set hass(hass) {
      if (!this.content) {
        const title = this.config.title
        this.innerHTML = `
          <style>
            .lesson {
              display: flex;
              border: 1px solid;
              padding: 0.1em;
            }
            .lesson:not(:first-child) {
                margin-top: 1em;
            }
            .content {
              padding-left: 0.5em;
            }
            .hours {
              background-color: lightgreen;
            }
            .hours.canceled {
                background-color: lightcoral;
            }
            .hours.moved {
                background-color: lightblue;
            }
            .card-content {
            }
            .matiere {
                font-weight:bold;
            }
          </style>
          <ha-card header="${title}">
            <div class="card-content"></div>
          </ha-card>
        `;
        this.content = this.querySelector("div");
      }
  
      const entityId = this.config.entity;
      const state = hass.states[entityId];
      const stateStr = state ? state.state : "unavailable";
  
      this.content.innerHTML = `
      `;
      
      const lessons = state.attributes.lessons;
      
      lessons.forEach((lesson) => {
          let lessonState = '';
          let lessonClass= '';
          if (lesson.canceled) {
              lessonState = 'Annulé';
              lessonClass = 'canceled';
          }
          if (lessonState == "" && lesson.status != "") {
              lessonState = lesson.status != null ? lesson.status : "";
              if (lessonState.indexOf("déplacé") != -1) {
                  lessonClass = 'moved'
              }
          }
          this.content.innerHTML += `
          <div class="lesson">
              <div class="hours ${lessonClass}">
                  <div class="start">${lesson.start_time} - ${lesson.end_time}</div>
                  <!--div class="end">${lesson.end_time}</div-->
                  <div class="state">${lessonState}</div>
              </div>
              <div class="content">
                  <div><span class="matiere">${lesson.lesson}</span> (${lesson.teacher_name})</div>
                  <!--div class="teacher">${lesson.teacher_name}</div-->
                  <div class="room">${lesson.classroom}</div>
              </div>
          </div>
          `;
      })
      
    }
  
    // The user supplied configuration. Throw an exception and Home Assistant
    // will render an error card.
    setConfig(config) {
      if (!config.entity) {
        throw new Error("You need to define an entity");
      }
      if (!config.title) {
        throw new Error("You need to define a title for the card");
      }
      this.config = config;
    }
  
    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
      return 3;
    }
  }
  
  customElements.define("pronote-calendar", PronoteCalendar);