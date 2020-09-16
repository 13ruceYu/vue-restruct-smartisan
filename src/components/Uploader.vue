<template>
  <div>
    <input type="file" @change="onFill">
  </div>
</template>
<script>
import api from "../lib/api";
export default {
  props:['autoUpload'],

  data() {
    return {
      file:null
    }
  },

  methods: {
    onFill(e) {
      let f = this.file = e.target.files[0];

      let fd = new FormData();
      fd.append('file',f);

      this.$emit('change', f);

      if(this.autoUpload) {
        api('_file/create',fd).then(r => {
          if(r.success){
            e.target.value = '';
            this.$emit('uploadSuccess',r.data);
          }else {
            this.$emit('uploadFail', r);
          }
        })
      }
    }
  },
}
</script>

<style scoped>
label {
  background: #769cf4;
  color: #fff;
  border-radius: 3px;
  font-size: .9em;
  padding: .3em .5em;
}

label:hover {
  cursor: pointer;
}
</style>