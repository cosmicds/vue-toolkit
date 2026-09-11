import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{H as t,V as n}from"./iframe-CrqoIeJO.js";import{T as r,t as i}from"./src-BuFFhN8t.js";import"./stories-CbXhWL14.js";var a,o,s,c,l;function u(){return(u=e((()=>{i(),a=t(),o=n(),s={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/Folder View`},c={render:e=>{let t=(0,o.engineStore)();return{components:{FolderView:r,WWTComponent:o.WWTComponent},template:`
        <div style="width: 1000px; height: 500px; position: relative;">
          <div style="height: fit-content;">
            <FolderView
              v-bind="args"
              @select="({ item, type }) => { if (item instanceof Place) { store.gotoTarget({ place: item }); } }"
            />
          </div>
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      `,setup(){return{args:e,store:t,Place:a.Place}}}},args:{orientation:`row`,gap:`10px`,backgroundColor:`black`,thumbnailColor:`black`,highlightColor:`dodgerblue`,textColor:`white`,startExpanded:!0,lazy:!0,filter:e=>e instanceof a.Place||e instanceof a.Folder||e instanceof a.FolderUp,rootUrl:`https://cdn.worldwidetelescope.org/wwtweb/catalog.aspx?W=explorerootweb`}},l=[`Primary`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (args: FolderViewProps) => {
    const store = engineStore();
    return {
      components: {
        FolderView,
        WWTComponent
      },
      template: \`
        <div style="width: 1000px; height: 500px; position: relative;">
          <div style="height: fit-content;">
            <FolderView
              v-bind="args"
              @select="({ item, type }) => { if (item instanceof Place) { store.gotoTarget({ place: item }); } }"
            />
          </div>
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      \`,
      setup() {
        return {
          args,
          store,
          Place
        };
      }
    };
  },
  args: {
    orientation: "row",
    gap: "10px",
    backgroundColor: "black",
    thumbnailColor: "black",
    highlightColor: "dodgerblue",
    textColor: "white",
    startExpanded: true,
    lazy: true,
    filter: (item: Thumbnail) => item instanceof Place || item instanceof Folder || item instanceof FolderUp,
    rootUrl: "https://cdn.worldwidetelescope.org/wwtweb/catalog.aspx?W=explorerootweb"
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as Primary,l as __namedExportsOrder,s as default};