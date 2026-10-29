import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{$ as t,Zt as n}from"./iframe-Dj69Lb3N.js";import{F as r,t as i}from"./src-P9aMYYhA.js";import"./stories-D9XC7Zl1.js";function a(){let e=[],t=new Date;t.setHours(0,0,0,0);let n=new Date(t);for(n.setFullYear(n.getFullYear()-1);n<=t;)e.push(new Date(n)),n.setDate(n.getDate()+1);return e}var o,s,c;function l(){return(l=e((()=>{t(),i(),o={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/Calendar Picker`},s={render:e=>{let t=n(new Date);function i(e){e!==null&&t.value.getTime()!==e.getTime()&&(t.value=e)}return{components:{CalendarPicker:r},template:`
        <div style="display: flex; justify-content: center;">
          <CalendarPicker
            v-bind="args"
            :model-value="date"
            @latest="d => date = d"
            @internal-model-change="handleModelChange"
          />
        </div>
      `,setup(){return{args:e,date:t,handleModelChange:i}}}},args:{allowedDates:a(),sixWeeks:!0}},c=[`Primary`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: (args: CalendarPickerProps) => {
    const date = ref(new Date());
    function handleModelChange(d: Date | null) {
      if (d !== null && date.value.getTime() !== d.getTime()) {
        date.value = d;
      }
    }
    return {
      components: {
        CalendarPicker
      },
      template: \`
        <div style="display: flex; justify-content: center;">
          <CalendarPicker
            v-bind="args"
            :model-value="date"
            @latest="d => date = d"
            @internal-model-change="handleModelChange"
          />
        </div>
      \`,
      setup() {
        return {
          args,
          date,
          handleModelChange
        };
      }
    };
  },
  args: {
    allowedDates: getDatesFromLastYear(),
    sixWeeks: true
  }
}`,...s.parameters?.docs?.source}}}})))()}l();export{s as Primary,c as __namedExportsOrder,o as default};