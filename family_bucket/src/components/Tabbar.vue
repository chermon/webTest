<template>
    <div>
        <cube-tab-bar
    v-model="selectedLabelDefault"
    :data="tabs"
    @click="clickHandler"
    @change="changeHandler">
  </cube-tab-bar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selectedLabelDefault: '课堂',
      tabs: [{
        label: '课堂',
        icon: 'cubeic-home'
      }, {
        label: '分类',
        icon: 'cubeic-like'
      }, {
        label: '搜索',
        icon: 'cubeic-vip'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    //点击与自身不同的导航
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    }
  }
}
</script>