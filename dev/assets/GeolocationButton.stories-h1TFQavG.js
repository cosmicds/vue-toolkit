import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{Ot as t,U as n}from"./iframe-CJMc2dwZ.js";import{t as r,y as i}from"./src-DkA5kPPk.js";import"./stories-CbXhWL14.js";var a,o,s;function c(){return(c=e((()=>{n(),r(),a={component:i,tags:[`autodocs`],title:`Vue Toolkit/Components/Geolocation Button`},o={render:e=>{let n=t(null),r=t(null);function a(e){alert(e.message)}return{components:{GeolocationButton:i},template:`
        <div style="width: 900px; height: 500px; display: flex; flex-direction: column; gap: 10px;">
          <div>
            <GeolocationButton
              v-bind="args"
              @permission="perm => permission = perm"
              @geolocation="location => geolocation = location"
              @error="showError"
            />
          </div>
          <div v-if="permission != null">Permission: {{ permission }}</div>
          <div v-if="geolocation != null">
            <p><strong>Location</strong></p>
            <p>Longitude: {{ geolocation.longitude }}</p>
            <p>Latitude: {{ geolocation.latitude }}</p>
            <p>Accuracy: {{ geolocation.accuracy }}</p>
          </div>
        </div>
      `,setup(){return{args:e,geolocation:n,permission:r,showError:a}}}},args:{color:`black`,size:`medium`,density:`comfortable`,elevation:`2`,hideButton:!1,showTextLabel:!1,showCoords:!1,showTextProgress:!1,showProgressCircle:!0,useTextButton:!1,progressCircleSize:12,label:`My Location`,id:`geolocation-button`,trueIcon:`mdi-crosshairs-gps`,falseIcon:`mdi-crosshairs`,showPermissions:!1}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: GeolocationButtonProps) => {
    const geolocation = ref<PositionCoords | null>(null);
    const permission = ref<string | null>(null);
    function showError(error: Error) {
      alert(error.message);
    }
    return {
      components: {
        GeolocationButton
      },
      template: \`
        <div style="width: 900px; height: 500px; display: flex; flex-direction: column; gap: 10px;">
          <div>
            <GeolocationButton
              v-bind="args"
              @permission="perm => permission = perm"
              @geolocation="location => geolocation = location"
              @error="showError"
            />
          </div>
          <div v-if="permission != null">Permission: {{ permission }}</div>
          <div v-if="geolocation != null">
            <p><strong>Location</strong></p>
            <p>Longitude: {{ geolocation.longitude }}</p>
            <p>Latitude: {{ geolocation.latitude }}</p>
            <p>Accuracy: {{ geolocation.accuracy }}</p>
          </div>
        </div>
      \`,
      setup() {
        return {
          args,
          geolocation,
          permission,
          showError
        };
      }
    };
  },
  args: {
    color: "black",
    size: "medium",
    density: "comfortable",
    elevation: "2",
    hideButton: false,
    showTextLabel: false,
    showCoords: false,
    showTextProgress: false,
    showProgressCircle: true,
    useTextButton: false,
    progressCircleSize: 12,
    label: "My Location",
    id: "geolocation-button",
    trueIcon: "mdi-crosshairs-gps",
    falseIcon: "mdi-crosshairs",
    showPermissions: false
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Primary,s as __namedExportsOrder,a as default};