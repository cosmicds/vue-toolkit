import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{Ot as t,U as n}from"./iframe-CJMc2dwZ.js";import{t as r,u as i}from"./src-DkA5kPPk.js";var a,o,s;function c(){return(c=e((()=>{r(),n(),a={component:i,tags:[`autodocs`],title:`Vue Toolkit/Components/Location Selector`},o={render:e=>{let n=t({latitudeDeg:42.3814,longitudeDeg:-71.1281});return{components:{LocationSelector:i},template:`
        <div style="width: 900px; height: 500px">
          <LocationSelector
            style="width: 300px; height: 400px; margin: auto;"
            v-bind="args"
            v-model="location"
          />
          <hr style="margin: 30px">
          <div style="width: 100%; text-align: center;">The last selected coordinates are latitude {{ location.latitudeDeg }}, longitude {{ location.longitudeDeg }}</div>
        </div>
        `,setup(){return{args:e,location:n}}}},decorators:[()=>({template:`<div style="display: flex; justify-content: center"><story /></div>`})],args:{activatorColor:`#ffffff`,detectLocation:!0,mapOptions:{templateUrl:`https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}`,minZoom:1,maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy <a href="https://www.google.com/maps">Google Maps</a>`,className:`map-tiles`},places:[],placeCircleOptions:{color:`#0000FF`,fillColor:`#3333FF`,fillOpacity:.5,radius:150},placeSelectable:!0,selectable:!0,selectedCircleOptions:{color:`#FF0000`,fillColor:`#FF0033`,fillOpacity:.5,radius:200},selectionEvent:`click`,worldRadii:!0,geoJsonFiles:[],layers:[]}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: LocationSelectorProps) => {
    // Default location is Harvard College Observatory
    const location = ref({
      latitudeDeg: 42.3814,
      longitudeDeg: -71.1281
    });
    return {
      components: {
        LocationSelector
      },
      template: \`
        <div style="width: 900px; height: 500px">
          <LocationSelector
            style="width: 300px; height: 400px; margin: auto;"
            v-bind="args"
            v-model="location"
          />
          <hr style="margin: 30px">
          <div style="width: 100%; text-align: center;">The last selected coordinates are latitude {{ location.latitudeDeg }}, longitude {{ location.longitudeDeg }}</div>
        </div>
        \`,
      setup() {
        return {
          args,
          location
        };
      }
    };
  },
  decorators: [() => {
    return {
      template: \`<div style="display: flex; justify-content: center"><story /></div>\`
    };
  }],
  args: {
    activatorColor: "#ffffff",
    detectLocation: true,
    mapOptions: {
      templateUrl: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      minZoom: 1,
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: \`&copy <a href="https://www.google.com/maps">Google Maps</a>\`,
      className: 'map-tiles'
    },
    places: [],
    placeCircleOptions: {
      color: "#0000FF",
      fillColor: "#3333FF",
      fillOpacity: 0.5,
      radius: 150
    },
    placeSelectable: true,
    selectable: true,
    selectedCircleOptions: {
      color: "#FF0000",
      fillColor: "#FF0033",
      fillOpacity: 0.5,
      radius: 200
    },
    selectionEvent: "click",
    worldRadii: true,
    geoJsonFiles: [],
    layers: []
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Primary,s as __namedExportsOrder,a as default};