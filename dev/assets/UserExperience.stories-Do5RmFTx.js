import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{i as t,r as n}from"./iframe-BKTmZW5n.js";import{i as r,t as i}from"./src-boYG4x6h.js";function a(){s({group:`rating-submission`,type:`success`,text:`Successful feedback message!`,duration:4500})}var o,s,c,l;function u(){return(u=e((()=>{i(),n(),o={component:r,tags:[`autodocs`],title:`Vue Toolkit/Components/User Experience`},{notify:s}=t(),c={render:e=>({components:{UserExperience:r},template:`
        <div>
          <UserExperience
            v-bind="args"
            @submit="submitHandler"
          />
          <notifications
            group="rating-submission"
            position="center bottom"
            :max="3"
          />
        </div>
      `,setup(){return{args:e,submitHandler:a}}}),args:{baseColor:`black`}},l=[`Primary`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: (args: UserExperienceProps) => {
    return {
      components: {
        UserExperience
      },
      template: \`
        <div>
          <UserExperience
            v-bind="args"
            @submit="submitHandler"
          />
          <notifications
            group="rating-submission"
            position="center bottom"
            :max="3"
          />
        </div>
      \`,
      setup() {
        return {
          args,
          submitHandler
        };
      }
    };
  },
  args: {
    baseColor: "black"
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as Primary,l as __namedExportsOrder,o as default};