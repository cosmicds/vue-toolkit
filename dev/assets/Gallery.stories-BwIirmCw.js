import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{Z as t}from"./iframe-CxusJfWq.js";import{C as n,t as r}from"./src-4T9LCh-M.js";var i,a,o,s;function c(){return(c=e((()=>{r(),i=t(),a={component:n,tags:[`autodocs`],title:`Vue Toolkit/Components/Gallery`},o={render:e=>{let t=(0,i.engineStore)();return{components:{Gallery:n,WWTComponent:i.WWTComponent},template:`
        <div>
          <WWTComponent
            wwtNamespace="storybook"
            style="display: none"
          />
          <Gallery v-bind="args" :store="store" />
        </div>
      `,setup(){return{args:e,store:t}}}},args:{wtmlUrl:`https://raw.githubusercontent.com/johnarban/wwt_interactives/main/images/m101/gallery.wtml`,columns:2,width:`500px`,maxHeight:`500px`,title:`Example Gallery`,selectedColor:`#1E90FF`,singleSelect:!0,highlightLastOnly:!0,previewIndex:0,closedText:`Open the gallery!`}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: GalleryProps) => {
    const store = engineStore();
    return {
      components: {
        Gallery,
        WWTComponent
      },
      template: \`
        <div>
          <WWTComponent
            wwtNamespace="storybook"
            style="display: none"
          />
          <Gallery v-bind="args" :store="store" />
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
    wtmlUrl: "https://raw.githubusercontent.com/johnarban/wwt_interactives/main/images/m101/gallery.wtml",
    columns: 2,
    width: "500px",
    maxHeight: "500px",
    title: "Example Gallery",
    selectedColor: "#1E90FF",
    singleSelect: true,
    highlightLastOnly: true,
    previewIndex: 0,
    closedText: "Open the gallery!"
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Primary,s as __namedExportsOrder,a as default};