<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="DDCID" label="数据集中控制器ID"></el-table-column>
    <el-table-column prop="deviceName" label="设备名"></el-table-column>
    <el-table-column prop="deviceType" label="设备类型"></el-table-column>
    <el-table-column prop="MAC" label="MAC地址"></el-table-column>
    <el-table-column prop="status" label="状态"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          DDCID: '',
          deviceName: '',
          deviceType: '',
          MAC: '',
          status: ''
        }
      ]
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      var that = this
      this.$http
        .get('http://localhost:8030/nettyclient/light/command', {
          params: {
            cmd: 3
          }
        })
        .then(function(response) {
          var result = response.data
          console.log(result)
          if (result === '') {
            that.$message.error('网关掉线，请检查网关')
          } else {
            that.tableData[0].DDCID = result.sourceId
            that.tableData[0].deviceName = result.attributes.B0012994BA3.NAM
            that.tableData[0].deviceType = result.attributes.B0012994BA3.TYP
            that.tableData[0].MAC = '00124' + result.attributes.B0012994BA3.MAC
            that.tableData[0].status = result.attributes.B0012994BA3.SWI
          }
        })
    }
  }
}
</script>
