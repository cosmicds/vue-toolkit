import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{$ as t,Zt as n}from"./iframe-Dj69Lb3N.js";import{k as r,t as i}from"./src-P9aMYYhA.js";import"./stories-D9XC7Zl1.js";var a,o,s;function c(){return(c=e((()=>{t(),i(),a={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/Draggable Items`},o={render:e=>{let t=n([{name:`Item 1`,info:`This was originally the first item`},{name:`Item 2`,info:`This was originally the second item`},{name:`Item 3`,info:`This was originally the third item`}]),i=e=>e.name;return{components:{DraggableItems:r},template:`
        <DraggableItems
          v-bind="args"
          v-model="items"
          :itemName="name"
          :itemKey="name"
        >
          <template #item="{ item }">
            <div class="draggable-item">
              <h3>{{ item.name }}</h3>
              <p>{{ item.info }}</p>
            </div>
          </template>
        </DraggableItems>
      `,setup(){return{args:e,items:t,name:i}}}},args:{handleClass:`drag-example-handle`,containerClass:`drag-example-container`,rowClass:`item-row`,contentClass:`item-content`,accentColor:`dodgerblue`}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: unknown) => {
    const items = ref<DraggableItem[]>([{
      name: "Item 1",
      info: "This was originally the first item"
    }, {
      name: "Item 2",
      info: "This was originally the second item"
    }, {
      name: "Item 3",
      info: "This was originally the third item"
    }]);
    const name = (item: DraggableItem) => item.name;
    return {
      components: {
        DraggableItems: DraggableItems as Component
      },
      template: \`
        <DraggableItems
          v-bind="args"
          v-model="items"
          :itemName="name"
          :itemKey="name"
        >
          <template #item="{ item }">
            <div class="draggable-item">
              <h3>{{ item.name }}</h3>
              <p>{{ item.info }}</p>
            </div>
          </template>
        </DraggableItems>
      \`,
      setup() {
        return {
          args,
          items,
          name
        };
      }
    };
  },
  args: {
    handleClass: "drag-example-handle",
    containerClass: "drag-example-container",
    rowClass: "item-row",
    contentClass: "item-content",
    accentColor: "dodgerblue"
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Primary,s as __namedExportsOrder,a as default};