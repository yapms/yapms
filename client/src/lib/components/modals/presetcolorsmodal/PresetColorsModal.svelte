<script lang="ts">
  import { PresetColorsModalStore } from "$lib/stores/Modals";
</script>

<input type="checkbox" class="modal-toggle" checked={$PresetColorsModalStore.open} />
<div class="modal">
  <div class="modal-box">
    <h2>Hello World</h2>
  </div>
</div>