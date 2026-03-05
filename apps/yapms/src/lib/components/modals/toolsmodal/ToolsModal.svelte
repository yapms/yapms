<script lang="ts">
	import { MassEditModalStore, TableModalStore, ToolsModalStore } from '$lib/stores/Modals';
	import { disableAll, enableAll, lockAll, unlockAll } from '$lib/stores/regions/regionActions';
	import ModalBase from '../ModalBase.svelte';
	import ToolButton from './ToolButton.svelte';
	import MassEditModal from './tools/MassEditModal.svelte';
	import TableModal from './tools/TableModal.svelte';
</script>

<ModalBase title="Tools" store={ToolsModalStore}>
	<div slot="content">
		<div class="flex flex-col gap-y-2 mx-5">
			<ToolButton text="Regions Table" callback={() => ($TableModalStore.open = true)} />
			<ToolButton text="Edit All" callback={() => ($MassEditModalStore.open = true)} />
			<div class="flex flex-row gap-x-2 [&>*]:flex-1">
				<ToolButton text="Disable All" callback={disableAll} />
				<ToolButton text="Enable All" callback={enableAll} />
			</div>
			<div class="flex flex-row gap-x-2 [&>*]:flex-1">
				<ToolButton text="Lock All" callback={lockAll} />
				<ToolButton text="Unlock All" callback={unlockAll} />
			</div>
		</div>
	</div>
</ModalBase>

<MassEditModal />

<TableModal />
