import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{Ot as t,U as n}from"./iframe-Cgm4K3Sb.js";import{D as r,t as i}from"./src-DdckekZ8.js";var a,o,s;function c(){return(c=e((()=>{i(),n(),a={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/Datetime Picker`},o={render:e=>{let n=t(new Date);return{components:{DateTimePicker:r},template:`
        <div style="width: 900px; height: 400px">
          <DateTimePicker
            v-bind="args"
            v-model="date"
          />
          <hr style="margin: 30px">
          <div>The currently selected time is <span id="current-datetime">{{ date.toLocaleString() }}</span></div>
        </div>
      `,setup(){return{args:e,date:n}}}},args:{debug:!1,useAmPm:!0,editableTime:!0,accentColor:`#f4ba3e`}},s=[`Primary`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: DateTimePickerProps) => {
    const date = ref(new Date());
    return {
      components: {
        DateTimePicker
      },
      template: \`
        <div style="width: 900px; height: 400px">
          <DateTimePicker
            v-bind="args"
            v-model="date"
          />
          <hr style="margin: 30px">
          <div>The currently selected time is <span id="current-datetime">{{ date.toLocaleString() }}</span></div>
        </div>
      \`,
      setup() {
        return {
          args,
          date
        };
      }
    };
  },
  args: {
    debug: false,
    useAmPm: true,
    editableTime: true,
    accentColor: "#f4ba3e"
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{o as Primary,s as __namedExportsOrder,a as default};