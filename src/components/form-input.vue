<template>
	<div class="input-wrapper">
		<div class="field-selector">
			<multiselect
				selectLabel=""
				v-model="field"
				:options="fields"
			></multiselect>
		</div>
		<div class="field-value">
			<input v-model="value" placeholder="Enter Value" type="text" />
		</div>
		<div class="input-actions">
			<button
				v-if="selectedElement.allowMultipleInputs && index != 0"
				@click="removeRow"
				class="remove-btn"
			>
				X
			</button>
			<div v-else>&nbsp;</div>
		</div>
	</div>
</template>

<script>
	import Multiselect from "vue-multiselect";
	import { mapMutations, mapGetters } from "vuex";
	export default {
		components: {
			Multiselect,
		},
		mounted() {
			this.field = this.selectedField;
			this.value = this.inputValue;
		},
		data() {
			return {
				field: "",
				value: "",
			};
		},
		methods: {
			removeRow() {
				this.$emit("remove", { id: this.id });
			},
		},
		props: {
			index: {
				required: true,
				type: Number,
			},
			id: {
				required: true,
				type: Number,
			},
			selectedField: {
				default: "",
			},
			inputValue: {
				default: "",
			},
			selectedElement: {
				type: Object,
				default: function() {
					return {};
				},
			},
		},
		computed: {
			...mapGetters(["fields"]),
		},
	};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
	.input-wrapper {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 10px;
	}

	.input-wrapper .field-selector {
		flex: 0 0 35%;
	}

	.input-wrapper .field-value {
		flex: 0 0 35%;
	}

	.input-wrapper .field-value input {
		width: 100%;
		padding: 10px;
		border-radius: 6px;
		border-width: 1px;
		border-color: lightgray;
	}
</style>
