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
      default: "16px",  // NEW: text size
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
  border-radius: 12px;
  margin: 4px 8px;
  padding: 8px 12px;
  transition: background 0.2s, color 0.2s;
}

.my-active-item {
  background: #f1f5f9;
  color: #003566;
  border-left: 8px solid #ffc412;
  border-radius: 12px;
  font-weight: bold;
}

.my-sidebar-item:hover {
  background: #f8fafc;
  color: #003566;
}

</style>
