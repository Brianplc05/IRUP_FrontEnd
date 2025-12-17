<template>
  <q-table :rows="items" :columns="columns" row-key="IRNo">
    <template v-slot:body-cell-editHead="props">
      <q-td>
        <q-btn
          flat
          rounded
          push
          @click="editDeptHead(props.row.id, props.row.deptCode)"
          :ripple="{ center: true }"
          icon="edit_square"
          class="buttonYellowDesign bg-accent text-black shadow-3"
          style="border-radius: 20px; width: 125px"
        >
          <q-tooltip class="bg-info text-white">
            Edit Head Details
          </q-tooltip>
        </q-btn>

        <q-dialog v-model="EditDepartment" persistent>
          <q-card class="QADepartment">
            <q-card-section
              class="q-mb-sm row items-center justify-center"
            >
              <div
                class="text-secondary text-weight-bold"
                style="font-size: 25px; color: #002b5c"
              >
                EDIT DEPARTMENT
              </div>
            </q-card-section>

            <q-separator class="formseparatorBlue" />

            <q-card-section style="display: none;">
              <div>Id Code: {{ Id }}</div>
            </q-card-section>

            <q-card-section class="q-gutter-md q-ma-sx">
              <q-input
                  rounded
                  outlined
                  :model-value="DeptCode"
                  label="DEPARTMENT NAME"
                  disable
                />
            </q-card-section>

            <div class="row q-gutter-xxl; justify-center">
              <q-btn
                flat
                rounded
                push
                label="CANCEL"
                class="buttonCancelDesign text-info"
                @click="onCancelEditDept"
              />

              <q-btn
                flat
                rounded
                push
                label="SAVE"
                class="buttonSaveDesign bg-accent text-black"
                @click="submitEditDept()"
              />
            </div>
          </q-card>
        </q-dialog>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    items: Array,
    columns: Array,
    getDepHead: Function,
  },

  data() {
    return {
      EditDepartment: false,
      disAllHead: [],
      Id: "",
      DeptCode: "",
    }
  },

  created() {
    this.getDeptHeadDetails();
  },

  computed: {
    ...mapGetters({
      getHead: "ApplyStore/getHead",
    }),
  },

  methods: {
    async getDeptHeadDetails(){
      try{
        await this.$store.dispatch("ApplyStore/disHead");
        this.disAllHead = this.getHead;
      }catch (error) {
        console.error("Error inserting data:", error);
      }
    },


    editDeptHead(id, deptcode){
      this.EditDepartment = true;
      this.Id = id;
      this.DeptCode = deptcode;
    },

    onCancelEditDept(){
      this.EditDepartment = false;
      this.Id = "";
      this.DeptCode = "";
    },

    submitEditDept(){

    },

  }
}
</script>
