import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{Z as t}from"./iframe-BcESEZDK.js";import{W as n,o as r,t as i}from"./src-BrdnvkNo.js";import{t as a}from"./utils-PhWYdMhN.js";import"./stories-D9XC7Zl1.js";var o,s,c,l;function u(){return(u=e((()=>{o=t(),i(),s={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/Tour Sheet`},c={render:e=>{let t=(0,o.engineStore)(),i=n({steps:[{id:`andromeda`,title:`Andromeda Galaxy`,text:[`Here is the Andromeda Galaxy`,`It's the closest galaxy to the Milky Way!`],setup:async()=>{t.waitForReady().then(()=>{t.gotoRADecZoom({raRad:10.68471*a,decRad:41.26917*a,zoomDeg:10,instant:!0})})},otherProperty:`andromeda`},{id:`crab`,title:`Crab Nebula`,text:[`Here's the Crab Nebula!`],setup:async()=>{t.waitForReady().then(()=>{t.gotoRADecZoom({raRad:83.6331*a,decRad:22.0145*a,zoomDeg:1,instant:!0})})},otherProperty:`crab`},{id:`milky-way`,title:`Milky Way`,text:[`Here's the Milky Way`,`That's where we live!`],setup:async()=>{t.waitForReady().then(()=>{t.gotoRADecZoom({raRad:266.416833*a,decRad:-29.007806*a,zoomDeg:360,instant:!0})})},otherProperty:`milky way`},{id:`end`,title:`The End`,text:[`That's all folks!`],otherProperty:`end`}],autostart:!0});return{components:{TourSheet:r,WWTComponent:o.WWTComponent},template:`
        <div style="width: 800; height: 600px; position: relative;">
          <TourSheet
            v-bind="args" 
            :tour="tour" 
          />
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      `,setup(){return{args:e,store:t,tour:i}}}},args:{smallSize:!1,accentColor:`#b22222`,borderColor:`gray`}},l=[`Primary`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (args: unknown) => {
    const store = engineStore();
    const tour = useTour<StepContent>({
      steps: [{
        id: "andromeda",
        title: "Andromeda Galaxy",
        text: ["Here is the Andromeda Galaxy", "It's the closest galaxy to the Milky Way!"],
        setup: async () => {
          store.waitForReady().then(() => {
            store.gotoRADecZoom({
              raRad: 10.68471 * D2R,
              decRad: 41.26917 * D2R,
              zoomDeg: 10,
              instant: true
            });
          });
        },
        otherProperty: "andromeda"
      }, {
        id: "crab",
        title: "Crab Nebula",
        text: ["Here's the Crab Nebula!"],
        setup: async () => {
          store.waitForReady().then(() => {
            store.gotoRADecZoom({
              raRad: 83.6331 * D2R,
              decRad: 22.0145 * D2R,
              zoomDeg: 1,
              instant: true
            });
          });
        },
        otherProperty: "crab"
      }, {
        id: "milky-way",
        title: "Milky Way",
        text: ["Here's the Milky Way", "That's where we live!"],
        setup: async () => {
          store.waitForReady().then(() => {
            store.gotoRADecZoom({
              raRad: 266.416833 * D2R,
              decRad: -29.007806 * D2R,
              zoomDeg: 360,
              instant: true
            });
          });
        },
        otherProperty: "milky way"
      }, {
        id: "end",
        title: "The End",
        text: ["That's all folks!"],
        otherProperty: "end"
      }],
      autostart: true
    });
    return {
      components: {
        TourSheet,
        WWTComponent
      },
      template: \`
        <div style="width: 800; height: 600px; position: relative;">
          <TourSheet
            v-bind="args" 
            :tour="tour" 
          />
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      \`,
      setup() {
        return {
          args,
          store,
          tour
        };
      }
    };
  },
  args: {
    smallSize: false,
    accentColor: "#b22222",
    borderColor: "gray"
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as Primary,l as __namedExportsOrder,s as default};