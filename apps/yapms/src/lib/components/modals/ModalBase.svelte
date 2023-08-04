<script lang="ts">
	export let open: boolean;
	export let title: string;
</script>

<input type="checkbox" class="modal-toggle" checked={open} />

<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box flex flex-col">
		<div class="bg-base-100">
			<div class="flex gap-x-2 ml-6">
				<slot name="icon" />
				<h3 class="font-bold text-xl">
					{title}
				</h3>
			</div>
		</div>

		<div class="divider mb-0" />

		<div class="overflow-y-auto">
			<slot name="content" />
		</div>

		<div class="divider mt-0" />

		<div class="modal-action mt-0">
			<slot name="action" />
		</div>
	</div>
</div>
