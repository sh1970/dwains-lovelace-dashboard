import { popUp } from "./dwains-popup";
import { fireEvent } from "./card-tools-compat";
import Cookies from 'js-cookie'
import {
  DOMAIN_ICONS,
 } from './variables'
import {
  computeDomain
} from './frontend-helpers';
import { mdiDotsVertical, mdiCog } from "@mdi/js";
import { css, html, LitElement } from 'lit';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import translateEngine from './translate-engine';
import { createCardElementSafe, resolveEntityName } from './helpers';
import {
  subtleBackButtonStyles,
  subtleDetailViewStyles,
  subtleDevicesPageStyles,
} from './styles/dwains-subtle-style';
const { EventSubscriptionOwner } = require('./event-subscription-owner');
const { EventListenerOwner } = require('./event-listener-owner');
const { TimerOwner } = require('./timer-owner');
const { PopupOpenScheduler } = require('./popup-open-scheduler');
const { ReloadableLoadOwner } = require('./reloadable-load-owner');
const { hassConnectionIdentity, hasHassConnectionChanged } = require('./hass-connection');
const { websocketReadStore } = require('./websocket-read-store');
const { loadDashboardRegistrySnapshot } = require('./dashboard-registry-snapshot');
const { registryOrderedEntityUnion } = require('./registry-indexes');
const { resolveHass } = require('./hass-provider');
const { loadCardHelpers } = require('./card-helpers-loader');
const { closeParentDropdown } = require('./dropdown-controller');
const { defineDwainsElement } = require('./custom-element-registration');
const { attachDeferredCard } = require('./deferred-card');
const {
  entityRecoveryActions,
  entitySettingsFromConfiguration,
} = require('./entity-settings-config');

function getDwainsHass() {
  return resolveHass();
}

