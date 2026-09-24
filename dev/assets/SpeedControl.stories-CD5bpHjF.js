import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{V as t}from"./iframe-CJMc2dwZ.js";import{o as n,t as r}from"./src-DkA5kPPk.js";import"./stories-CbXhWL14.js";var i,a,o,s;function c(){return(c=e((()=>{i=t(),r(),a={component:n,tags:[`autodocs`],title:`Vue Toolkit/Components/Speed Control`},o={render:e=>{let t=(0,i.engineStore)();return t.waitForReady().then(()=>{t.applySetting([`localHorizonMode`,!0])}),{components:{SpeedControl:n,WWTComponent:i.WWTComponent},template:`
        <div style="width: 900px; height: 400px">
          <WWTComponent
            :wwtNamespace="storybook"
          />
          <SpeedControl v-bind="args" :store="store" />
        </div>
      `,setup(){return{args:e,store:t}}}},args:{color:`white`,maxSpeed:1e4,defaultRate:1,useInline:!1,showStatus:!1,rateDelta:10,modelValue:!1,hideMoreControls:!1}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: SpeedControlProps) => {
    const store = engineStore();
    store.waitForReady().then(() => {
      store.applySetting(["localHorizonMode", true]);
    });
    return {
      components: {
        SpeedControl,
        WWTComponent
      },
      template: \`
        <div style="width: 900px; height: 400px">
          <WWTComponent
            :wwtNamespace="storybook"
          />
          <SpeedControl v-bind="args" :store="store" />
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
    color: "white",
    maxSpeed: 10000,
    defaultRate: 1,
    useInline: false,
    showStatus: false,
    rateDelta: 10,
    modelValue: false,
    hideMoreControls: false
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Primary,s as __namedExportsOrder,a as default};