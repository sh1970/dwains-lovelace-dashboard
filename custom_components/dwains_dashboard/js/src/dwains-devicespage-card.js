import { hass } from "card-tools/src/hass";
import { popUp } from "./dwains-popup";
import { fireEvent } from "card-tools/src/event";
import Cookies from 'js-cookie'
import {
  DOMAIN_ICONS,
 } from './variables'
import {
  computeDomain
} from 'custom-card-helpers';
import { mdiDotsVertical, mdiCog } from "@mdi/js";
import { css, html, LitElement } from 'lit-element';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import translateEngine from './translate-engine';
import { createCardElementSafe, resolveEntityName } from './helpers';

function getDwainsHass() {
  return (window.__dd_get_hass && window.__dd_get_hass()) || hass();
}

	    class DevicesCard extends LitElement {
        static get properties() {
          return {
            data: {},
            selectedDevice: {},
            deviceEditMode: {},
            deviceViewDisplayGrouped: {},
            deviceViewEditMode: {},
          };
        }

	        async loadHelpers() {
	          if (window.__dd_wait_card_helpers) {
	            return await window.__dd_wait_card_helpers();
	          }
	          if (typeof window.loadCardHelpers === 'function') {
	            return await window.loadCardHelpers();
	          } else {
	            console.warn('loadCardHelpers is not available, ensure you are running a compatible version of Home Assistant');
          }
        }

        _entityDisplayName(entityId, entityRegistryEntry) {
          const entityEntry = entityRegistryEntry || this.entitiesById?.get(entityId);
          const deviceEntry = entityEntry?.device_id
            ? this.devicesById?.get(entityEntry.device_id)
            : undefined;
          return resolveEntityName(
            this._hass,
            this.configuration,
            entityId,
            entityEntry,
            deviceEntry,
          );
        }

        /**
         * @param {any} hass
         */
        set hass(hass) {
          if(this.startedUp){
            this._update_hass(hass);
          }
        }

	        _update_hass(hass){
	          this._hass = hass;

	          if(this.data == null || this.data.length === 0) return;

	          Object.values(this.data).map((data) => {
	            if(data.domain == this.selectedDevice){
	              data.cards.forEach((item) => {
	                if(item.card) item.card.hass = hass;
	              });
	              data.customCardsTop.forEach((item) => {
	                if(item.card) item.card.hass = hass;
	              });
	              data.customCardsBottom.forEach((item) => {
	                if(item.card) item.card.hass = hass;
	              });
	            }
	          });

	          if(this.timeout) return;
	          this.timeout = true;
	          window.setTimeout(() => {this.timeout = false;}, 100);
	          this.requestUpdate();
	        }

        async setConfig(config) {
          this.startedUp = false;
          this.timeout = false;

	          this._hass = getDwainsHass();

          this.cardHelpers = await this.loadHelpers();

          this.selectedDevice = window.location.hash.substring(1);
          this.deviceEditMode = false;
          this.deviceViewEditMode = false;
          this.deviceViewDisplayGrouped = Cookies.get('dwains_dashboard_deviceViewDisplayGrouped') ? (Cookies.get('dwains_dashboard_deviceViewDisplayGrouped') == "false" ? false : true) : false;
          this._config = config;

          this.notificationCard, this.weatherCard;

          window.addEventListener("location-changed", () => this.updated(new Map()));
        }

        updated(changedProperties) {
          if(!changedProperties.has("state")) {
            let newstate = undefined;
            newstate = window.location.hash.substring(1);

            if (newstate){
              this.selectedDevice = newstate;
            } else {
              //The tab/page itself is clicked so fallback on first device button
              if(this.data != null && Object.keys(this.data).length != 0){
                this.selectedDevice = Object.values(this.data)[0]['domain'];
              }
            }
          }
        }

	        async connectedCallback(){
	          //console.log('connectedCallBack');
	          super.connectedCallback();

	          await this._loadData(); //Load areas

	          if(!this._unsub){
	            this._unsub = await this._hass.connection.subscribeEvents(() => this._reloadCard(), "dwains_dashboard_devicespage_card_reload");
	          }
	        }

	        disconnectedCallback(){
	          super.disconnectedCallback();
	          if(this._unsub){
	            Promise.resolve(this._unsub()).catch(() => {});
	            this._unsub = undefined;
	          }
	        }

        async _reloadCard(){
          await this._loadData();
          this.requestUpdate();
        }

	        async _loadData(){
	          this.selectedArea = this.selectedArea || "";
	          this.startedUp = false;

          this.areas = await this._hass.callWS({
            type: "config/area_registry/list"
          });
          this.devices = await this._hass.callWS({
            type: "config/device_registry/list"
          });
          this.entities = await this._hass.callWS({
            type: "config/entity_registry/list"
          });
	          this.devicesById = new Map((this.devices || []).map((device) => [device.id, device]));
	          this.entitiesById = new Map((this.entities || []).map((entity) => [entity.entity_id, entity]));

          //Load configuration
          this.configuration = await this._hass.callWS({
            type: 'dwains_dashboard/configuration/get'
          });

          if(this.areas == null || this.areas.length === 0
          || this.devices == null || this.devices.length === 0
          || this.entities == null || this.entities.length === 0
          || this.configuration == null || this.configuration.length === 0
          ){
          } else {
            //for the ha-icon-picker?
            const loader = document.createElement("hui-masonry-view");
            loader.lovelace = { editMode: true };
            loader.willUpdate(new Map());
            //end for the ha-icon-picker

            const data = [];
            const disabledDevices = [];

            const areaEntities = new Set();
            //Loop throught all areas to get all entities assigned to an area to populate the data group
            for(const area of this.areas){
              if(!(this.configuration['areas'][area.area_id] && this.configuration['areas'][area.area_id]['disabled'])){
                const areaDevices = new Set();

                // Find all devices linked to this area
                for (const device of this.devices) {
                  if (device.area_id === area.area_id) {
                    areaDevices.add(device.id);
                  }
                }

                // Find all entities directly linked to this area
                // or linked to a device linked to this area.
                for (const entity of this.entities) {
                  if (
                    entity.area_id
                      ? entity.area_id === area.area_id
                      : areaDevices.has(entity.device_id)
                    ||
                      (computeDomain(entity.entity_id) == 'person' && !areaEntities.has(entity.entity_id))
                    ||
                      (computeDomain(entity.entity_id) == 'weather' && !areaEntities.has(entity.entity_id))
                    ||
                      (computeDomain(entity.entity_id) == 'alarm_control_panel' && !areaEntities.has(entity.entity_id))
                  ) {

                    if(entity.hidden_by){
                      continue;
                    }

                    const domain = computeDomain(entity.entity_id);
                    const stateObj = this._hass.states[entity.entity_id];

                    if(this.configuration['devices'][domain] && this.configuration['devices'][domain]['hidden']){
                      if (!disabledDevices.includes(domain)) {
                        disabledDevices.push(domain);
                      }
                      continue;
                    }

                    if (!(domain in data)) {
                      //Custom cards
                      const deviceCustomCardsTop = [];
                      const deviceCustomCardsBottom = [];

                      if(this.configuration.device_cards.length !== 0){
                        if(this.configuration.device_cards[domain]){
                          Object.entries(this.configuration.device_cards[domain]).map(async ([k,v]) => {
                            const card = await this.createCardElement2(v);
                            const rowSpan = v["row_span"] ? v["row_span"] : "1";
                            const colSpan = v["col_span"] ? v["col_span"] : "1";
                            const rowSpanLg = v["row_span_lg"] ? v["row_span_lg"] : "1";
                            const colSpanLg = v["col_span_lg"] ? v["col_span_lg"] : "1";
                            const rowSpanXl = v["row_span_xl"] ? v["row_span_xl"] : "1";
                            const colSpanXl = v["col_span_xl"] ? v["col_span_xl"] : "1";

                            if(v["position"] == 'bottom'){
                              deviceCustomCardsBottom.push({
                                card: card,
                                filename: k,
                                domain: domain,
                                rowSpan: rowSpan,
                                colSpan: colSpan,
                                rowSpanLg: rowSpanLg,
                                colSpanLg: colSpanLg,
                                rowSpanXl: rowSpanXl,
                                colSpanXl: colSpanXl,
                              });
                            } else {
                              deviceCustomCardsTop.push({
                                card: card,
                                filename: k,
                                domain: domain,
                                rowSpan: rowSpan,
                                colSpan: colSpan,
                                rowSpanLg: rowSpanLg,
                                colSpanLg: colSpanLg,
                                rowSpanXl: rowSpanXl,
                                colSpanXl: colSpanXl,
                              });
                            }
                          });
                        }
                      }
                      data[domain] = {
                        domain: domain,
                        cards: [],
                        entitiesNoState: [],
                        entitiesHidden: [],
                        entitiesDisabled: [],
                        customCardsTop: deviceCustomCardsTop,
                        customCardsBottom: deviceCustomCardsBottom,
                        sort_order: (this.configuration['devices'][domain] && this.configuration['devices'][domain]['sort_order'] ? this.configuration['devices'][domain]['sort_order']: 99),
                      };
                    }

                    const disableEntity = this.configuration['entities'][entity.entity_id] ? (this.configuration['entities'][entity.entity_id]['disabled'] ? true : false) : false;
                    if(disableEntity){
                      data[domain].entitiesDisabled.push(entity.entity_id);
                      areaEntities.add(entity.entity_id);
                      continue;
                    }

                    if (!stateObj) {
                      data[domain].entitiesNoState.push(entity.entity_id);
                      areaEntities.add(entity.entity_id);
                      continue;
                    } else {
                      const hideEntity = this.configuration['entities'][entity.entity_id] ? (this.configuration['entities'][entity.entity_id]['hidden'] ? true : false) : false;
                      const excludeEntity = this.configuration['entities'][entity.entity_id] ? (this.configuration['entities'][entity.entity_id]['excluded'] ? true : false) : false;
                      const configuredFriendlyName = this.configuration['entities'][entity.entity_id] ? this.configuration['entities'][entity.entity_id]['friendly_name'] : "";
                      const friendlyName = this._entityDisplayName(entity.entity_id, entity);
                      const customCard = this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['custom_card'] ? this.configuration['entities'][entity.entity_id]['custom_card'] : false;
                      const customPopup = this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['custom_popup'] ? this.configuration['entities'][entity.entity_id]['custom_popup'] : false;

                      if(hideEntity){
                        if(!data[domain].entitiesHidden.includes(entity.entity_id)){
                          data[domain].entitiesHidden.push(entity.entity_id);
                        }
                        continue;
                      }

                      let cardConfig = {};
                      let rowSpan = "1";
                      let colSpan = "1";
                      let rowSpanLg = "1";
                      let colSpanLg = "1";
                      let rowSpanXl = "1";
                      let colSpanXl = "1";
                      if(customCard && this.configuration['entity_cards'] && this.configuration['entity_cards'][entity.entity_id]){
                        //If entity has a custom card set by user
                        cardConfig = {input_name: friendlyName, input_entity: entity.entity_id,...this.configuration['entity_cards'][entity.entity_id]};
                      } else if(this.configuration['devices_card'][domain]){
                        //If domain has a custom card set by user
                        cardConfig = {input_name: friendlyName, input_entity: entity.entity_id,...this.configuration['devices_card'][domain]};
	                      } else if (domain === 'sensor' && this._hass && this._hass.states[entity.entity_id].attributes.unit_of_measurement) {
	                        cardConfig = {
	                          graph: "line",
	                          type: "sensor",
	                          hours_to_show: 24,
	                          detail: 1,
	                          entity: entity.entity_id,
	                          ...(friendlyName ? { name: friendlyName } : {})
	                        };
	                      } else {
                        //No custom card set so fallback to original DD cards
                        switch(domain) {
	                          default:
                            // cardConfig = {
                            //   type: "custom:dwains-button-card",
                            //   friendly_name: friendlyName
                            // };
	                            cardConfig = friendlyName ? {
	                              type: "tile",
	                              name: friendlyName,
	                            } : {
	                              type: "tile",
	                            }
	                            break;
	                          case "camera":
	                            cardConfig = {
	                              type: "picture-entity",
	                              camera_view: "auto"
	                            };
                            rowSpan = "2";
                            colSpan = "2";
                            rowSpanLg = "2";
                            colSpanLg = "2";
                            rowSpanXl = "2";
                            colSpanXl = "2";
                            break;
                          case "climate":
                            // cardConfig = {
                            //   type: "custom:dwains-thermostat-card",
                            //   friendly_name: friendlyName
                            // };
	                            cardConfig = friendlyName ? {
	                              type: "thermostat",
	                              name: friendlyName,
	                              features: [
                                {
                                  type: "climate-fan-modes",
                                  fan_modes: ["quiet","low","medium","high"],
                                },
                                {
                                  type: "climate-hvac-modes",
                                  hvac_modes: ["heat_cool","heat","dry","fan_only","cool","off"]
	                                }
	                              ]
	                            } : {
	                              type: "thermostat",
	                              features: [
	                                {
	                                  type: "climate-fan-modes",
	                                  fan_modes: ["quiet","low","medium","high"],
	                                },
	                                {
	                                  type: "climate-hvac-modes",
	                                  hvac_modes: ["heat_cool","heat","dry","fan_only","cool","off"]
	                                }
	                              ]
	                            }
	                            break;
                          case "cover":
                            // cardConfig = {
                            //   type: "custom:dwains-cover-card",
                            //   friendly_name: friendlyName
                            // };
	                            cardConfig = friendlyName ? {
	                              type: "tile",
	                              name: friendlyName,
	                              features: [
                                {
                                  type: "cover-open-close"
                                },
                                {
                                  type: "cover-position"
	                                }
	                              ]
	                            } : {
	                              type: "tile",
	                              features: [
	                                {
	                                  type: "cover-open-close"
	                                },
	                                {
	                                  type: "cover-position"
	                                }
	                              ]
	                            }
	                            break;
                          case "light":
                            // cardConfig = {
                            //   type: "custom:dwains-light-card",
                            //   friendly_name: friendlyName
                            // };
	                            cardConfig = friendlyName ? {
	                              type: "tile",
	                              name: friendlyName,
	                              features: [
                                {
                                  type: "light-brightness",
	                                }
	                              ]
	                            } : {
	                              type: "tile",
	                              features: [
	                                {
	                                  type: "light-brightness",
	                                }
	                              ]
	                            };
	                            break;
                        }

                        cardConfig = {entity: entity.entity_id,...cardConfig};
                      }


                      if(this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['row_span']){
                        rowSpan = this.configuration['entities'][entity.entity_id]['row_span'];
                      }
                      if(this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['col_span']){
                        colSpan = this.configuration['entities'][entity.entity_id]['col_span'];
                      }
                      if(this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['row_span_lg']){
                        rowSpanLg = this.configuration['entities'][entity.entity_id]['row_span_lg'];
                      }
                      if(this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['col_span_lg']){
                        colSpanLg = this.configuration['entities'][entity.entity_id]['col_span_lg'];
                      }
                      if(this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['row_span_xl']){
                        rowSpanXl = this.configuration['entities'][entity.entity_id]['row_span_xl'];
                      }
                      if(this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['col_span_xl']){
                        colSpanXl = this.configuration['entities'][entity.entity_id]['col_span_xl'];
                      }

                      areaEntities.add(entity.entity_id);

                      data[domain].cards.push({
                        area: area,
                        entity: entity.entity_id,
                        rowSpan: rowSpan,
                        colSpan: colSpan,
                        rowSpanLg: rowSpanLg,
                        colSpanLg: colSpanLg,
                        rowSpanXl: rowSpanXl,
                        colSpanXl: colSpanXl,
                        friendlyName: configuredFriendlyName,
                        hideEntity: hideEntity,
                        excludeEntity: excludeEntity,
	                        card: this.createCardElement2(cardConfig),
                        customCard: customCard,
                        customPopup: customPopup,
                        sort_order: (this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['devices_sort_order'] ? this.configuration['entities'][entity.entity_id]['devices_sort_order']: 99),
                        grouped_sort_order: (this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['devices_grouped_sort_order'] ? this.configuration['entities'][entity.entity_id]['devices_grouped_sort_order']: 99),
                      });
                    }
                  }
                }
              }
            }

	            const sortedData = Object.keys(data)
              .sort(function(a, b) {
                return data[a].sort_order - data[b].sort_order;
              })
	              .map(function(category) {
	                return data[category]; // Convert array of categories to array of objects
	              });

	            await Promise.all(sortedData.flatMap((group) => group && group.cards || []).map(async (item) => {
	              try {
	                if(item) item.card = await item.card;
	              } catch (_) {
	                if(item) item.card = null;
	              }
	            }));

            this.data = sortedData;
            this.disabledDevices = disabledDevices;
            this.startedUp = true;

            //Set first selected device
            if(this.selectedDevice.length === 0){
              this.selectedDevice = Object.values(sortedData)[0]['domain'];
            }
          }
        }

        _average(data, domain, deviceClass) {
          const entities = data[domain].filter((entity) =>
            deviceClass ? entity.attributes.device_class === deviceClass : true
          );
          if (!entities) {
            return undefined;
          }
          let uom;
          const values = entities.filter((entity) => {
            if (
              !entity.attributes.unit_of_measurement ||
              isNaN(Number(entity.state))
            ) {
              return false;
            }
            if (!uom) {
              uom = entity.attributes.unit_of_measurement;
              return true;
            }
            return entity.attributes.unit_of_measurement === uom;
          });
          if (!values.length) {
            return undefined;
          }
          const sum = values.reduce(
            (total, entity) => total + Number(entity.state),
            0
          );
          return `${Math.round((sum / values.length)*10)/10}${uom}`;
        }

        _isOn(data, domain, deviceClass) {
          const entities = data[domain];
          if (!entities) {
            return undefined;
          }
          return((
            deviceClass
              ? entities.filter(
                  (entity) => entity.attributes.device_class === deviceClass
                )
              : entities
          ).filter(
            (entity) =>
              !UNAVAILABLE_STATES.includes(entity.state) &&
              !STATES_OFF.includes(entity.state)
          ).length);
        }

        _climateState(data, domain){
          const entities = data[domain];
          if (!entities) {
            return undefined;
          }
          const climateStates = [];
          for(const climate of entities){
            if(climate.attributes['hvac_action'] != 'idle'){
              climateStates.push(climate.attributes['hvac_action']);
            }
          }
          return climateStates.join(", ");
        }

        _handleDeviceClick(event){
          var id = event.currentTarget.dataset.device;
          window.location.hash = id;
          this.selectedDevice = id;
          window.scrollTo(0,0);
          //this.requestUpdate();
          this._update_hass(this._hass);
        }

        _backButtonClick(){
          window.location.hash = "";
          //this.selectedDevice = "woonkamer";
          //this.requestUpdate();
          this._update_hass(this._hass);
        }

        _entitiesByDomain(entities){
          const entitiesByDomain = {};

          for (const entity of entities) {

              const domain = entity.substr(0, entity.indexOf("."));

              if (
                !TOGGLE_DOMAINS.includes(domain) &&
                !SENSOR_DOMAINS.includes(domain) &&
                !ALERT_DOMAINS.includes(domain) &&
                !CLIMATE_DOMAINS.includes(domain) &&
                !OTHER_DOMAINS.includes(domain)
              ) {
                //console.log(domain);
                continue;
              }

              const stateObj = this._hass.states[entity];

              if (!stateObj) {
                continue;
              }

              if (
                (SENSOR_DOMAINS.includes(domain) || ALERT_DOMAINS.includes(domain) || COVER_DOMAINS.includes(domain)) &&
                !DEVICE_CLASSES[domain].includes(
                  stateObj.attributes.device_class || ""
                )
              ) {
                //console.log(domain);
                continue;
              }

              if (!(domain in entitiesByDomain)) {
                entitiesByDomain[domain] = [];
              }
              entitiesByDomain[domain].push(stateObj);
          }
          return entitiesByDomain;
        }

        async createCardElement(inputCards){
          const cardInput2 = {
              type: "grid",
              columns: 6,
              cards: inputCards,
          };
          const cardHelper = await cardHelpers;
          const element = await createCardElementSafe(cardHelper, cardInput2, this._hass);
          //element.setConfig(cardInput2);

          //console.log(element);

          return element;
        }

        async createCardElement2(config){
          // Zorg ervoor dat this.cardHelpers geladen is voordat je verder gaat.
          if (!this.cardHelpers) {
            console.error("Card helpers zijn niet geladen.");
            return;
          }

          return createCardElementSafe(this.cardHelpers, config, this._hass);
        }

        shouldUpdate(changedProps){
          if (changedProps.has("_hass")) {
            return false;
          }
          return true;

          // const oldHass = changedProps.get("hass");

          // if (
          //   !oldHass ||
          //   oldHass.themes !== this._hass!.themes ||
          //   oldHass.locale !== this._hass!.locale
          // ) {
          //   return true;
          // }

        }

        _iconPickerChange(ev){
          console.log(ev);

        }

        _toggle(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;
          if (TOGGLE_DOMAINS.includes(domain)) {
            this._hass.callService(
              domain,
              (ev.currentTarget.state ? "turn_off" : "turn_on"),
              undefined,
              {
                area_id: ev.currentTarget.area_id,
              }
            );
          }
        }

        _addLovelaceCard(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;
          const position = ev.currentTarget.position;

          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'device.add_card_to') + domain, {
              type: "custom:dwains-create-custom-card-card",
              domain: domain,
              position: position,
              page: "devices"
            }, true, '');
          }, 50);
        }

        _handleEntityEditClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const entity = ev.currentTarget.entity;
          const friendlyName = ev.currentTarget.friendlyName;
          const hideEntity = ev.currentTarget.hideEntity;
          const excludeEntity = ev.currentTarget.excludeEntity;
          const disableEntity = ev.currentTarget.disableEntity;
          const colSpan = ev.currentTarget.colSpan;
          const rowSpan = ev.currentTarget.rowSpan;
          const colSpanLg = ev.currentTarget.colSpanLg;
          const rowSpanLg = ev.currentTarget.rowSpanLg;
          const colSpanXl = ev.currentTarget.colSpanXl;
          const rowSpanXl = ev.currentTarget.rowSpanXl;
          const customCard = ev.currentTarget.customCard;
          const customPopup = ev.currentTarget.customPopup;
          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'entity.edit_entity'), {
              type: "custom:dwains-edit-entity-card",
              entity: entity,
              friendlyName: friendlyName,
              hideEntity: hideEntity,
              excludeEntity: excludeEntity,
              disableEntity: disableEntity,
              colSpan: colSpan,
              rowSpan: rowSpan,
              colSpanLg: colSpanLg,
              rowSpanLg: rowSpanLg,
              colSpanXl: colSpanXl,
              rowSpanXl: rowSpanXl,
              customCard: customCard,
              customPopup: customPopup,
            }, false, '');
          }, 50);
        }


        _handleEntityEditCardClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const entityId = ev.currentTarget.entity;

          let cardConfig, mode;
          if(this.configuration['entity_cards'] && this.configuration['entity_cards'][entityId]){
            //cardConfig = this.configuration['entity_cards'][entityId];
            const friendlyName = this._entityDisplayName(entityId);
            cardConfig = {input_name: friendlyName,input_entity: entityId,...this.configuration['entity_cards'][entityId]};
            mode = "editor-element";
          }

          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'entity.edit_entity_card'), {
              type: "custom:dwains-edit-entity-card-card",
              entity_id: entityId,
              cardConfig: cardConfig,
              mode: mode,
              existingCardEdit: cardConfig ? true : false,
            }, true, '');
          }, 50);
        }

        _handleEntityEditPopupClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const entityId = ev.currentTarget.entity;

          let cardConfig, mode;
          if(this.configuration['entities_popup'] && this.configuration['entities_popup'][entityId]){
            //cardConfig = this.configuration['entities_popup'][entityId];
            const friendlyName = this._entityDisplayName(entityId);
            cardConfig = {input_name: friendlyName,input_entity: entityId, ...this.configuration['entities_popup'][entityId]};
            mode = "editor-element";
          }

          console.log(cardConfig);

          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'entity.edit_entity_popup_card'), {
              type: "custom:dwains-edit-entity-popup-card",
              entity_id: entityId,
              cardConfig: cardConfig,
              mode: mode,
              existingCardEdit: cardConfig ? true : false,
            }, true, '');
          }, 50);
        }

        _handleDeviceEditClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const device = ev.currentTarget.device;
          const icon = ev.currentTarget.device_icon;
          const showInNavbar = ev.currentTarget.showInNavbar;
          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'device.edit_device_button'), {
              type: "custom:dwains-edit-device-button-card",
              device: device,
              icon: icon,
              showInNavbar: showInNavbar,
            }, false, '');
          }, 50);
        }

        _handleCustomCardEditClick(ev){
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;
          const filename = ev.currentTarget.filename;

          const loader = document.createElement("hui-masonry-view");
          loader.lovelace = { editMode: true };
          loader.willUpdate(new Map());

          const colSpan = ev.currentTarget.colSpan;
          const rowSpan = ev.currentTarget.rowSpan;
          const colSpanLg = ev.currentTarget.colSpanLg;
          const rowSpanLg = ev.currentTarget.rowSpanLg;
          const colSpanXl = ev.currentTarget.colSpanXl;
          const rowSpanXl = ev.currentTarget.rowSpanXl;

          const cardConfig = this.configuration.device_cards[domain][filename];
          var position = "top";
          if(cardConfig["position"]){
            //Config has the DD position key, but editor doesnt understand that so remove it and parse it to editor
            position = cardConfig["position"];
            delete cardConfig["position"];
          }

          delete cardConfig["col_span"];
          delete cardConfig["row_span"];
          delete cardConfig["col_span_lg"];
          delete cardConfig["row_span_lg"];
          delete cardConfig["col_span_xl"];
          delete cardConfig["row_span_xl"];

          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(this._hass.localize("ui.components.entity.entity-picker.edit"), {
              type: "custom:dwains-create-custom-card-card",
              domain: domain,
              page: "devices",
              mode: "editor-element",
              cardConfig: cardConfig,
              position: position,
              filename: filename,
              colSpan: colSpan,
              rowSpan: rowSpan,
              colSpanLg: colSpanLg,
              rowSpanLg: rowSpanLg,
              colSpanXl: colSpanXl,
              rowSpanXl: rowSpanXl,
              }, true, '');
          }, 50);
        }

        _handleEntityEditBoolValueClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const entityId = ev.currentTarget.entity;
          const key = ev.currentTarget.key;
          const value = ev.currentTarget.value;

          this._hass.connection.sendMessagePromise({
            type: 'dwains_dashboard/edit_entity_bool_value',
            entityId: entityId,
            key: key,
            value: value,
          }).then(
              (resp) => {
                  console.log(resp);
              },
              (err) => {
                  console.error('Message failed!', err);
              }
          );
        }

        _handleDeviceEditBoolValueClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const device = ev.currentTarget.device;
          const key = ev.currentTarget.key;
          const value = ev.currentTarget.value;

          this._hass.connection.sendMessagePromise({
            type: 'dwains_dashboard/edit_device_bool_value',
            device: device,
            key: key,
            value: value,
          }).then(
              (resp) => {
                  console.log(resp);
              },
              (err) => {
                  console.error('Message failed!', err);
              }
          );
        }

        _handleDeviceEditCardClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;

          let cardConfig, mode;
          if(this.configuration['devices_card'] && this.configuration['devices_card'][domain]){
            cardConfig = this.configuration['devices_card'][domain];
            mode = 'current-selected-blueprint';
          }

          const loader = document.createElement("hui-masonry-view");
          loader.lovelace = { editMode: true };
          loader.willUpdate(new Map());

          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'device.edit_device_card')+translateEngine(this._hass, 'device.'+domain), {
              type: "custom:dwains-edit-device-card-card",
              domain: domain,
              cardConfig: cardConfig,
              existingCardEdit: cardConfig ? true : false,
              mode: mode,
            }, true, '');
          }, 50);
        }

        _handleDeviceEditPopupClick(ev) {
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;

          let cardConfig, mode;
          if(this.configuration['devices_popup'] && this.configuration['devices_popup'][domain]){
            cardConfig = this.configuration['devices_popup'][domain];
            mode = 'current-selected-blueprint';
          }

          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'device.edit_device_popup')+translateEngine(this._hass, 'device.'+domain), {
              type: "custom:dwains-edit-device-popup-card",
              domain: domain,
              cardConfig: cardConfig,
              existingCardEdit: cardConfig ? true : false,
              mode: mode,
            }, true, '');
          }, 50);
        }


        /**
         * Handle when area button is moved
         * @param {evt} evt
         */
        _deviceButtonMoved(evt){
          this._hass.connection.sendMessagePromise({
            type: 'dwains_dashboard/sort_device_button',
            sortData: JSON.stringify(this._sortable.toArray()),
          }).then(
              (resp) => {
                  console.log(resp);
              },
              (err) => {
                  console.error('Message failed!', err);
              }
          );
        }
        _handleDeviceEditModeClicked(ev){
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const value = ev.currentTarget.value;

          if(value){
            if(this.shadowRoot.getElementById("sortable")){
              this._sortable = new Sortable(this.shadowRoot.getElementById("sortable"), {
                forceFallback: true,
                animation: 150,
                dataIdAttr: "data-device",
                handle: '.sortable-move',
                onEnd: async (evt) => this._deviceButtonMoved(evt),
              });
            }
          } else {
            this._sortable.destroy();
            this._sortable = undefined;
          }
          this.deviceEditMode = value;
        }

        _handleDeviceViewEditModeClicked(ev){
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();
          const value = ev.currentTarget.value;

          if(value){
            this._sortable = [];
            const sortableElements = this.shadowRoot.querySelectorAll('.sortable');
            for(var i=0; i<sortableElements.length; i++){
              const sortType = (this.deviceViewDisplayGrouped ? 'devices_grouped_sort_order' : 'devices_sort_order');
              this._sortable[i] = new Sortable(sortableElements[i], {
                  forceFallback: true,
                  animation: 150,
                  dataIdAttr: "data-entity",
                  handle: '.sortable-move',
                  onEnd: function(event){
                    hass().connection.sendMessagePromise({
                        type: 'dwains_dashboard/sort_entity',
                        sortData: JSON.stringify(this.toArray()),
                        sortType: sortType
                      }).then(
                          (resp) => {
                              console.log(resp);
                          },
                          (err) => {
                              console.error('Message failed!', err);
                          }
                      );
                  }
              });
            }
          } else {
            this._sortable.forEach(sortElement => sortElement.destroy());
            this._sortable = undefined;
          }
          this.deviceViewEditMode = value;
        }

        _renderDeviceButtonCard(domain, type) {
          return html`
            <div>
              <ha-card class="p-2">
                <span class="break-words">
                ${translateEngine(this._hass, 'device.'+domain)}
                </span>
              </ha-card>
              <ha-card>
                <div class="card-actions">
                  <ha-button
                    .device="${domain}"
                    .key=${"hidden"}
                    .value=${false}
                    @click=${this._handleDeviceEditBoolValueClick}
                  >
                    ${translateEngine(this._hass, 'device.unhide')}
                  </ha-button>
                </div>
              </ha-card>
            </div>
          `;
        }

        _renderDeviceButton(data){
          //console.log(data.domain);
          return html`
            <div class="relative" data-device='${data.domain}'>
              <div
                class="flex justify-between h-44 p-3 device-button ${this.selectedDevice == data.domain && !this.configuration['homepage_header']['v2_mode'] ? 'current' : ''}"
                data-device=${data.domain}
                @click=${this._handleDeviceClick}
              >
                <div class="h-full flex flex-wrap content-between">
                  <div class="w-full ha-icon">
                    ${this.configuration['devices'][data.domain] && this.configuration['devices'][data.domain]['icon'] ? html`
                      <ha-icon
                        class="h-14 w-14"
                        style="color: var(--primary-color);"
                        .icon=${this.configuration['devices'][data.domain]['icon']}
                      ></ha-icon>`
                      : html`${DOMAIN_ICONS[data.domain] ? html`<ha-icon
                          class="h-14 w-14"
                          style="color: var(--primary-color);"
                          .icon=${DOMAIN_ICONS[data.domain]}></ha-icon>` : ""}`
                    }
                  </div>
                  <div class="w-full">
                    <h3 class="font-semibold text-lg capitalize">${translateEngine(this._hass, 'device.'+data.domain)}</h3>
                  </div>
                </div>
                <div class="row-span-2 text-right space-y-0.5 info">

                </div>
              </div>
              ${this.deviceEditMode ? html`
                <ha-card>
                  <div class="card-actions-multiple">
                    <div class="sortable-move">
                      <ha-icon
                        .icon=${"mdi:cursor-move"}
                      >
                      </ha-icon>
                    </div>
                    <ha-dropdown
                      class="ha-icon-overflow-menu-overflow"
                      corner="BOTTOM_START"
                      absolute
                    >
                      <ha-icon-button
                        label=${this._hass.localize("ui.common.overflow_menu")}
                        .path=${mdiDotsVertical}
                        slot="trigger"
                      ></ha-icon-button>
                        <ha-list-item
                          graphic="icon"
                          .device=${data.domain}
                          .device_icon=${this.configuration['devices'][data.domain] && this.configuration['devices'][data.domain]['icon'] ? this.configuration['devices'][data.domain]['icon'] : (DOMAIN_ICONS[data.domain] ? DOMAIN_ICONS[data.domain] : "")}
                          .showInNavbar=${this.configuration['devices'][data.domain] && this.configuration['devices'][data.domain]['show_in_navbar'] ? this.configuration['devices'][data.domain]['show_in_navbar'] : ""}
                          @click=${this._handleDeviceEditClick}
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:cog"}></ha-icon>
                          </div>
                          ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                        </ha-list-item>

                        <ha-list-item
                          graphic="icon"
                          .domain=${data.domain}
                          @click="${this._handleDeviceEditCardClick}"
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:pencil"}></ha-icon>
                          </div>
                          ${translateEngine(this._hass, 'entity.entity_card')}
                        </ha-list-item>
                        <ha-list-item
                          graphic="icon"
                          .domain=${data.domain}
                          @click="${this._handleDeviceEditPopupClick}"
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:pencil-box-multiple"}></ha-icon>
                          </div>
                          ${translateEngine(this._hass, 'entity.popup_card')}
                        </ha-list-item>
                        <ha-list-item
                          graphic="icon"
                          .device=${data.domain}
                          .key=${"hidden"}
                          .value=${true}
                          @click=${this._handleDeviceEditBoolValueClick}
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:eye-off"}></ha-icon>
                          </div>
                          ${translateEngine(this._hass, 'device.hide')}
                        </ha-list-item>
                    </ha-dropdown>
                  </div>
                </ha-card>
                ` : ""
              }
            </div>
          `;
        }

	        _hideUnavailableEntitiesEnabled(){
	          return !!(this.configuration && this.configuration.homepage_header && this.configuration.homepage_header.hide_unavailable_entities);
	        }

	        _filterUnavailableCards(cards){
	          if(this.deviceViewEditMode || !this._hideUnavailableEntitiesEnabled()){
	            return cards;
	          }
	          return cards.filter((card) => {
	            const stateObj = this._hass.states[card.entity];
	            return !(stateObj && stateObj.state === "unavailable");
	          });
	        }

	        _renderDeviceViewCards(data){
	          const cards = this._filterUnavailableCards(data.cards);
	          if(!this.deviceViewDisplayGrouped || data.domain == 'person' || data.domain == 'weather' || data.domain == 'alarm_control_panel'){
	            cards.sort(function (x, y) {
	              let a = x.sort_order,
	                  b = y.sort_order;
	              return a == b ? 0 : a > b ? 1 : -1;
	            });

	            return html`
	            <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 sortable">
	              ${cards.map((i) =>
	                html`${this._renderDeviceViewCard(i)}`
	              )}
	            </div>
	            `;
	          } else {
	            let group = cards.reduce((r, a) => {
              //console.log("a", a);
              //console.log('r', r);
              r[a.area.area_id] = [...r[a.area.area_id] || [], a];
              return r;
             }, {});

             //console.log(1, group);

             let sortedGroup = Object.keys(group).sort((x,y) => {
              let a = (this.configuration['areas'][x] && this.configuration['areas'][x]['sort_order'] ? this.configuration['areas'][x] : 1),
                  b = (this.configuration['areas'][y] && this.configuration['areas'][y]['sort_order'] ? this.configuration['areas'][y] : 1);
              return a == b ? 0 : a > b ? 1 : -1;
             });

             //sortedGroup.map(input => );

             //console.log(2,test);

            //  group.sort(function(x,y) {
            //    console.log(x);
            //   let a = x,
            //       b = y;
            //   return a == b ? 0 : a > b ? 1 : -1;
            //  });


	            cards.sort(function (x, y) {
              let a = x.grouped_sort_order,
                  b = y.grouped_sort_order;
              return a == b ? 0 : a > b ? 1 : -1;
            });

            return html`
            <div>
            ${sortedGroup.map((key) =>
              html`
                <div class="mb-5">
                  <h3 class="font-semibold capitalize text-gray">${group[key][0].area.name}</h3>
                  <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 sortable">
                  ${Object.entries(group[key]).map(([k,v]) => html`${this._renderDeviceViewCard(v)}`)}
                  </div>
                </div>
              `
            )}
            </div>
            `;
          }
        }
        _renderDeviceViewCard(data){
          return html`
          <div
            data-entity='${data.entity}'
            class="col-span-${data.colSpan} row-span-${data.rowSpan} lg-col-span-${data.colSpanLg} lg-row-span-${data.rowSpanLg} xl-col-span-${data.colSpanXl} xl-row-span-${data.rowSpanXl} relative"
          >
	            <div>
	              <span class="hidden">${translateEngine(this._hass, 'device.'+data.domain)}<br></span>
	              <dd-lazy-card .card=${data.card}></dd-lazy-card>
	            </div>
            ${this.deviceViewEditMode ? html`
            <ha-card>
              <div class="card-actions-multiple">
                <div class="sortable-move">
                  <ha-icon
                    .icon=${"mdi:cursor-move"}
                  >
                  </ha-icon>
                </div>
                <ha-dropdown
                  class="ha-icon-overflow-menu-overflow"
                  corner="BOTTOM_START"
                  absolute
                >
                  <ha-icon-button
                    label=${this._hass.localize("ui.common.overflow_menu")}
                    .path=${mdiDotsVertical}
                    slot="trigger"
                  ></ha-icon-button>
                    <ha-list-item
                      graphic="icon"
                      .entity="${data.entity}"
                      .friendlyName="${data.friendlyName}"
                      .disableEntity=${data.disableEntity}
                      .hideEntity=${data.hideEntity}
                      .excludeEntity=${data.excludeEntity}
                      .rowSpan=${data.rowSpan}
                      .colSpan=${data.colSpan}
                      .rowSpanLg=${data.rowSpanLg}
                      .colSpanLg=${data.colSpanLg}
                      .rowSpanXl=${data.rowSpanXl}
                      .colSpanXl=${data.colSpanXl}
                      .customCard=${data.customCard}
                      .customPopup=${data.customPopup}
                      @click=${this._handleEntityEditClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:cog"}></ha-icon>
                      </div>
                      ${translateEngine(this._hass, 'entity.settings')}
                    </ha-list-item>
                    ${data.entity != 't' ? html `
                      <ha-list-item
                        graphic="icon"
                        .entity="${data.entity}"
                        @click="${this._handleEntityEditCardClick}"
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${"mdi:pencil"}></ha-icon>
                        </div>
                        ${translateEngine(this._hass, 'entity.entity_card')}
                      </ha-list-item>` : ""
                    }
                    ${data.entity != 't' ? html `
                      <ha-list-item
                        graphic="icon"
                        .entity="${data.entity}"
                        @click="${this._handleEntityEditPopupClick}"
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${"mdi:pencil-box-multiple"}></ha-icon>
                        </div>
                        ${translateEngine(this._hass, 'entity.popup_card')}
                      </ha-list-item>` : ""
                    }
                    <ha-list-item
                      graphic="icon"
                      .entity="${data.entity}"
                      .key=${"excluded"}
                      .value=${true}
                      @click=${this._handleEntityEditBoolValueClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:table-eye-off"}></ha-icon>
                      </div>
                      ${translateEngine(this._hass, 'entity.exclude')}
                    </ha-list-item>
                    <ha-list-item
                      graphic="icon"
                      .entity="${data.entity}"
                      .key=${"hidden"}
                      .value=${true}
                      @click=${this._handleEntityEditBoolValueClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:eye-off"}></ha-icon>
                      </div>
                      ${translateEngine(this._hass, 'entity.hide')}
                    </ha-list-item>
                    <ha-list-item
                      graphic="icon"
                      .entity="${data.entity}"
                      .key=${"disabled"}
                      .value=${true}
                      @click=${this._handleEntityEditBoolValueClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:tray-remove"}></ha-icon>
                      </div>
                      ${translateEngine(this._hass, 'entity.disable')}
                    </ha-list-item>
                </ha-dropdown>
              </div>
            </ha-card>` : ""}
          </div>
          `;
        }

        _renderDeviceViewCustomCards(data, position){
          return html`
          <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 my-4">
            ${position == "bottom" ?  data.customCardsBottom.map((i) =>
              html`${this._renderDeviceViewCustomCard(i)}`
            ) : data.customCardsTop.map((i) =>
              html`${this._renderDeviceViewCustomCard(i)}`
            )}
          </div>
          `;
        }
        _renderDeviceViewCustomCard(data){
          return html`
	          <div class="col-span-${data.colSpan} row-span-${data.rowSpan} lg-col-span-${data.colSpanLg} lg-row-span-${data.rowSpanLg} xl-col-span-${data.colSpanXl} xl-row-span-${data.rowSpanXl} relative">
	            <div>
	              <dd-lazy-card .card=${data.card}></dd-lazy-card>
	            </div>
            ${this.deviceViewEditMode ? html`
            <ha-card>
              <div class="card-actions">
                <ha-button
                  @click=${this._handleCustomCardEditClick}
                  .domain=${data.domain}
                  .filename=${data.filename}
                  .rowSpan=${data.rowSpan}
                  .colSpan=${data.colSpan}
                  .rowSpanLg=${data.rowSpanLg}
                  .colSpanLg=${data.colSpanLg}
                  .rowSpanXl=${data.rowSpanXl}
                  .colSpanXl=${data.colSpanXl}
                >
                  ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                </ha-button>
              </div>
            </ha-card>` : ""}
          </div>
          `;
        }


        _handleDeviceViewDisplayGroupedClicked(ev){
          if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
          ev.stopPropagation();

          const value = ev.currentTarget.value;
          this.deviceViewDisplayGrouped = value;
          Cookies.set('dwains_dashboard_deviceViewDisplayGrouped', value, { expires: 365 });
        }
        _renderAreaViewEntityCard(entity, type) {
          return html`
            <div>
              <ha-card class="p-2">
                ${translateEngine(this._hass, 'entity.title')}:<br>
                <span class="break-words">
                ${entity}
                </span>
              </ha-card>
              <ha-card>
                <div class="card-actions">
                  ${type == 'hidden' ? html`
                  <ha-button
                    .entity="${entity}"
                    .key=${"hidden"}
                    .value=${false}
                    @click=${this._handleEntityEditBoolValueClick}
                  >
                    ${translateEngine(this._hass, 'entity.unhide')}
                  </ha-button>`: ""}
                  ${type == 'disabled' ? html`
                  <ha-button
                    .entity="${entity}"
                    .key=${"disabled"}
                    .value=${false}
                    @click=${this._handleEntityEditBoolValueClick}
                  >
                    ${translateEngine(this._hass, 'entity.enable')}
                  </ha-button>`: ""}
                </div>
              </ha-card>
            </div>
          `;
        }

        _renderDeviceView(data){

          if(this.selectedDevice != data.domain){
            return html``;
          }

            const visible = this.selectedDevice == data.domain ? "block" : "hidden";

            return html`
              <div class="w-full mb-12 ${visible}" id="${data.domain}">
                <div class="flex justify-between">
                  <div>
                    <h2 class="font-semibold text-lg capitalize">
                      ${translateEngine(this._hass, 'device.'+data.domain)}
                    </h2>
                    <span class="text-gray">
                      ${data.cards.length} ${translateEngine(this._hass, 'entity.title_plural')}
                    </span>
                  </div>
                  <div>
                    <ha-dropdown
                      class="ha-icon-overflow-menu-overflow"
                      corner="BOTTOM_START"
                      absolute
                    >
                      <ha-icon-button
                        label=${this._hass.localize("ui.common.overflow_menu")}
                        .path=${mdiDotsVertical}
                        slot="trigger"
                      ></ha-icon-button>
                        ${!this.deviceViewDisplayGrouped ? html `
                          <ha-list-item
                            graphic="icon"
                            .value=${true}
                            .key=${"deviceViewDisplayGrouped"}
                            @click="${this._handleDeviceViewDisplayGroupedClicked}"
                          >
                            <div slot="graphic">
                              <ha-icon .icon=${"mdi:format-list-group"}></ha-icon>
                            </div>
                            ${translateEngine(this._hass, 'device.group')}
                          </ha-list-item>` : html `
                          <ha-list-item
                            graphic="icon"
                            .value=${false}
                            .key=${"deviceViewDisplayGrouped"}
                            @click="${this._handleDeviceViewDisplayGroupedClicked}"
                          >
                            <div slot="graphic">
                            <ha-icon .icon=${"mdi:grid"}></ha-icon>
                            </div>
                            ${translateEngine(this._hass, 'device.ungroup')}
                          </ha-list-item>
                          `
                        }
                        ${this._hass.user.is_admin ? html`
                          ${this.deviceViewEditMode ? html `
                            <ha-list-item
                              graphic="icon"
                              .value=${false}
                              @click=${this._handleDeviceViewEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                              </div>
                              ${translateEngine(this._hass, 'global.disable_edit_mode')}
                            </ha-list-item>` : html `
                            <ha-list-item
                              graphic="icon"
                              .value=${true}
                              @click=${this._handleDeviceViewEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                              </div>
                              ${translateEngine(this._hass, 'global.enable_edit_mode')}
                            </ha-list-item>
                            `
                          }
                        ` : ""}
                    </ha-dropdown>
                  </div>
                </div>
                ${this.deviceViewEditMode ? html `
                <button type="button"
                  @click=${this._addLovelaceCard}
                  .domain=${data.domain}
                  .position=${"top"}
                  class="cursor-pointer my-4 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="mx-auto h-12 w-12 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                  <span class="mt-2 block text-sm font-medium text-gray">
                    ${this._hass.localize("ui.panel.lovelace.editor.edit_card.add")}
                  </span>
                </button>` : "" }

                ${this._renderDeviceViewCustomCards(data, "top")}

                ${this._renderDeviceViewCards(data)}

                ${this._renderDeviceViewCustomCards(data, "bottom")}

                ${this.deviceViewEditMode ? html `
                  ${data.entitiesNoState.length ? html`
                    <div class="mb-5">
                      <h3 class="font-semibold capitalize text-gray">${translateEngine(this._hass, 'entity.unavailable')}</h3>
                      <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                      ${data.entitiesNoState.map((entity) =>
                          html`${this._renderAreaViewEntityCard(entity, 'noState')}`
                      )}
                      </div>
                    </div>` : ""
                  }
                  ${data.entitiesHidden.length ? html`
                    <div class="mb-5">
                      <h3 class="font-semibold capitalize text-gray">${translateEngine(this._hass, 'entity.hidden')}</h3>
                      <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                      ${data.entitiesHidden.map((entity) =>
                          html`${this._renderAreaViewEntityCard(entity, 'hidden')}`
                      )}
                      </div>
                    </div>` : ""
                  }
                  ${data.entitiesDisabled.length ? html`
                    <div class="mb-5">
                      <h3 class="font-semibold capitalize text-gray">${translateEngine(this._hass, 'entity.disabled')}</h3>
                      <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                      ${data.entitiesDisabled.map((entity) =>
                          html`${this._renderAreaViewEntityCard(entity, 'disabled')}`
                      )}
                      </div>
                    </div>` : ""
                  }
                `: ""}

                ${this.deviceViewEditMode ? html `
                <button type="button"
                  @click=${this._addLovelaceCard}
                  .domain=${data.domain}
                  .position=${"bottom"}
                  class="cursor-pointer my-4 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="mx-auto h-12 w-12 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                  <span class="mt-2 block text-sm font-medium text-gray">
                    ${this._hass.localize("ui.panel.lovelace.editor.edit_card.add")}
                  </span>
                </button>` : "" }
              </div>`;
        }


        render() {
          //console.log('render()');

          if(this.data == null || Object.keys(this.data).length === 0){
            return html``;
          } else {
            return html`
                <div class="flex flex-wrap">
                  <div class="w-full ${this.configuration['homepage_header']['v2_mode'] ? "" : "lg-w-1-2 xl-w-1-3"} ${window.location.hash ? (this.configuration['homepage_header']['v2_mode'] ? "hidden" : "hidden lg-block") : ""} p-4">
                    <div id="devices">
                      <div class="flex justify-between mb-2">
                        <div>
                          <h2 class="font-semibold text-lg capitalize">
                            ${translateEngine(this._hass, 'device.title_plural')}
                          </h2>
                          <span class="text-gray">
                            ${Object.keys(this.data).length} ${translateEngine(this._hass, 'device.title_plural')}
                          </span>
                        </div>
                        <div>
                          ${this._hass.user.is_admin ? html`
                          <ha-dropdown
                            class="ha-icon-overflow-menu-overflow"
                            corner="BOTTOM_END"
                            absolute
                          >
                            <ha-icon-button
                              label=${this._hass.localize("ui.common.overflow_menu")}
                              .path=${mdiDotsVertical}
                              slot="trigger"
                            ></ha-icon-button>
                              ${this.deviceEditMode ? html `
                                <ha-list-item
                                  graphic="icon"
                                  .value=${false}
                                  @click=${this._handleDeviceEditModeClicked}
                                >
                                  <div slot="graphic">
                                    <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                                  </div>
                                  ${translateEngine(this._hass, 'global.disable_edit_mode')}
                                </ha-list-item>` : html `
                                <ha-list-item
                                  graphic="icon"
                                  .value=${true}
                                  @click=${this._handleDeviceEditModeClicked}
                                >
                                  <div slot="graphic">
                                    <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                                  </div>
                                  ${translateEngine(this._hass, 'global.enable_edit_mode')}
                                </ha-list-item>
                                `
                              }
                          </ha-dropdown>
                          ` : ""}
                        </div>
                      </div>

                      <div class="grid grid-cols-2 md-grid-cols-3 ${this.configuration['homepage_header']['v2_mode'] ? "lg-grid-cols-4 xl-grid-cols-5" : ""} gap-4" id="sortable">
                        ${Object.values(this.data).map((i) => this._renderDeviceButton(i))}
                      </div>

                      ${this.deviceEditMode ? html `
                        ${this.disabledDevices.length ? html`
                          <div class="mb-5">
                            <h3 class="font-semibold capitalize text-gray">${translateEngine(this._hass,'device.hidden')}</h3>
                            <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                            ${this.disabledDevices.map((device) =>
                                html`${this._renderDeviceButtonCard(device, 'disabled')}`
                            )}
                            </div>
                          </div>` : ""
                        }
                      `: ""}
                    </div>
                  </div>
                  <div class="w-full ${this.configuration['homepage_header']['v2_mode'] ? "" : "lg-w-1-2 xl-w-2-3"} ${!window.location.hash ? (this.configuration['homepage_header']['v2_mode'] ? "hidden" : "hidden lg-block") : ""} p-4">
                    ${Object.values(this.data).map((i) => this._renderDeviceView(i))}
                  </div>
                </div>
                <div class="sticky z-30 bottom-0 ${!window.location.hash ? "hidden" : ""} ${this.configuration['homepage_header']['v2_mode'] ? "" : "lg-hidden"} text-right">
                <div @click=${this._backButtonClick} class="back-button">
                    <div class="button">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                </div>
                </div>
            `;
          }
        }

        static get styles() {
          return css`
            .back-button {
              margin-right: 1rem;
              margin-bottom: 3.4rem;
              display: inline-block;
            }
            .back-button .button {
              background-color: var(--secondary-background-color);
              padding: 0.75rem;
              border-radius: 9999px;
              margin-bottom: env(safe-area-inset-bottom);
            }
            .card-actions {
              text-align: right;
            }
            .card-actions-multiple {
              display: flex;
              justify-content: space-between;
              padding: 0.25rem 0.5rem;
            }
            .sortable-move {
              cursor: -webkit-grabbing;
              cursor: grab;
              margin: auto 0;
            }
            .device-button .info ha-icon, .ha-icon ha-icon {
              display: inline-block;
              margin: auto;
              --mdc-icon-size: 100% !important;
              --iron-icon-width: 100% !important;
              --iron-icon-height: 100% !important;
            }
            #badges {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--primary-text-color);
            }
            .break-words {
              overflow-wrap: break-word;
            }
            .device-button {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              border-radius: var(--ha-card-border-radius, 4px);
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--primary-text-color);
            }
            @media (min-width: 1024px) {
              .device-button.current {
                background: transparent;
                z-index: 1;
                position: relative;
              }
              .device-button.current::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: .12;
                z-index: -1;
                background: var(--sidebar-selected-icon-color);
                border-radius: var(--ha-card-border-radius, 4px);
              }
            }
            /*styling tailwind dwains version*/
            *, ::after, ::before {
              box-sizing: border-box;
            }
            h1,h2,h3 {
              margin: 0;
            }
            h3 {
              font-size: 1em;
            }
            .absolute {
              position: absolute
            }
            .relative {
                position: relative
            }
            .sticky {
                position: -webkit-sticky;
                position: sticky
            }
            .top-0 {
                top: 0px
            }
            .bottom-0 {
                bottom: 0px
            }
            .z-30 {
                z-index: 7;
            }
            .col-span-1 {
                grid-column: span 1 / span 1
            }
            .col-span-2 {
                grid-column: span 2 / span 2
            }
            .row-span-1 {
                grid-row: span 1 / span 1
            }
            .row-span-2 {
                grid-row: span 2 / span 2
            }
            .my-4 {
                margin-top: 1rem;
                margin-bottom: 1rem
            }
            .mx-auto {
              margin-left: auto;
              margin-right: auto
            }
            .mb-2 {
                margin-bottom: 0.5rem
            }
            .mb-4 {
                margin-bottom: 1rem
            }
            .mt-4 {
                margin-top: 1rem
            }
            .mr-0\.5 {
                margin-right: 0.125rem
            }
            .mr-0 {
                margin-right: 0px
            }
            .mb-12 {
                margin-bottom: 3rem
            }
            .mb-5 {
                margin-bottom: 1.25rem
            }
            .mb-16 {
                margin-bottom: 4rem
            }
            .ml-4 {
                margin-left: 1rem
            }
            .block {
                display: block
            }
            .inline-block {
                display: inline-block
            }
            .flex {
                display: flex
            }
            .inline-flex {
                display: inline-flex
            }
            .grid {
                display: grid
            }
            .hidden {
                display: none
            }
            .h-6 {
                height: 1.5rem
            }
            .h-44 {
                height: 11rem
            }
            .h-full {
                height: 100%
            }
            .h-14 {
                height: 3.5rem
            }
            .h-8 {
                height: 2rem
            }
            .w-full {
                width: 100%
            }
            .w-6 {
                width: 1.5rem
            }
            .w-14 {
                width: 3.5rem
            }
            .w-8 {
                width: 2rem
            }
            .w-12 {
              width: 3rem
            }
            .cursor-pointer {
                cursor: pointer
            }
            .grid-flow-row-dense {
                grid-auto-flow: row dense
            }
            .grid-cols-1 {
                grid-template-columns: repeat(1, minmax(0, 1fr))
            }
            .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr))
            }
            .flex-wrap {
                flex-wrap: wrap
            }
            .content-between {
                align-content: space-between
            }
            .items-center {
                align-items: center
            }
            .justify-between {
                justify-content: space-between
            }
            .gap-4 {
                gap: 1rem
            }
            .space-y-0.5 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0.125rem * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0.125rem * var(--tw-space-y-reverse))
            }
            .space-y-0 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0px * var(--tw-space-y-reverse))
            }
            .rounded {
                border-radius: 0.25rem
            }
            .rounded-md {
                border-radius: 0.375rem
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .rounded-lg {
              border-radius: 0.5rem
            }
            .border-2 {
                border-width: 2px
            }
            .border-dashed {
                border-style: dashed
            }
            .border-gray-300 {
                --tw-border-opacity: 1;
                border-color: rgb(209 213 219 / var(--tw-border-opacity))
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .bg-opacity-50 {
                --tw-bg-opacity: 0.5
            }
            .p-2 {
              padding: 0.5rem;
            }
            .p-4 {
                padding: 1rem
            }
            .p-1 {
                padding: 0.25rem
            }
            .p-3 {
                padding: 0.75rem
            }
            .px-1 {
                padding-left: 0.25rem;
                padding-right: 0.25rem
            }
            .p-12 {
              padding: 3rem
            }
            .py-0\.5 {
                padding-top: 0.125rem;
                padding-bottom: 0.125rem
            }
            .py-0 {
                padding-top: 0px;
                padding-bottom: 0px
            }
            .text-center {
              text-align: center
            }
            .text-right {
                text-align: right
            }
            .text-xl {
                font-size: 1.5rem;
                line-height: 2rem
            }
            .text-lg {
                font-size: 1.125rem;
                line-height: 1.75rem
            }
            .text-sm {
                font-size: 0.875rem;
                line-height: 1.25rem
            }
            .text-xs {
                font-size: 0.75rem;
                line-height: 1rem
            }
            .font-semibold {
                font-weight: 600
            }
            .font-medium {
                font-weight: 500
            }
            .capitalize {
                text-transform: capitalize
            }
            .text-gray {
              color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
            }
            .text-white {
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity))
            }
            @media (min-width: 768px) {
                .md-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
            }
            @media (min-width: 1024px) {
                .lg-col-span-1 {
                    grid-column: span 1 / span 1
                }
                .lg-col-span-3 {
                    grid-column: span 3 / span 3
                }
                .lg-col-span-2 {
                    grid-column: span 2 / span 2
                }
                .lg-row-span-1 {
                    grid-row: span 1 / span 1
                }
                .lg-row-span-3 {
                    grid-row: span 3 / span 3
                }
                .lg-row-span-2 {
                    grid-row: span 2 / span 2
                }
                .lg-block {
                    display: block
                }
                .lg-hidden {
                    display: none
                }
                .lg-w-1-2 {
                    width: 50%
                }
                .lg-grid-cols-2 {
                    grid-template-columns: repeat(2, minmax(0, 1fr))
                }
                .lg-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
                .lg-grid-cols-4 {
                  grid-template-columns: repeat(4, minmax(0, 1fr))
                }
            }
            @media (min-width: 1536px) {
              .xl-col-span-1 {
                  grid-column: span 1 / span 1
              }
              .xl-col-span-4 {
                  grid-column: span 4 / span 4
              }
              .xl-col-span-2 {
                  grid-column: span 2 / span 2
              }
              .xl-row-span-1 {
                  grid-row: span 1 / span 1
              }
              .xl-row-span-4 {
                  grid-row: span 4 / span 4
              }
              .xl-row-span-2 {
                  grid-row: span 2 / span 2
              }
              .xl-w-1-3 {
                  width: 33.333333%
              }
              .xl-w-2-3 {
                  width: 66.666667%
              }
              .xl-grid-cols-4 {
                  grid-template-columns: repeat(4, minmax(0, 1fr))
              }
              .xl-grid-cols-5 {
                grid-template-columns: repeat(5, minmax(0, 1fr))
              }
          }
          `
        }


      }
      customElements.define("devices-card", DevicesCard);
