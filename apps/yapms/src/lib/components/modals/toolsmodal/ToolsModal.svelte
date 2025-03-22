<script lang="ts">
	import { MassEditModalStore, TableModalStore, ToolsModalStore } from '$lib/stores/Modals';
	import ModalBase from '../ModalBase.svelte';
	import ToolButton from './ToolButton.svelte';
	import MassEditModal from './tools/MassEditModal.svelte';
	import TableModal from './tools/TableModal.svelte';
</script>

<ModalBase title="Tools" store={ToolsModalStore}>
	<div slot="content">
		<div class="flex flex-col gap-y-2 mx-5">
			<ToolButton text={'Regions Table'} store={TableModalStore} />
			<ToolButton text={'Edit All Regions'} store={MassEditModalStore} />
		</div>
	</div>
</ModalBase>

<MassEditModal />

<TableModal />
