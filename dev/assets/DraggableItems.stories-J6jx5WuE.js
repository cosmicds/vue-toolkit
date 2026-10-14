import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{Ht as t,U as n}from"./iframe-BEG0g2NE.js";import{k as r,t as i}from"./src-DQgl8U7F.js";import"./stories-CbXhWL14.js";var a,o,s;function c(){return(c=e((()=>{n(),i(),a={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/Draggable Items`},o={render:e=>{let n=t([{name:`Item 1`,info:`This was originally the first item`},{name:`Item 2`,info:`This was originally the second item`},{name:`Item 3`,info:`This was originally the third item`}]),i=e=>e.name;return{components:{DraggableItems:r},template:`
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
      `,setup(){return{args:e,items:n,name:i}}}},args:{handleClass:`drag-example-handle`,containerClass:`drag-example-container`,rowClass:`item-row`,contentClass:`item-content`,accentColor:`dodgerblue`}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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