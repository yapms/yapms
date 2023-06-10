<script lang="ts">
	export let open: boolean;
	export let title: string;
</script>

<input type="checkbox" class="modal-toggle" checked={open} />

<div class="modal modal-bottom lg:modal-middle">
	<div class="modal-box">
		<div class="flex gap-x-2">
			<slot name="icon" />
			<h3 class="text-2xl pb-3">
				{title}
			</h3>
		</div>

		<slot name="content" />

		<div class="modal-action">
			<slot name="action" />
		</div>
	</div>
</div>
