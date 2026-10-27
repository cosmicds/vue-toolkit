import{n as e}from"./rolldown-runtime-BCiCTKAo.js";import{$ as t,Zt as n,n as r,r as i}from"./iframe-B9KtjTeL.js";import{L as a,i as o,t as s}from"./src-BuT-WUhB.js";function c(){r({group:`rating-submission`,type:`success`,text:`Successful feedback message!`,duration:4500})}var l,u,d,f,p,m;function h(){return(h=e((()=>{s(),t(),i(),l={component:a,tags:[`autodocs`],title:`Vue Toolkit/Components/Attention Hook`},u={render:e=>({components:{AttentionHook:a},template:`
        <div>
          <AttentionHook v-bind="args">
          </AttentionHook>
        </div>
      `,setup(){return{args:e}}}),args:{visible:!0,bounceAmount:`10%`,bounceDuration:500,betweenBouncesDuration:1e3,popupTime:500}},d=n(!0),f=n(!1),p={render:e=>({components:{AttentionHook:a,UserExperience:o},template:`
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