const GLOBAL_DEVICE_PAGE_DOMAINS = new Set([
  'person',
  'weather',
  'alarm_control_panel',
]);

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

        constructor() {
          super();
          this._subscriptions = new EventSubscriptionOwner();
          this._listeners = new EventListenerOwner();
          this._timers = new TimerOwner();
          this._popupOpens = new PopupOpenScheduler(this._timers);
          this._loads = new ReloadableLoadOwner((context) => this._loadConfiguration(context));
          this._locationChangedHandler = () => this._syncSelectedDeviceFromLocation();
          this._listeners.listen(
            'location-changed',
            window,
            'location-changed',
            this._locationChangedHandler,
          );
          this._startedHass = undefined;
        }

	        async loadHelpers() {
	          return loadCardHelpers();
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
          const connectionChanged = hasHassConnectionChanged(this._hass, hass);
          this._hass = hass;
          if(this.startedUp){
            this._update_hass(hass);
          }
          if (connectionChanged && this.isConnected) {
            this._subscriptions.disconnect();
            this._subscriptions.connect();
          }
          void this._startIfReady(connectionChanged);
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

	          if(this.timeout) {
	            this._pendingHassUpdate = true;
	            return;
	          }
	          this.timeout = true;
	          this._pendingHassUpdate = false;
	          const timer = this._timers.schedule('hass-update-throttle', () => {
	            this.timeout = false;
	            if(this._pendingHassUpdate){
	              this._pendingHassUpdate = false;
	              this.requestUpdate();
	            }
	          }, 100);
	          if(timer === undefined){
	            this.timeout = false;
	            this._pendingHassUpdate = false;
	          }
	          this.requestUpdate();
	        }

        async setConfig(config) {
          this.startedUp = false;
          this.timeout = false;
          this._pendingHassUpdate = false;

	          if (!this._hass) this._hass = getDwainsHass();

          this.selectedDevice = window.location.hash.substring(1);
          this.deviceEditMode = false;
          this.deviceViewEditMode = false;
          this.deviceViewDisplayGrouped = Cookies.get('dwains_dashboard_deviceViewDisplayGrouped') ? (Cookies.get('dwains_dashboard_deviceViewDisplayGrouped') == "false" ? false : true) : false;
          this._config = config;

          this.notificationCard, this.weatherCard;

          this._cardHelpersReady = this.loadHelpers();
          this.cardHelpers = await this._cardHelpersReady;
          await this._startIfReady();
        }

        updated(changedProperties) {
          if(!changedProperties.has("state")) {
            this._syncSelectedDeviceFromLocation();
          }
        }

        _syncSelectedDeviceFromLocation() {
          const newstate = window.location.hash.substring(1);

          if (newstate){
            this.selectedDevice = newstate;
          } else {
            //The tab/page itself is clicked so fallback on first device button
            if(this.data != null && Object.keys(this.data).length != 0){
              this.selectedDevice = Object.values(this.data)[0]['domain'];
            }
          }
        }

	        async connectedCallback(){
	          //console.log('connectedCallBack');
	          super.connectedCallback();
	          this._subscriptions.connect();
	          this._timers.connect();
	          this._listeners.connect();

	          await this._startIfReady();
	        }

          async _startIfReady(reload = false) {
            const connection = hassConnectionIdentity(this._hass);
            if (!this.isConnected || !this._hass || !this._config || this._startedHass === connection) return;
            const hass = this._hass;
            this._startedHass = connection;
            try {
              if(this._cardHelpersReady){
                this.cardHelpers = await this._cardHelpersReady;
              }
              if (reload) await this._reloadCard();
              else await this._loadData();
              if (this.isConnected && hassConnectionIdentity(this._hass) === connection && this._startedHass === connection) {
                await this._subscribeReload();
              }
            } catch (error) {
              if (this._startedHass === connection) this._startedHass = undefined;
              console.error('Error starting devices page card:', error);
            }
          }

	        disconnectedCallback(){
	          super.disconnectedCallback();
	          this._subscriptions.disconnect();
	          this._timers.disconnect();
	          this._listeners.disconnect();
	          this._startedHass = undefined;
              this._loads.invalidate();
	          this.timeout = false;
	          this._pendingHassUpdate = false;
	        }

	        _subscribeReload(){
	          return this._subscriptions.subscribeEvent(
	            'devices-page',
	            this._hass,
	            "dwains_dashboard_devicespage_card_reload",
	            () => {
	              websocketReadStore.invalidate(this._hass);
	              this._reloadCard().catch((error) => {
	                console.error('Error reloading devices page card:', error);
	              });
	            },
	          );
	        }

        async _reloadCard(){
          await this._loads.reload();
          this.requestUpdate();
        }

	        _loadData(){
	          return this._loads.load();
	        }

	        async _loadConfiguration({ isCurrent = () => true } = {}){
	          this.selectedArea = this.selectedArea || "";
	          this.startedUp = false;

          const snapshot = await loadDashboardRegistrySnapshot(this._hass);
          if (!isCurrent()) return;
          Object.assign(this, snapshot);

          if(this.areas == null || this.areas.length === 0
          || this.devices == null || this.devices.length === 0
          || this.entities == null || this.entities.length === 0
          || this.configuration == null || this.configuration.length === 0
          ){
          } else {
            const data = [];
            const disabledDevices = [];

            const areaEntities = new Set();
            const globalAreaEntities = this.entities.filter((entity) => (
              GLOBAL_DEVICE_PAGE_DOMAINS.has(computeDomain(entity.entity_id))
            ));
            //Loop throught all areas to get all entities assigned to an area to populate the data group
            for(const area of this.areas){
              if(!(this.configuration['areas'][area.area_id] && this.configuration['areas'][area.area_id]['disabled'])){
                const areaDevices = new Set(
                  (this.devicesByAreaId.get(area.area_id) || []).map((device) => device.id),
                );
                const candidateEntities = registryOrderedEntityUnion([
                  this.entitiesByAreaId.get(area.area_id),
                  globalAreaEntities.filter((entry) => !areaEntities.has(entry.entity_id)),
                ], this.entityOrderById);

                // Find all entities directly linked to this area
                // or linked to a device linked to this area.
                for (const entity of candidateEntities) {
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
                          Object.entries(this.configuration.device_cards[domain]).forEach(([k,v]) => {
                            const rowSpan = v["row_span"] ? v["row_span"] : "1";
                            const colSpan = v["col_span"] ? v["col_span"] : "1";
                            const rowSpanLg = v["row_span_lg"] ? v["row_span_lg"] : "1";
                            const colSpanLg = v["col_span_lg"] ? v["col_span_lg"] : "1";
                            const rowSpanXl = v["row_span_xl"] ? v["row_span_xl"] : "1";
                            const colSpanXl = v["col_span_xl"] ? v["col_span_xl"] : "1";

                            if(v["position"] == 'bottom'){
                              deviceCustomCardsBottom.push(attachDeferredCard({
                                filename: k,
                                domain: domain,
                                rowSpan: rowSpan,
                                colSpan: colSpan,
                                rowSpanLg: rowSpanLg,
                                colSpanLg: colSpanLg,
                                rowSpanXl: rowSpanXl,
                                colSpanXl: colSpanXl,
                              }, () => this.createCardElement2(v)));
                            } else {
                              deviceCustomCardsTop.push(attachDeferredCard({
                                filename: k,
                                domain: domain,
                                rowSpan: rowSpan,
                                colSpan: colSpan,
                                rowSpanLg: rowSpanLg,
                                colSpanLg: colSpanLg,
                                rowSpanXl: rowSpanXl,
                                colSpanXl: colSpanXl,
                              }, () => this.createCardElement2(v)));
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

                      data[domain].cards.push(attachDeferredCard({
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
                        customCard: customCard,
                        customPopup: customPopup,
                        sort_order: (this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['devices_sort_order'] ? this.configuration['entities'][entity.entity_id]['devices_sort_order']: 99),
                        grouped_sort_order: (this.configuration['entities'][entity.entity_id] && this.configuration['entities'][entity.entity_id]['devices_grouped_sort_order'] ? this.configuration['entities'][entity.entity_id]['devices_grouped_sort_order']: 99),
                      }, () => this.createCardElement2(cardConfig)));
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

                if (!isCurrent()) return;
            this.data = sortedData;
            this.disabledDevices = disabledDevices;
            this.startedUp = true;

            //Set first selected device
            if(this.selectedDevice.length === 0){
              this.selectedDevice = Object.values(sortedData)[0]['domain'];
            }
          }
        }

        _handleDeviceClick(event){
          const id = event.currentTarget.dataset.device;
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
          closeParentDropdown(ev);
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
          closeParentDropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;
          const position = ev.currentTarget.position;

          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'device.add_card_to') + domain, {
              type: "custom:dwains-create-custom-card-card",
              domain: domain,
              position: position,
              page: "devices"
            }, true, '');
          });
        }

        _handleEntityEditClick(ev) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          const entity = ev.currentTarget.entity;
          const configured = entitySettingsFromConfiguration(this.configuration, entity);
          const settings = {};
          for (const key of Object.keys(configured)) {
            settings[key] = ev.currentTarget[key] ?? configured[key];
          }
          this._openEntitySettings(settings);
        }

        _handleUnavailableEntityEditClick(ev) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          this._openEntitySettings(
            entitySettingsFromConfiguration(this.configuration, ev.currentTarget.entity),
          );
        }

        _openEntitySettings(settings) {
          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'entity.edit_entity'), {
              type: "custom:dwains-edit-entity-card",
              ...settings,
            }, false, '');
          });
        }


        _handleEntityEditCardClick(ev) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          const entityId = ev.currentTarget.entity;

          let cardConfig, mode;
          if(this.configuration['entity_cards'] && this.configuration['entity_cards'][entityId]){
            //cardConfig = this.configuration['entity_cards'][entityId];
            const friendlyName = this._entityDisplayName(entityId);
            cardConfig = {input_name: friendlyName,input_entity: entityId,...this.configuration['entity_cards'][entityId]};
            mode = "editor-element";
          }

          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'entity.edit_entity_card'), {
              type: "custom:dwains-edit-entity-card-card",
              entity_id: entityId,
              cardConfig: cardConfig,
              mode: mode,
              existingCardEdit: cardConfig ? true : false,
            }, true, '');
          });
        }

        _handleEntityEditPopupClick(ev) {
          closeParentDropdown(ev);
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

          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'entity.edit_entity_popup_card'), {
              type: "custom:dwains-edit-entity-popup-card",
              entity_id: entityId,
              cardConfig: cardConfig,
              mode: mode,
              existingCardEdit: cardConfig ? true : false,
            }, true, '');
          });
        }

        _handleDeviceEditClick(ev) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          const device = ev.currentTarget.device;
          const icon = ev.currentTarget.device_icon;
          const showInNavbar = ev.currentTarget.showInNavbar;
          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'device.edit_device_button'), {
              type: "custom:dwains-edit-device-button-card",
              device: device,
              icon: icon,
              showInNavbar: showInNavbar,
            }, false, '');
          });
        }

        _handleCustomCardEditClick(ev){
          closeParentDropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;
          const filename = ev.currentTarget.filename;

          const colSpan = ev.currentTarget.colSpan;
          const rowSpan = ev.currentTarget.rowSpan;
          const colSpanLg = ev.currentTarget.colSpanLg;
          const rowSpanLg = ev.currentTarget.rowSpanLg;
          const colSpanXl = ev.currentTarget.colSpanXl;
          const rowSpanXl = ev.currentTarget.rowSpanXl;

          // Keep the shared configuration snapshot immutable while preparing
          // the editor-only card data.
          const cardConfig = structuredClone(
            this.configuration.device_cards[domain][filename],
          );
          let position = "top";
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

          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
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
          });
        }

        _saveEntityBoolValue(entityId, key, value) {
          return this._hass.callWS({
            type: 'dwains_dashboard/edit_entity_bool_value',
            entityId,
            key,
            value,
          }).catch((err) => {
            console.error('Failed to update entity setting:', err);
          });
        }
        _handleEntityEditBoolValueClick(ev) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          this._saveEntityBoolValue(
            ev.currentTarget.entity,
            ev.currentTarget.key,
            ev.currentTarget.value,
          );
        }
        _handleEntityAreaVisibilityClick(ev, entityId, value) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          this._saveEntityBoolValue(entityId, 'hidden_in_area', value);
        }

        _handleDeviceEditBoolValueClick(ev) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          const device = ev.currentTarget.device;
          const key = ev.currentTarget.key;
          const value = ev.currentTarget.value;

          this._hass.callWS({
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
          closeParentDropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;

          let cardConfig, mode;
          if(this.configuration['devices_card'] && this.configuration['devices_card'][domain]){
            cardConfig = this.configuration['devices_card'][domain];
            mode = 'current-selected-blueprint';
          }

          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'device.edit_device_card')+translateEngine(this._hass, 'device.'+domain), {
              type: "custom:dwains-edit-device-card-card",
              domain: domain,
              cardConfig: cardConfig,
              existingCardEdit: cardConfig ? true : false,
              mode: mode,
            }, true, '');
          });
        }

        _handleDeviceEditPopupClick(ev) {
          closeParentDropdown(ev);
          ev.stopPropagation();
          const domain = ev.currentTarget.domain;

          let cardConfig, mode;
          if(this.configuration['devices_popup'] && this.configuration['devices_popup'][domain]){
            cardConfig = this.configuration['devices_popup'][domain];
            mode = 'current-selected-blueprint';
          }

          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'device.edit_device_popup')+translateEngine(this._hass, 'device.'+domain), {
              type: "custom:dwains-edit-device-popup-card",
              domain: domain,
              cardConfig: cardConfig,
              existingCardEdit: cardConfig ? true : false,
              mode: mode,
            }, true, '');
          });
        }


        /**
         * Handle when area button is moved
         * @param {evt} evt
         */
        _deviceButtonMoved(evt){
          this._hass.callWS({
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
          closeParentDropdown(ev);
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
          closeParentDropdown(ev);
          ev.stopPropagation();
          const value = ev.currentTarget.value;

          if(value){
            this._sortable = [];
            const sortableElements = this.shadowRoot.querySelectorAll('.sortable');
            const cardHass = this._hass;
            for(let i=0; i<sortableElements.length; i++){
              const sortType = (this.deviceViewDisplayGrouped ? 'devices_grouped_sort_order' : 'devices_sort_order');
              this._sortable[i] = new Sortable(sortableElements[i], {
                  forceFallback: true,
                  animation: 150,
                  dataIdAttr: "data-entity",
                  handle: '.sortable-move',
                  onEnd: function(event){
                    cardHass.callWS({
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
      const deviceDomain = data.domain || "unknown";
      const deviceIcon = this.configuration['devices'][deviceDomain] && this.configuration['devices'][deviceDomain]['icon']
        ? this.configuration['devices'][deviceDomain]['icon']
        : (DOMAIN_ICONS[deviceDomain] ? DOMAIN_ICONS[deviceDomain] : DOMAIN_ICONS["unknown"]);
      return html`
        <div class="relative" data-device='${deviceDomain}'>
          <div
            class="flex justify-between h-44 p-3 device-button ${this.selectedDevice == deviceDomain && !this.configuration['homepage_header']['v2_mode'] ? 'current' : ''}"
            data-device=${deviceDomain}
            @click=${this._handleDeviceClick}
          >
            <div class="h-full flex flex-wrap content-between">
              <div class="w-full ha-icon">
                ${deviceIcon ? html`
                  <ha-icon
                    class="h-14 w-14"
                    style="color: var(--primary-color);"
                    .icon=${deviceIcon}
                  ></ha-icon>` : ""}
              </div>
              <div class="w-full">
                <h3 class="font-semibold text-lg capitalize">${translateEngine(this._hass, 'device.'+deviceDomain)}</h3>
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
                      .device=${deviceDomain}
                      .device_icon=${deviceIcon}
                      .showInNavbar=${this.configuration['devices'][deviceDomain] && this.configuration['devices'][deviceDomain]['show_in_navbar'] ? this.configuration['devices'][deviceDomain]['show_in_navbar'] : ""}
                      @click=${this._handleDeviceEditClick}
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:cog"}></ha-icon>
                          </div>
                          ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                        </ha-list-item>

                        <ha-list-item
                          graphic="icon"
                      .domain=${deviceDomain}
                      @click="${this._handleDeviceEditCardClick}"
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:pencil"}></ha-icon>
                          </div>
                          ${translateEngine(this._hass, 'entity.entity_card')}
                        </ha-list-item>
                        <ha-list-item
                          graphic="icon"
                      .domain=${deviceDomain}
                      @click="${this._handleDeviceEditPopupClick}"
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:pencil-box-multiple"}></ha-icon>
                          </div>
                          ${translateEngine(this._hass, 'entity.popup_card')}
                        </ha-list-item>
                        <ha-list-item
                          graphic="icon"
                      .device=${deviceDomain}
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
	            cards.sort(function (x, y) {
              let a = x.grouped_sort_order,
                  b = y.grouped_sort_order;
              return a == b ? 0 : a > b ? 1 : -1;
            });

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
        _renderEntityAreaVisibilityAction(entity) {
          const hiddenInArea = this.configuration?.entities?.[entity]?.hidden_in_area === true;
          return html`
            <ha-list-item
              graphic="icon"
              @click=${(ev) => this._handleEntityAreaVisibilityClick(
                ev,
                entity,
                !hiddenInArea,
              )}
            >
              <div slot="graphic">
                <ha-icon .icon=${hiddenInArea ? "mdi:eye" : "mdi:eye-off"}></ha-icon>
              </div>
              ${translateEngine(
                this._hass,
                hiddenInArea ? 'entity.unhide_in_area' : 'entity.hide_in_area',
              )}
            </ha-list-item>
          `;
        }

        _renderDeviceViewCard(data){
          return html`
          <div
            data-entity='${data.entity}'
            class="col-span-${data.colSpan} row-span-${data.rowSpan} lg-col-span-${data.colSpanLg} lg-row-span-${data.rowSpanLg} xl-col-span-${data.colSpanXl} xl-row-span-${data.rowSpanXl} relative"
          >
	            <div>
	              <span class="hidden">${translateEngine(this._hass, 'device.'+data.domain)}<br></span>
	              <dd-lazy-card .card=${data.card} .cardFactory=${data.cardFactory} .hass=${this._hass}></dd-lazy-card>
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
                    ${this._renderEntityAreaVisibilityAction(data.entity)}
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
	              <dd-lazy-card .card=${data.card} .cardFactory=${data.cardFactory} .hass=${this._hass}></dd-lazy-card>
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
          closeParentDropdown(ev);
          ev.stopPropagation();

          const value = ev.currentTarget.value;
          this.deviceViewDisplayGrouped = value;
          Cookies.set('dwains_dashboard_deviceViewDisplayGrouped', value, { expires: 365 });
        }
        _renderAreaViewEntityCard(entity, type) {
          const recoveryActions = entityRecoveryActions(
            this.configuration,
            entity,
            type,
          );
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
                  ${recoveryActions.map((action) => html`
                    <ha-button
                      .entity="${entity}"
                      .key=${action.key}
                      .value=${false}
                      @click=${this._handleEntityEditBoolValueClick}
                    >
                      ${translateEngine(this._hass, action.translationKey)}
                    </ha-button>
                  `)}
                  <ha-button
                    .entity="${entity}"
                    @click=${this._handleUnavailableEntityEditClick}
                  >
                    <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                    ${translateEngine(this._hass, 'entity.settings')}
                  </ha-button>
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
                <div class="dd-detail-view-header flex justify-between">
                  <div class="dd-detail-view-title">
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
                <div class="flex flex-wrap dd-dashboard-style-refresh">
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

                      <div class="grid grid-cols-2 dd-overview-grid md-grid-cols-3 ${this.configuration['homepage_header']['v2_mode'] ? "lg-grid-cols-4 xl-grid-cols-5" : ""} gap-4" id="sortable">
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
        return [css`
            :host {
              display: block;
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            .dd-overview-grid {
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            @media (max-width: 599px) {
              .w-full {
                box-sizing: border-box;
                max-width: 100%;
              }
              .grid.dd-overview-grid > * {
                min-width: 0;
                max-width: 100%;
              }
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
          `, subtleBackButtonStyles(css), subtleDevicesPageStyles(css), subtleDetailViewStyles(css)]
        }


      }
      defineDwainsElement("devices-card", DevicesCard);
