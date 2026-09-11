import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{V as t}from"./iframe-CrqoIeJO.js";import{n,t as r}from"./src-BuFFhN8t.js";import"./stories-CbXhWL14.js";var i,a,o,s;function c(){return(c=e((()=>{i=t(),r(),a={component:n,tags:[`autodocs`],title:`Vue Toolkit/Components/WWT HUD`},o={render:e=>{let t=(0,i.engineStore)();return{components:{WwtHud:n,WWTComponent:i.WWTComponent},template:`
        <div style="width: 1000px; height: 500px; position: relative;">
          <WwtHud v-bind="args" :store="store" />
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      `,setup(){return{args:e,store:t}}}},args:{location:{top:`25%`,left:`25%`},otherVariables:{},fontSize:`10pt`,backgroundColor:`rgba(0, 0, 0, 0.5)`,textShadow:null}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: WwtHUDProps) => {
    const store = engineStore();
    return {
      components: {
        WwtHud,
        WWTComponent
      },
      template: \`
        <div style="width: 1000px; height: 500px; position: relative;">
          <WwtHud v-bind="args" :store="store" />
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      \`,
      setup() {
        return {
          args,
          store
        };
      }
    };
  },
  args: {
    location: {
      top: "25%",
      left: "25%"
    },
    otherVariables: {},
    fontSize: "10pt",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textShadow: null
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Primary,s as __namedExportsOrder,a as default};