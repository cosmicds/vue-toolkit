import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{Ot as t,U as n}from"./iframe-CrqoIeJO.js";import{f as r,g as i,m as a,t as o}from"./src-BuFFhN8t.js";import"./stories-CbXhWL14.js";var s,c,l;function u(){return(u=e((()=>{n(),o(),s={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/Location Search`},c={render:e=>{let n=t(!0);return{components:{LocationSearch:r},template:`
        <div style="width: 900px; height: 400px">
          <LocationSearch
            v-bind="args"
            v-model="open"
            @set-location="(loc) => {
              $el.querySelector('#selected-location').innerHTML = textForMapboxFeature(loc);
            }"
          />
          <hr style="margin: 30px">
          <div>The last selected location is <span id="selected-location">none</span></div>
        </div>
      `,setup(){return{args:e,open:n,textForMapboxFeature:i}}}},args:{searchProvider:e=>a(e,{access_token:`pk.eyJ1IjoiY29zbWljZHMiLCJhIjoiY203a3NucWhuMDQxbTJyb2VhYXdud3c4cCJ9.hnOaDl_oid357PV1TJnb3w`}),stayOpen:!0,accentColor:`orange`,bgColor:`black`,buttonSize:`1x`,small:!1}},l=[`Primary`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (args: LocationSearchProps) => {
    const open = ref(true);
    return {
      components: {
        LocationSearch
      },
      template: \`
        <div style="width: 900px; height: 400px">
          <LocationSearch
            v-bind="args"
            v-model="open"
            @set-location="(loc) => {
              $el.querySelector('#selected-location').innerHTML = textForMapboxFeature(loc);
            }"
          />
          <hr style="margin: 30px">
          <div>The last selected location is <span id="selected-location">none</span></div>
        </div>
      \`,
      setup() {
        return {
          args,
          open,
          textForMapboxFeature
        };
      }
    };
  },
  args: {
    searchProvider: (searchText: string) => geocodingInfoForSearch(searchText, {
      access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ?? ""
    }),
    stayOpen: true,
    accentColor: "orange",
    bgColor: "black",
    buttonSize: "1x",
    small: false
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as Primary,l as __namedExportsOrder,s as default};