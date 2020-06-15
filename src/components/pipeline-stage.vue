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
		<modal :clickToClose="false" name="hello-world">
			<div class="modal-wrapper">
				<div class="modal-title">
					Add Fields
				</div>
				<div class="modal-content">
					The form and stuff goes here
				</div>
				<div class="modal-actions">
					<button
						@click.stop="closeFieldsModal"
						class="close-modal-btn"
					>
						close
					</button>
				</div>
			</div>
		</modal>
	</div>
</template>

<script>
	import draggable from "vuedraggable";
	import { mapMutations } from "vuex";
	export default {
		name: "pipeline-stage",
		components: {
			draggable,
		},
		mounted() {},
		data() {
			return {};
		},
		methods: {
			...mapMutations(["removeElementFromList"]),
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
			openFieldsModal({ id }) {
				this.$modal.show("hello-world");
			},
			closeFieldsModal() {
				this.$modal.hide("hello-world");
			},
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

	.level-1::after,
	.level-1::before {
		background-color: red;
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
	}

	.modal-wrapper .modal-actions {
		padding: 10px;
	}

	.modal-wrapper .modal-actions button {
		padding: 10px 20px;
	}

	.remove-btn {
		color: red;
	}
	button {
		background-color: transparent;
		color: #fb8c00;
		border: none;
		border-radius: 4px;
		font-size: 16px;
	}
	button:hover {
		background-color: #fef1e1;
	}

	button:focus {
		outline: none;
	}
</style>
