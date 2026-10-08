<template>
  <q-item
    clickable
    :active="isSelected"
    @click="$emit('select')"
    active-class="my-active-item"
    class="my-sidebar-item"
  >
    <q-item-section avatar>
      <q-icon :name="icon" :size="iconSize" />
    </q-item-section>

    <q-item-section>
      <q-item-label :style="{ fontSize: labelSize }">
        {{ label }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>


<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    iconSize: {
      type: String,
      default: "25px",  // you can change this
    },
    labelSize: {
      type: String,
      default: "15px",  // NEW: text size
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped>
.my-sidebar-item {
  border-radius: 5px;
  color: #003566;
  transition: background 0.2s, color 0.2s;
}

.my-active-item {
  background: #ffc412;
  color: #003566;
  border: 3px solid #ffc412;
  border-radius: 10px;
  font-weight: bold;
}

.my-sidebar-item:hover {
  background: #f8fafc;
  color: #003566;
}

</style>
