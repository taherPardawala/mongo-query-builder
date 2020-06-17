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
			<div class="operator-list operators">
				<input
					id="euqlity-operator-list-radio"
					type="checkbox"
					name="accordion"
				/>
				<label class="title" for="euqlity-operator-list-radio">
					Equality Operators
				</label>
				<draggable
					v-model="euqlityOperators"
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
						v-for="element in euqlityOperators"
						:key="element.id"
					>
						{{ element.name }}
					</div>
				</draggable>
			</div>
		</div>
		<div class="pipeline">
			<div class="title">Pipeline</div>
			<div class="pipeline-container">
				<pipelineStages
					:parentObject="{ id: 0 }"
					:children="queryPipeline"
					key="randomCharacters"
					:updatequeryVisualiser="updatequeryVisualiser"
				></pipelineStages>
			</div>
		</div>
		<div class="visualiser">
			<div class="title">Query Visualiser</div>
			<pre class="query-pipeline">{{ valueString }}</pre>
		</div>
	</div>
</template>

<script>
	import draggable from "vuedraggable";
	import pipelineStages from "../components/pipeline-stage.vue";
	import { mapMutations, mapGetters } from "vuex";
	export default {
		name: "About",
		components: {
			draggable,
			pipelineStages,
		},
		mounted() {
			this.$store.subscribe((mutation, state) => {
				if (mutation.type == "removeElementFromList") {
					let pipeline = JSON.parse(
						JSON.stringify(this.queryPipeline)
					);
					pipeline = this.removeFromTree(
						{ children: pipeline },
						mutation.payload
					);
					this.queryPipeline = pipeline.children;
				}
			});
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
						keyword: "$match",
						type: "Object",
						allowMultipleInputs: true,
					},
					{
						id: 14,
						name: "Add Fields",
						canBeNested: false,
						children: [],
						keyword: "$addFields",
						type: "Object",
						allowMultipleInputs: true,
					},
					{
						id: 16,
						name: "Count",
						canBeNested: false,
						children: [],
						keyword: "$count",
						type: "Object",
						allowMultipleInputs: true,
					},
					// {
					// 	id: 17,
					// 	name: "Group",
					// 	canBeNested: false,
					// 	children: [],
					// 	keyword: "$group",
					// 	type: "Object",
					// 	allowMultipleInputs: true,
					// },
					{
						id: 18,
						name: "Limit",
						canBeNested: false,
						children: [],
						keyword: "$limit",
						type: "Object",
						allowMultipleInputs: true,
					},
					{
						id: 21,
						name: "Merge",
						canBeNested: false,
						children: [],
						keyword: "$merge",
						type: "Object",
						allowMultipleInputs: true,
					},
					{
						id: 22,
						name: "Out",
						canBeNested: false,
						children: [],
						keyword: "$out",
						type: "Object",
						allowMultipleInputs: true,
					},
					{
						id: 23,
						name: "Project",
						canBeNested: false,
						children: [],
						keyword: "$project",
						type: "Object",
						allowMultipleInputs: true,
					},
					// {
					// 	id: 24,
					// 	name: "Replace Root",
					// 	canBeNested: false,
					// 	children: [],
					// 	keyword: "$replaceRoot",
					// 	type: "Object",
					// 	allowMultipleInputs: true,
					// },
					{
						id: 25,
						name: "Skip",
						canBeNested: false,
						children: [],
						keyword: "$skip",
						type: "Object",
						allowMultipleInputs: true,
					},
					{
						id: 26,
						name: "Sort By Count",
						canBeNested: false,
						children: [],
						keyword: "$sortByCount",
						type: "Object",
						allowMultipleInputs: true,
					},
				],
				matchOperators: [
					{
						id: 1,
						name: "And",
						canBeNested: true,
						children: [],
						keyword: "$and",
						type: "Array",
						allowMultipleInputs: true,
					},
					{
						id: 2,
						name: "Or",
						canBeNested: true,
						children: [],
						keyword: "$or",
						type: "Array",
						allowMultipleInputs: true,
					},
				],
				euqlityOperators: [
					{
						id: 4,
						name: "EQ",
						canBeNested: false,
						children: [],
						keyword: "$eq",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 5,
						name: "NEQ",
						canBeNested: false,
						children: [],
						keyword: "$neq",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 6,
						name: "GT",
						canBeNested: false,
						children: [],
						keyword: "$gt",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 7,
						name: "GTE",
						canBeNested: false,
						children: [],
						keyword: "$gte",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 8,
						name: "LT",
						canBeNested: false,
						children: [],
						keyword: "$lt",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 9,
						name: "LTE",
						canBeNested: false,
						children: [],
						keyword: "$lte",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 10,
						name: "IN",
						canBeNested: false,
						children: [],
						keyword: "$in",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 11,
						name: "NIN",
						canBeNested: false,
						children: [],
						keyword: "$nin",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 12,
						name: "NOT",
						canBeNested: false,
						children: [],
						keyword: "$not",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
					{
						id: 13,
						name: "REGEX",
						canBeNested: false,
						children: [],
						keyword: "$regex",
						type: "Object",
						allowMultipleInputs: false,
						stageType: "matchAndOrOperators",
					},
				],
				idGlobal: 1,
				output: [],
			};
		},
		methods: {
			addPipelineElement(elem) {
				let temp = JSON.parse(JSON.stringify(elem));
				temp.id = this.idGlobal++;
				return temp;
			},
			removeFromTree(parent, childIDToRemove) {
				parent.children = parent.children
					.filter((child) => {
						return child.id !== childIDToRemove;
					})
					.map((child) => {
						return this.removeFromTree(child, childIDToRemove);
					});
				return parent;
			},
			getFieldsForArrayElement(elem) {
				let temp = [];
				if (this.stageFieldData[elem.id]) {
					for (let field of this.stageFieldData[elem.id]) {
						temp.push({
							[field.selectedField]: field.inputValue,
						});
					}
				}
				return temp;
			},
			getFieldsForObjectElement(elem) {
				let temp = {};
				if (this.stageFieldData[elem.id]) {
					for (let field of this.stageFieldData[elem.id]) {
						temp[field.selectedField] = field.inputValue;
					}
				}
				return temp;
			},
			getFieldsForMatchAndOrOperators(elem) {
				let temp = {};
				if (this.stageFieldData[elem.id]) {
					for (let field of this.stageFieldData[elem.id]) {
						temp[field.selectedField] = {
							[elem.keyword]: field.inputValue,
						};
					}
				}
				return temp;
			},
			createQuery(query, parent) {
				let pipeline = parent.type == "Array" ? [] : {};
				let isParentArray = parent.type == "Array";
				for (let elem of query) {
					let isElemArray = elem.type == "Array";
					if (isParentArray) {
						if (isElemArray) {
							pipeline.push({
								[elem.keyword]: [
									...this.getFieldsForArrayElement(elem),
									...this.createQuery(
										elem.children,
										JSON.parse(JSON.stringify(elem))
									),
								],
							});
						} else {
							if (
								elem.stageType &&
								elem.stageType == "matchAndOrOperators"
							) {
								pipeline.push(
									this.getFieldsForMatchAndOrOperators(elem)
								);
							} else {
								pipeline.push({
									[elem.keyword]: {
										...this.getFieldsForObjectElement(elem),
										...this.createQuery(
											elem.children,
											JSON.parse(JSON.stringify(elem))
										),
									},
								});
							}
							// This is where we need to write code for the where the syntax changes.
						}
					} else {
						if (isElemArray) {
							pipeline[elem.keyword] = [
								...this.getFieldsForArrayElement(elem),
								...this.createQuery(
									elem.children,
									JSON.parse(JSON.stringify(elem))
								),
							];
						} else {
							// This condition right now does not exist for US as this hierarchy is not available
							pipeline[elem.keyword] = {};
						}
					}
				}
				return pipeline;
			},
			updatequeryVisualiser() {
				let query = this.createQuery(this.queryPipeline, {
					type: "Array",
					id: 0,
					name: "root",
				});
				this.output = query;
			},
		},
		computed: {
			...mapGetters(["stageFieldData"]),
			valueString() {
				return JSON.stringify(this.output, null, 2);
			},
		},
		watch: {
			queryPipeline: {
				deep: true,
				handler: function(nv, cv) {
					// console.log(JSON.stringify(nv, null, 2));
					let query = this.createQuery(nv, {
						type: "Array",
						id: 0,
						name: "root",
					});
					// console.log(JSON.stringify(query, null, 2));
					this.output = query;
				},
			},
		},
	};
</script>

<style>
	.remove-btn {
		color: red;
	}

	.remove-btn:hover {
		background-color: #f7c1bd;
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
<style scoped>
	.about {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.operator-wrapper {
		display: flex;
		flex-direction: column;
	}

	.operator-list {
		background-color: lightblue;
		width: 200px;
		position: relative;
	}

	.pipeline {
		height: 100%;
		width: 33%;
		margin-left: 20px;
		position: relative;
	}

	.visualiser {
		height: 100%;
		width: 33%;
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
		height: calc(100% - 23px);
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
	pre {
		text-align: start;
	}
</style>
