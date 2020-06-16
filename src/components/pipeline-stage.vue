<template>
	<div class="stage-wrapper">
		<draggable
			:list="children"
			@start="drag = true"
			@end="drag = false"
			:group="getGroupObject()"
			ghost-class="ghost"
			:animation="150"
			:swapThreshold="0.65"
		>
			<div
				class="operator-item"
				:class="{
					'have-children':
						element.children && element.children.length,
				}"
				v-for="element in children"
				:key="element.id"
				:ref="'element-' + element.id"
			>
				<div
					class="pipeline-stage-title"
					:class="{
						'make-title-bold':
							element.children && element.children.length,
					}"
					@click="toggleChildren(element.id)"
				>
					{{ element.name }}
					<div>
						<button
							@click.stop="openFieldsModal(element)"
							class="edit-btn"
						>
							Edit
						</button>
						<button
							@click.stop="removeElement(element.id)"
							class="remove-btn"
						>
							X
						</button>
					</div>
				</div>
				<div class="children-wrapper">
					<pipeline-stage
						v-if="element.canBeNested"
						:children="element.children"
						:parentObject="element"
						:key="element.id"
					></pipeline-stage>
				</div>
			</div>
		</draggable>
		<modal
			:scrollable="true"
			height="auto"
			:minHeight="400"
			:clickToClose="false"
			name="hello-world"
		>
			<div class="modal-wrapper">
				<div class="modal-title">
					Add Fields
				</div>
				<div class="modal-content">
					<div class="form-wrapper">
						<form-input
							v-for="(input, index) in formInputs"
							:key="input.id"
							@remove="removeRow"
							:index="index"
							:id="input.id"
							:selectedElement="selectedElement"
							:selectedInput="input.selectedInput"
							:selectedField="input.selectedField"
						></form-input>
						<button
							v-if="selectedElement.allowMultipleInputs"
							@click="addRow"
						>
							Add Row
						</button>
					</div>
				</div>
				<div class="modal-actions">
					<button
						@click.stop="closeFieldsModal"
						class="remove-btn close-modal-btn"
					>
						Close
					</button>
					<button
						@click.stop="closeFieldsModal"
						class="submit-form-btn"
					>
						Save
					</button>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	import draggable from "vuedraggable";
	import { mapMutations, mapGetters } from "vuex";
	import formInput from "../components/form-input";
	export default {
		name: "pipeline-stage",
		components: {
			draggable,
			formInput,
		},
		mounted() {},
		data() {
			return {
				selectedElement: {},
				formModel: {},
				formInputs: [],
			};
		},
		methods: {
			...mapMutations(["removeElementFromList", "updateFieldData"]),
			getGroupObject() {
				if (this.parentObject.canBeNested) {
					return {
						name: "Operators",
					};
				} else {
					return { name: "PipelineStages" };
				}
			},
			toggleChildren(id) {
				let parent = this.$refs["element-" + id][0];
				if (parent.classList.contains("hide-children")) {
					parent.classList.remove("hide-children");
				} else {
					parent.classList.add("hide-children");
				}
			},
			removeElement(id) {
				this.removeElementFromList(id);
			},
			openFieldsModal(elem) {
				this.selectedElement = elem;
				if (this.fieldData[this.selectedElement.id]) {
					// do something if data already exists
				} else {
					// Create some sort of reference to the rows
					this.formInputs.push({
						id: new Date().getTime(),
						selectedField: "",
						selectedInput: "",
					});
				}
				this.$modal.show("hello-world");
			},
			closeFieldsModal() {
				this.$modal.hide("hello-world");
			},
			addRow(row) {
				this.formInputs.push({
					id: new Date().getTime(),
					selectedField: "",
					selectedInput: "",
				});
			},
			removeRow(row) {
				this.formInputs = this.formInputs.filter((e) => e.id != row.id);
			},
		},
		computed: {
			...mapGetters(["fieldData", "fields"]),
		},
		props: {
			children: {
				required: true,
				type: Array,
			},
			parentObject: {
				required: true,
				type: Object,
			},
			level: {
				required: false,
				type: Number,
				default: 1,
			},
		},
	};
</script>

<style scoped>
	.operator-item {
		padding: 0px 0 0 20px;
		cursor: pointer;
		position: relative;
	}

	.operator-item::after {
		height: 1px;
		width: 20px;
		content: " ";
		background-color: gray;
		position: absolute;
		left: 0px;
		top: 20px;
	}

	.have-children::before {
		height: calc(100% - 23px);
		width: 1px;
		content: " ";
		background-color: gray;
		position: absolute;
		left: 20px;
	}

	.ghost {
		background-color: salmon;
	}

	.pipeline-stage-title {
		background-color: white;
		padding: 10px;
		border: 1px solid black;
		color: var(--color);
		/* border-radius: 4px; */
		position: relative;
		display: flex;
		justify-content: space-between;
		text-align: left;
		width: 100%;
		box-sizing: border-box;
	}

	.hide-children .children-wrapper {
		display: none;
	}

	.make-title-bold {
		font-weight: 600;
		color: green;
	}

	.modal-wrapper {
		height: 100%;
		min-height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.modal-wrapper .modal-title {
		padding: 10px;
		font-weight: 600;
		font-size: 18px;
	}

	.modal-wrapper .modal-content {
		padding: 10px;
		display: flex;
		height: 100%;
		flex-grow: 1;
	}

	.modal-wrapper .modal-content .form-wrapper {
		width: 100%;
		position: relative;
	}

	.modal-wrapper .modal-content .form-wrapper button {
		position: absolute;
		bottom: -25px;
		right: 0;
	}

	.modal-wrapper .modal-actions {
		padding: 10px;
	}

	.modal-wrapper .modal-actions button {
		padding: 10px 20px;
	}
</style>

<style>
	.vm--modal {
		overflow: visible;
	}
</style>
