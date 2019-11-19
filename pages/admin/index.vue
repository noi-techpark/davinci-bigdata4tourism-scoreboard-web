<template>
  <div>
    <div class="mb-4 text-right">
      <button
        @click="logout"
        class="px-4 py-2 border-3 border-white hover:bg-black text-black hover:text-white font-bold text-xl uppercase"
      >
        Logout
        <LogoutIcon
          class="ml-1 inline w-i h-i align-text-bottom fill-current"
        />
      </button>
    </div>

    <div
      :class="{ 'bg-gray-500 text-gray-300': draggingOver }"
      class="drag-container p-5 flex flex-col justify-center bg-gray-300 text-gray-400 text-center relative"
    >
      <div
        v-if="isFileSelected || isFileUploading"
        class="flex flex-col justify-center text-lg text-black"
      >
        <div>
          <UploadIcon class="drag-status-image inline fill-current" />
        </div>

        <div class="mt-3">Do you want to upload the file {{ fileName }}?</div>

        <div class="mt-4 flex justify-center">
          <button
            :disabled="isFileUploading"
            @click="upload"
            class="mr-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white disabled:border-gray-500 disabled:bg-transparent disabled:text-gray-500 font-bold text-lg uppercase"
          >
            Upload
          </button>
          <button
            :disabled="isFileUploading"
            @click="cancel"
            class="ml-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white disabled:border-gray-500 disabled:bg-transparent disabled:text-gray-500 font-bold text-lg uppercase"
          >
            Cancel
          </button>
        </div>
      </div>

      <div
        v-if="uploadingSucceeded"
        class="flex flex-col justify-center text-lg text-black"
      >
        <div class="text-primary-500">
          <SuccessIcon class="drag-status-image inline fill-current" />
        </div>

        <div class="mt-3 text-primary-500">
          Uploading file succeeded!
        </div>

        <div class="mt-4 text-center">
          <button
            @click="cancel"
            class="ml-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
          >
            Done
          </button>
        </div>
      </div>

      <div
        v-if="uploadingFailed"
        class="flex flex-col justify-center text-lg text-black"
      >
        <div class="text-error-500">
          <ErrorIcon class="drag-status-image inline fill-current" />
        </div>

        <div class="mt-3 text-error-500">
          Uploading file failed!
        </div>

        <div class="mt-4 text-center">
          <button
            @click="cancel"
            class="ml-2 px-3 py-2 border-3 border-black hover:bg-black hover:text-white font-bold text-lg uppercase"
          >
            Done
          </button>
        </div>
      </div>

      <div v-if="isFileNotSelected" class="flex flex-col content-center">
        <div>
          <AddIcon class="drag-image inline fill-current" />
        </div>
        <div class="mt-2 text-2xl">
          Drag &amp; Drop or Choose a File on Your Computer
        </div>
        <input
          ref="fileInput"
          @change="onFileChange"
          type="file"
          name="file"
          accept="text/csv"
          class="hidden"
        />
      </div>

      <canvas
        v-if="isFileNotSelected"
        @drag.stop.prevent=""
        @dragover.stop.prevent=""
        @dragstart.stop.prevent=""
        @dragend.stop.prevent=""
        @dragenter.stop.prevent="onDragEnter"
        @dragleave.stop.prevent="onDragLeave"
        @drop.stop.prevent="onFileDrop"
        @click.prevent="onClick"
        @keyup.enter="onClick"
        class="absolute z-50 top-0 left-0 w-full h-full"
        tabindex="0"
      >
      </canvas>
    </div>

    <div class="mt-4 mx-3 xl:mx-0">
      <table class="w-full">
        <thead>
          <tr class="table__header">
            <th class="column__header">Type</th>
            <th class="column__header">File</th>
            <th class="column__header">Upload Date</th>
            <th class="column__header">Status</th>
            <th class="column__header"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, id) in historyTable" :key="id" class="row">
            <td class="cell">
              {{ item.type }}
            </td>
            <td class="cell">
              <a :href="item.fileUrl" download class="hover:underline">{{
                item.fileName
              }}</a>
            </td>
            <td class="cell">
              {{ item.importDate }}
            </td>
            <td class="cell">
              {{ item.status }}
            </td>
            <td class="cell">
              <Modal v-if="item.logs">
                <button
                  slot="button"
                  slot-scope="{ openModal }"
                  @click="openModal"
                  class="hover:text-gray-500"
                >
                  <InfoIcon class="inline fill-current" />
                  <span class="sr-only"
                    >Show Logs of File {{ item.fileName }}</span
                  >
                </button>

                <div
                  slot="modal"
                  v-cloak
                  slot-scope="{ closeModal }"
                  class="m-4 bg-white"
                >
                  <div class="p-4 flex justify-between items-center">
                    <div class="font-bold text-xl md:text-2xl uppercase">
                      Logs
                    </div>

                    <button
                      @click="closeModal"
                      class="text-black hover:text-gray-500"
                    >
                      <ExitIcon class="icon fill-current" />
                      <span class="sr-only">Close Logs</span>
                    </button>
                  </div>
                  <pre class="px-4 font-sans">{{ item.logs }}</pre>

                  <div class="p-4 flex justify-end">
                    <button
                      @click="closeModal"
                      class="mr-2 px-4 py-2 text-lg md:text-xl font-bold text-black hover:text-white hover:bg-black"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </Modal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/modal.vue'
