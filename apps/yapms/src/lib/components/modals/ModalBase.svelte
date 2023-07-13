<script lang="ts">
	export let open: boolean;
	export let title: string;

	export let sticky = false;
</script>

<input type="checkbox" class="modal-toggle" checked={open} />

<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box p-0 flex flex-col">
		<div
			class="bg-base-100 pt-6"
			class:border-b={sticky}
			class:border-base-content={sticky}
		>
			<div class="flex gap-x-2 ml-6">
				<slot name="icon" />
				<h3 class="text-2xl pb-3">
					{title}
				</h3>
			</div>
		</div>

		<div class="px-6 flex-1" class:overflow-y-auto={sticky}>
			<slot name="content" />
		</div>

		<div
			class="modal-action bg-base-100 pb-6"
			class:mt-0={sticky}
			class:pt-3={sticky}
			class:border-t={sticky}
			class:border-base-content={sticky}
		>
			<div class="mr-6">
				<slot name="action" />
			</div>
		</div>
	</div>
</div>
