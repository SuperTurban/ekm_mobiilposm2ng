<template>
    <div class="media container" id="media-container">
        <div>Valitud failid:</div>
              <span v-if="chosenFiles.length==0" class="messeg">Pole ühtegi valitud</span>
        <div class="chosen-media row">

    
          <div v-for="file in chosenFiles" class="col-xs-6 col-md-3">
            <div v-if="file.mediaType=='IMAGE'">
              <a class="img thumbnail" href="#" @click.prevent.stop="chosenMediaClickHandle(file)"><img :src="'/media/' + file.path"></a>
            </div>
            <div v-else>
              <a class="audionail" href="#" @click.prevent.stop="chosenMediaClickHandle(file)">AUDIO : {{file.name}}</a>
            </div>
          </div>

        </div>

        <button class="btn" @click="showAll = !showAll"><span v-if="!showAll">Näita kõiki faile</span><span v-else>Peida ülejäänud failid</span></button>
        <div v-if="showAll" style="margin-top:10px">
          <input v-model="nameFilterValue" type="text" placeholder="Filtreerimine nime järgi">
        </div>
        <div class="all-media row" v-if="showAll">
          <div v-for="file in filterFiles(allFiles)" class="col-xs-6 col-md-3">
            <div v-if="file.mediaType=='IMAGE'">
              <a class="img thumbnail" href="#" @click.prevent.stop="allMediaClickHandle(file)"><img :src="'/media/' + file.path"></a>
            </div>

            <div v-else>
              <a class="audionail" href="#" @click.prevent.stop="allMediaClickHandle(file)">{{file.name}}</a>
            </div>

          </div>
        </div>
        

        <div class="form-wrap">
          <form class="upload" enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">

              <div class="dropbox">

                    <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="*" class="input-file">

                    <p v-if="isInitial">
                      Lohista failid siia.
                    </p>

                    <p v-if="isSaving">
                      Üleslaadimine...
                    </p>

              </div>
          </form>
        </div>
    </div>
</template>

<script>
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'app',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'files[]',
        allFiles: [],
        showAll: false,
        nameFilterValue : '',
      }
    },
    props : ['chosenFiles'],
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      filterFiles(files){
        if(this.nameFilterValue == '')
          return files;
        return files.filter(x => x.name.indexOf(this.nameFilterValue) !== -1);
      },
      allMediaClickHandle(file){
        this.chosenFiles.push(file);
        console.log(this.chosenFiles);
      },
      chosenMediaClickHandle(file){
        console.log(this.chosenFiles);
        var index = this.chosenFiles.findIndex(x => x.name == file.name);
        this.chosenFiles.splice(index,1);
      },
      reload(){
           this.api.getMedia()
              .then(function(data){
                this.allFiles = data;
              }.bind(this));
      },
      reset() {
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        this.currentStatus = STATUS_SAVING;
        this.api.createMedia(formData)
          .then(x => {
            this.currentStatus = STATUS_INITIAL;
            this.reload();
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        const formData = new FormData();

        if (!fileList.length) return;

        Array.from(fileList).forEach((elem, i) => {
          formData.append(fieldName, fileList[i], elem.name);
        });

        this.save(formData);
      }
    },
    mounted() {
      this.reset();
    },
    created(){
      this.reload(); 
    },
  }
</script>

<style>
  .chosen-media, .all-media{
    margin-top:10px;
  }
  .media, .container{
    clear:both;
    display:block;
    margin-bottom:10px;
  }
  .form-wrap, .chosen-media{
    clear:both;
  }
  .dropbox {
    margin-top:10px;
    outline-offset: -10px;
    background:#dadada;
    color: dimgray;
    padding: 10px 10px;
    width:100%;
    min-height: 100px; 
    position: relative;
    cursor: pointer;
  }
  .input-file {
    opacity: 0; 
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .messeg{
    font-size:10px;
    color:orange;
  }

  .dropbox:hover {
    background: lightblue; 
  }

  form.upload{
    width:100%;
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding:40px;
  }

  .thumbnail.img, .audionail{
    display:block;
    box-sizing:default;
    margin-top:10px;
  }
  .img img, .audionail{
    width:125px;
    max-height:125px;
    border:3px solid black;
  }

  .audionail{
    height:125px;
  }
  .img img:hover, .audionail:hover{
    opacity:0.3;
  }
</style>