import LogoutIcon from '@/components/icons/logout.vue'
import AddIcon from '@/components/icons/add.vue'
import UploadIcon from '@/components/icons/upload.vue'
import SuccessIcon from '@/components/icons/success.vue'
import ErrorIcon from '@/components/icons/error.vue'
import InfoIcon from '@/components/icons/info.vue'
import ExitIcon from '@/components/icons/exit.vue'

const STATE_FILE_NOT_SELECTED = 'File not selected'
const STATE_FILE_SELECTED = 'File selected'
const STATE_UPLOADING_FILE = 'Uploading file'
const STATE_UPLOAD_SUCCEEDED = 'Upload succeeded'
const STATE_UPLOAD_FAILED = 'Upload failed'

const HISTORY_TYPES = {
  INNOVATION_IN_COMPANIES_WITH_AT_LEAST_10_EMPLOYEES:
    'INNOVATION IN COMPANIES WITH AT LEAST 10 EMPLOYEES',
  ICT_IN_COMPANIES_WITH_AT_LEAST_10_EMPLOYEES:
    'ICT IN COMPANIES WITH AT LEAST 10 EMPLOYEES',
  RESEARCH_AND_DEVELOPMENT: 'RESEARCH AND DEVELOPMENT'
}

const HISTORY_STATES = {
  UPLOADED: 'UPLOADED',
  PROCESSING: 'PROCESSING',
  PROCESSED_WITH_SUCCESS: 'PROCESSED WITH SUCCESS',
  PROCESSED_WITH_WARNINGS: 'PROCESSED WITH WARNINGS',
  PROCESSED_WITH_ERRORS: 'PROCESSED WITH ERRORS',
  REPLACED: 'REPLACED'
}

export default {
  components: {
    Modal,
    LogoutIcon,
    AddIcon,
    UploadIcon,
    SuccessIcon,
    ErrorIcon,
    InfoIcon,
    ExitIcon
  },
  data() {
    return {
      state: STATE_FILE_NOT_SELECTED,
      draggingOver: false,
      file: null,
      history: []
    }
  },
  computed: {
    fileName() {
      if (this.file === null) return ''

      return this.file.name
    },
    isFileNotSelected() {
      return this.state === STATE_FILE_NOT_SELECTED
    },
    isFileSelected() {
      return this.state === STATE_FILE_SELECTED
    },
    isFileUploading() {
      return this.state === STATE_UPLOADING_FILE
    },
    uploadingSucceeded() {
      return this.state === STATE_UPLOAD_SUCCEEDED
    },
    uploadingFailed() {
      return this.state === STATE_UPLOAD_FAILED
    },
    historyTable() {
      const sortedHistory = this.history
        .filter(() => {
          return true
        })
        .sort((itemA, itemB) => {
          return (
            this.$options.filters.formatUnix(itemB.importDate) -
            this.$options.filters.formatUnix(itemA.importDate)
          )
        })

      const downloadUrl =
        process.env.api +
        'stats/download/{id}?access_token=' +
        this.$auth.getToken('local').substring(7)

      return sortedHistory.map((item) => {
        return {
          id: item.id,
          type: HISTORY_TYPES[item.type],
          fileName: item.source,
          fileUrl: downloadUrl.replace('{id}', item.id),
          importDate: this.$options.filters.formatDate(item.importDate),
          status: HISTORY_STATES[item.status],
          logs: item.logs
        }
      })
    }
  },
  mounted() {
    this.updateHistory()
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
    updateHistory() {
      this.$axios.get('stats/upload/history').then((response) => {
        this.history = response.data.uploadedStats
      })
    },
    onClick() {
      this.$refs.fileInput.click()
    },
    onDragEnter() {
      this.draggingOver = true
    },
    onDragLeave() {
      this.draggingOver = false
    },
    onFileDrop(e) {
      this.onDragLeave()
      this.onFileChange(e)
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files

      if (!files.length) {
        return
      }

      const file = files[0]

      if (file.type !== 'text/csv') {
        return
      }

      this.file = file
      this.state = STATE_FILE_SELECTED
    },
    onFileRemove() {
      this.file = null
      this.state = STATE_FILE_NOT_SELECTED
    },
    async upload() {
      try {
        this.state = STATE_UPLOADING_FILE

        const formData = new FormData()
        formData.append('file', this.file)

        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }

        await this.$axios.post('stats/upload/csv', formData, config)

        this.updateHistory()

        this.state = STATE_UPLOAD_SUCCEEDED
      } catch (e) {
        this.state = STATE_UPLOAD_FAILED
      }

      this.file = null
    },
    cancel() {
      this.file = null
      this.state = STATE_FILE_NOT_SELECTED
    }
  }
}
</script>

<style scoped>
.drag-container {
  height: 300px;
}

.drag-image {
  width: 150px;
  height: 150px;
}

.drag-status-image {
  width: 100px;
  height: 100px;
}

.table__header {
  @apply .border-b .border-gray-500;
}

.column__header {
  @apply .py-3 .px-2 .text-left .text-xl;
}

.row:hover {
  @apply .bg-gray-100;
}

.cell {
  @apply .py-3 .px-2 .text-left .text-lg;
}
</style>
