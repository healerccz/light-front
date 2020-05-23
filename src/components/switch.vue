<template>
  <div>
    <span>
      单灯控制:
      <br />
      <br />
    </span>
    <el-switch
      style="display: block"
      v-model="value1"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="打开"
      inactive-text="关闭"
      @change="changeSwitchSingle"
      on-value="0"
      off-value="1"
    ></el-switch>
    <br />
    <span>
      批量控制:
      <br />
      <br />
    </span>
    <el-switch
      style="display: block"
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="打开"
      inactive-text="关闭"
      on-value="0"
      off-value="1"
      @change="changeSwitchBatch"
    ></el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 'OFF',
      cmd: 0,
      value1: false,
      value2: false
    }
  },
  created() {
    this.getSwitchStatus()
  },
  methods: {
    getSwitchStatus() {
      var that = this
      this.$http
        .get('http://localhost:8030/nettyclient/light/command', {
          params: {
            cmd: 3
          }
        })
        .then(function(response) {
          console.log(response)
          var result = response.data
          if (result === '') {
            that.$message.error('网关掉线，请检查网关')
            that.value1 = false
            that.value2 = false
          } else if (
            typeof result.attributes.B0012994BA3.SWI !== 'undefined' &&
            result.attributes.B0012994BA3.SWI === 'ON'
          ) {
            that.value1 = true
            // that.value2 = true
            that.$message.success('数据同步成功')
          }
        })
    },
    changeSwitchSingle(data) {
      var that = this
      this.cmd = data ? 1 : 2
      this.$http
        .get('http://localhost:8030/nettyclient/light/command', {
          params: {
            cmd: this.cmd
          }
        })
        .then(function(response) {
          var result = response.data
          console.log(result)
          if (result === '') {
            that.value1 = false
            that.$message.error('网关掉线，请检查网关')
          } else if (typeof result.attributes.SWI !== 'undefined') {
            if (that.cmd === 1 && result.attributes.SWI === 'ON') {
              that.value1 = true
              that.$message.success('灯已打开')
            } else if (that.cmd === 2 && result.attributes.SWI === 'OFF') {
              that.value1 = false
              that.$message.success('灯已关闭')
            }
          } else {
            that.value1 = false
            that.$message.error('网关掉线，请检查网关')
          }
        })
    },
    changeSwitchBatch(data) {
      // 批量控制
      var that = this
      this.cmd = data ? 4 : 5
      this.$http
        .get('http://localhost:8030/nettyclient/light/command', {
          params: {
            cmd: this.cmd
          }
        })
        .then(function(response) {
          var result = response.data
          console.log(result)
          if (result === '') {
            that.value2 = false
            that.$message.error('网关掉线，请检查网关')
          } else if (typeof result.attributes.SWI !== 'undefined') {
            if (that.cmd === 4 && result.attributes.SWI === 'ON') {
              that.value2 = true
              that.value1 = true
              that.$message.success('灯已打开')
            } else if (that.cmd === 5 && result.attributes.SWI === 'OFF') {
              that.value1 = false
              that.value2 = false
              that.$message.success('灯已关闭')
            }
          } else {
            that.value1 = false
            that.value2 = false
            that.$message.error('网关掉线，请检查网关')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
