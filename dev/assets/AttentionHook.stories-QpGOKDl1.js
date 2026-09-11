import{n as e}from"./rolldown-runtime-C0FnF6B9.js";import{Ot as t,U as n,n as r,r as i}from"./iframe-BKTmZW5n.js";import{i as a,j as o,t as s}from"./src-boYG4x6h.js";function c(){r({group:`rating-submission`,type:`success`,text:`Successful feedback message!`,duration:4500})}var l,u,d,f,p,m;function h(){return(h=e((()=>{s(),n(),i(),l={component:o,tags:[`autodocs`],title:`Vue Toolkit/Components/Attention Hook`},u={render:e=>({components:{AttentionHook:o},template:`
        <div>
          <AttentionHook v-bind="args">
          </AttentionHook>
        </div>
      `,setup(){return{args:e}}}),args:{visible:!0,bounceAmount:`10%`,bounceDuration:500,betweenBouncesDuration:1e3,popupTime:500}},d=t(!0),f=t(!1),p={render:e=>({components:{AttentionHook:o,UserExperience:a},template:`
        <div>
          <AttentionHook
            v-bind="args"
            v-if="showHook"
            @open="() => {
              showHook = false;
              showExperience = true;
            }"
          >
          </AttentionHook>
          <UserExperience
            v-show="showExperience" 
            style="position: absolute; bottom: 10px;"
            v-bind="args"
            @submit="submitHandler"
          >
          </UserExperience>
          <notifications group="rating-submission" position="center bottom" classes="rating-notification"/>
        </div>
      `,setup(){return{args:e,showHook:d,showExperience:f,submitHandler:c}}}),args:{visible:!0,bounceAmount:`10%`,bounceDuration:500,betweenBouncesDuration:1e3,bounceCount:1/0,popupTime:500}},m=[`Primary`,`WithUserExperience`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    return {
      components: {
        AttentionHook
      },
      template: \`
        <div>
          <AttentionHook v-bind="args">
          </AttentionHook>
        </div>
      \`,
      setup() {
        return {
          args
        };
      }
    };
  },
  args: {
    visible: true,
    bounceAmount: "10%",
    bounceDuration: 500,
    betweenBouncesDuration: 1000,
    popupTime: 500
  }
}`,...u.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    return {
      components: {
        AttentionHook,
        UserExperience
      },
      template: \`
        <div>
          <AttentionHook
            v-bind="args"
            v-if="showHook"
            @open="() => {
              showHook = false;
              showExperience = true;
            }"
          >
          </AttentionHook>
          <UserExperience
            v-show="showExperience" 
            style="position: absolute; bottom: 10px;"
            v-bind="args"
            @submit="submitHandler"
          >
          </UserExperience>
          <notifications group="rating-submission" position="center bottom" classes="rating-notification"/>
        </div>
      \`,
      setup() {
        return {
          args,
          showHook,
          showExperience,
          submitHandler
        };
      }
    };
  },
  args: {
    visible: true,
    bounceAmount: "10%",
    bounceDuration: 500,
    betweenBouncesDuration: 1000,
    bounceCount: Infinity,
    popupTime: 500
  }
}`,...p.parameters?.docs?.source}}}})))()}h();export{u as Primary,p as WithUserExperience,m as __namedExportsOrder,l as default};