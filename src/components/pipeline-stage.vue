<template>
	<div>
		<draggable
			:list="children"
			@start="drag = true"
			@end="drag = false"
			:group="getGroupObject()"
			ghost-class="ghost"
			:animation="150"
		>
			<div
				class="operator-item"
				:class="{
					'have-children':
						element.children && element.children.length,
				}"
				v-for="element in children"
				:key="element.id"
			>
				<div
					class="pipeline-stage-title"
					:class="{
						'make-title-bold':
							element.children && element.children.length,
					}"
				>
					{{ element.name }}
				</div>
				<pipeline-stage
					v-if="element.canBeNested"
					:children="element.children"
					:parentObject="element"
					:key="element.id"
				></pipeline-stage>
			</div>
		</draggable>
	</div>
</template>

<script>
	import draggable from "vuedraggable";
	export default {
		name: "pipeline-stage",
		components: {
			draggable,
		},
		data() {
			return {};
		},
		methods: {
			getGroupObject() {
				if (this.parentObject.canBeNested) {
					return {
						name: "Operators",
					};
				} else {
					return { name: "PipelineStages" };
				}
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
		top: 50%;
	}

	.have-children::before {
		height: 100%;
		width: 1px;
		content: " ";
		background-color: gray;
		position: absolute;
		left: 20px;
	}

	/* .has-children::after {
		height: 2px;
		width: 20px;
		content: " ";
		background-color: black;
		position: absolute;
		left: 20px;
		top: 50%;
	} */

	.ghost {
		background-color: salmon;
	}

	.pipeline-stage-title {
		background-color: white;
		padding: 10px;
		border: 1px solid black;
		/* border-radius: 4px; */
	}

	.make-title-bold {
		font-weight: 600;
		color: green;
	}
</style>
