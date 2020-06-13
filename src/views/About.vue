<template>
	<div class="about">
		<div class="operator-wrapper">
			<div class="operator-list stages">
				<input
					id="pipeline-stages-radio"
					type="checkbox"
					name="accordion"
					checked
				/>
				<label class="title" for="pipeline-stages-radio"
					>Pipeline Stages</label
				>
				<draggable
					v-model="pipelineStages"
					@start="drag = true"
					@end="drag = false"
					:group="{
						name: 'PipelineStages',
						pull: 'clone',
						put: false,
					}"
					:sort="false"
					:clone="addPipelineElement"
					ghost-class="ghost"
					:animation="150"
				>
					<div
						class="operator-item"
						v-for="element in pipelineStages"
						:key="element.id"
					>
						{{ element.name }}
					</div>
				</draggable>
			</div>
			<div class="operator-list operators">
				<input
					id="operator-list-radio"
					type="checkbox"
					name="accordion"
				/>
				<label class="title" for="operator-list-radio">
					Match Operators
				</label>
				<draggable
					v-model="matchOperators"
					@start="drag = true"
					@end="drag = false"
					:group="{ name: 'Operators', pull: 'clone', put: false }"
					:sort="false"
					:clone="addPipelineElement"
					ghost-class="ghost"
					:animation="150"
				>
					<div
						class="operator-item"
						v-for="element in matchOperators"
						:key="element.id"
					>
						{{ element.name }}
					</div>
				</draggable>
			</div>
		</div>
		<div class="pipeline">
			<div class="title">Pipeline</div>
			<pipelineStages
				:parentObject="{}"
				:children="queryPipeline"
			></pipelineStages>
			<!-- <draggable
				v-model="queryPipeline"
				@start="drag = true"
				@end="drag = false"
				:group="{ name: 'Operators' }"
			>
				<div
					class="operator-item"
					v-for="element in queryPipeline"
					:key="element.id"
				>
					{{ element.name }}
				</div>
			</draggable> -->
		</div>
	</div>
</template>

<script>
	import draggable from "vuedraggable";
	import pipelineStages from "../components/pipeline-stage.vue";
	export default {
		name: "About",
		components: {
			draggable,
			pipelineStages,
		},
		data() {
			return {
				queryPipeline: [],
				pipelineStages: [
					{
						id: 3,
						name: "Match",
						canBeNested: true,
						children: [],
					},
					{
						id: 14,
						name: "Add Fields",
						canBeNested: false,
					},
					{
						id: 16,
						name: "count",
						canBeNested: false,
					},
					{
						id: 17,
						name: "group",
						canBeNested: false,
					},
					{
						id: 18,
						name: "limit",
						canBeNested: false,
					},
					{
						id: 21,
						name: "merge",
						canBeNested: false,
					},
					{
						id: 22,
						name: "out",
						canBeNested: false,
					},
					{
						id: 23,
						name: "project",
						canBeNested: false,
					},
					{
						id: 24,
						name: "replaceRoot",
						canBeNested: false,
					},
					{
						id: 25,
						name: "skip",
						canBeNested: false,
					},
					{
						id: 26,
						name: "sortByCount",
						canBeNested: false,
					},
				],
				matchOperators: [
					// All these operators below only work in Match and lookup pipelines
					{
						id: 1,
						name: "And",
						canBeNested: true,
						children: [],
					},
					{
						id: 2,
						name: "Or",
						canBeNested: true,
						children: [],
					},
					{
						id: 4,
						name: "EQ",
						canBeNested: true,
						children: [],
					},
					{
						id: 5,
						name: "NEQ",
						canBeNested: true,
						children: [],
					},
					{
						id: 6,
						name: "GT",
						canBeNested: true,
						children: [],
					},
					{
						id: 7,
						name: "GTE",
						canBeNested: true,
						children: [],
					},
					{
						id: 8,
						name: "LT",
						canBeNested: true,
						children: [],
					},
					{
						id: 9,
						name: "LTE",
						canBeNested: true,
						children: [],
					},
					{
						id: 10,
						name: "IN",
						canBeNested: true,
						children: [],
					},
					{
						id: 11,
						name: "NIN",
						canBeNested: true,
						children: [],
					},
					{
						id: 12,
						name: "NOT",
						canBeNested: true,
						children: [],
					},
					{
						id: 13,
						name: "REGEX",
						canBeNested: true,
						children: [],
					},
				],
				idGlobal: 1,
			};
		},
		methods: {
			addPipelineElement({ id, /*name,*/ ...others }) {
				return {
					id: this.idGlobal++,
					// name: name + " " + this.idGlobal,
					...others,
				};
			},
		},
		watch: {
			queryPipeline: {
				deep: true,
				handler: function(nv, cv) {
					console.log(JSON.stringify(nv, null, 2));
				},
			},
		},
	};
</script>

<style scoped>
	.about {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.operator-wrapper {
		display: flex;
		flex-direction: column;
	}

	.operator-list {
		background-color: lightblue;
		width: 300px;
		position: relative;
	}

	.pipeline {
		/* background-color: lightgreen; */
		height: 100%;
		width: 50%;
		margin-left: 20px;
		position: relative;
	}

	.title {
		display: flex;
		justify-content: space-between;
		padding: 1em;
		background: white;
		font-weight: bold;
		cursor: pointer;
		border: 1px solid black;
	}

	.pipeline .title::after {
		height: calc(100%);
		width: 1px;
		content: " ";
		background-color: gray;
		position: absolute;
		left: 0px;
		top: 0;
	}

	input + .title::after {
		content: "\276F";
		width: 1em;
		height: 1em;
		text-align: center;
		-webkit-transition: all 0.35s;
		transition: all 0.35s;
	}

	input:checked ~ div .operator-item {
		display: block;
	}

	input:checked + .title::after {
		transform: rotate(90deg);
	}

	input[type="checkbox"] {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	input ~ div .operator-item {
		display: none;
		padding: 5px;
		background-color: floralwhite;
		border: 1px solid gray;
		transition: all 0.35s;
		cursor: pointer;
	}

	.ghost {
		background-color: salmon;
	}
</style>
