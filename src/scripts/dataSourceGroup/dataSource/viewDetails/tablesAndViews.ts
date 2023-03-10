import { dataSourceApi } from '@/api/dataSourceApi';
import { onMounted, ref, watch } from 'vue';
import go from "gojs";
import SetDescriptionModal from "@/components/modals/SetDescriptionModal.vue";
import { updateSchemaDescription, updateTableDescription } from "@/helpers/dataSourceHelper";
import { ElMessage } from 'element-plus';

export default {
    props: ['viewSettings'],
    emits: ['onChangeView', 'processingEvent', "onLoadingChanged"],
    components: {
        SetDescriptionModal,
    },
    setup(props:any, { emit }) {
        const isLoading = ref(false);
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databaseSelected = props.viewSettings.databaseSelected;
        const schemasSelected = props.viewSettings.schemasSelected;
        const contentHeight = 'calc(100vh - 25.5rem)';
        const tables = ref([]);
        const initDbDiagram = () => {
            // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
            // For details, see https://gojs.net/latest/intro/buildingObjects.html
            const $ = go.GraphObject.make;  // for conciseness in defining templates

            var myDiagram = $(go.Diagram, "myDiagramDiv",  {
                allowDelete: false,
                allowCopy: false,
                //layout: $(go.GridLayout, { wrappingColumn: 8, spacing: new go.Size(10, 10) }),
                layout: $(go.LayeredDigraphLayout),
                //arrangementSpacing: new go.Size(1, 1),
                contentAlignment: go.Spot.Center,
                "undoManager.isEnabled": false
            });

            var colors = {
                'red': '#be4b15',
                'green': '#52ce60',
                'blue': '#6ea5f8',
                'lightred': '#fd8852',
                'lightblue': '#afd4fe',
                'lightgreen': '#b9e986',
                'pink': '#faadc1',
                'purple': '#d689ff',
                'orange': '#fdb400',
            }

            // the template for each attribute in a node's array of item data
            var itemTempl =
                $(go.Panel, "Horizontal",
                    $(go.Shape,
                        { desiredSize: new go.Size(15, 15), strokeJoin: "round", strokeWidth: 3, stroke: null, margin: 2 },
                        new go.Binding("figure", "figure"),
                        new go.Binding("fill", "color"),
                        new go.Binding("stroke", "color")),
                    $(go.TextBlock,
                        {
                            stroke: "#333333",
                            font: "bold 14px sans-serif"
                        },
                        new go.Binding("text", "name"))
                );

            // define the Node template, representing an entity
            myDiagram.nodeTemplate =
                $(go.Node, "Auto",  // the whole node panel
                    {
                        selectionAdorned: false,
                        resizable: false,
                        layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                        fromSpot: go.Spot.AllSides,
                        toSpot: go.Spot.AllSides,
                        isShadowed: true,
                        shadowOffset: new go.Point(3, 3),
                        shadowColor: "#C5C1AA",
                        locationSpot: go.Spot.Center
                    },
                    new go.Binding("location", "location").makeTwoWay(),
                    // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
                    // clear out any desiredSize set by the ResizingTool.
                    new go.Binding("desiredSize", "visible", v => new go.Size(NaN, NaN)).ofObject("LIST"),
                    // define the node's outer shape, which will surround the Table
                    $(go.Shape, "RoundedRectangle",
                        { fill: 'white', stroke: "#eeeeee", strokeWidth: 3 }),
                    $(go.Panel, "Table",
                        { margin: 8, stretch: go.GraphObject.Fill },
                        $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
                        // the table header
                        $(go.TextBlock,
                            {
                                row: 0, alignment: go.Spot.Center,
                                margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
                                font: "bold 16px sans-serif"
                            },
                            new go.Binding("text", "key")),
                        // the collapse/expand button
                        //$("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
                        //    { row: 0, alignment: go.Spot.TopRight }),
                        // the list of Panels, each showing an attribute
                        $(go.Panel, "Vertical",
                            {
                                name: "LIST",
                                row: 1,
                                padding: 3,
                                alignment: go.Spot.Center,
                                defaultAlignment: go.Spot.Left,
                                stretch: go.GraphObject.Horizontal,
                                itemTemplate: itemTempl
                            },
                            new go.Binding("itemArray", "items"))
                    )  // end Table Panel
                );  // end Node

            // define the Link template, representing a relationship
            myDiagram.linkTemplate =
                $(go.Link,  // the whole link panel
                    {
                        selectionAdorned: true,
                        layerName: "Foreground",
                        reshapable: true,
                        routing: go.Link.AvoidsNodes,
                        corner: 5,
                        curve: go.Link.JumpOver,
                        curviness: 20,
                    },
                    $(go.Shape,  // the link shape
                        { stroke: "#303B45", strokeWidth: 2.5 }),
                    $(go.TextBlock,  // the "from" label
                        {
                            textAlign: "center",
                            font: "bold 14px sans-serif",
                            stroke: "#1967B3",
                            segmentIndex: 0,
                            segmentOffset: new go.Point(NaN, NaN),
                            segmentOrientation: go.Link.OrientUpright
                        },
                        new go.Binding("text", "text")),
                    $(go.TextBlock,  // the "to" label
                        {
                            textAlign: "center",
                            font: "bold 14px sans-serif",
                            stroke: "#1967B3",
                            segmentIndex: -1,
                            segmentOffset: new go.Point(NaN, NaN),
                            segmentOrientation: go.Link.OrientUpright
                        },
                        new go.Binding("text", "toText"))
                );

            // create the model for the E-R diagram
            //console.log('nodeDataArray', tables.value);
            var nodeDataArray = tables.value.map((xTable:any) => {
                return {
                    key: xTable.name,
                    items: [{ name: "ProductID", iskey: true, figure: "Decision", color: colors.red },
                    { name: "ProductName", iskey: false, figure: "Hexagon", color: colors.blue },
                    { name: "SupplierID", iskey: false, figure: "Decision", color: "purple" },
                    { name: "CategoryID", iskey: false, figure: "Decision", color: "purple" }]
                };
            });
            //console.log('nodeDataArray', nodeDataArray);
            var linkDataArray = [
                { from: "datasource_cdc", to: "task_result", text: "0..N", toText: "1" },
                { from: "datasource_column", to: "datasource_parameter", text: "0..N", toText: "1" },
            ];
            myDiagram.model = new go.GraphLinksModel(
                {
                    copiesArrays: true,
                    copiesArrayObjects: true,
                    nodeDataArray: nodeDataArray,
                    linkDataArray: linkDataArray
                });    
            setTimeout(() => {
                myDiagram.requestUpdate();
            }, 1000);        
        }
        const fetchTables = async ( datasourceName: string, databaseName: string, schemaName: string ) => {
            isLoading.value = true;
            const res = await dataSourceApi.fetchTables(
                datasourceName,
                databaseName,
                schemaName
            );
            tables.value = res.data.tables;
            isLoading.value = false;
        };
        
        const refreshData = async () =>{
            // hard code for now
            await fetchTables(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name
            );
            initDbDiagram();
        };

        const updateSchemaDesc = (metaId:string, description:string) => {
            updateSchemaDescription(metaId, description).then((metaData:any) =>{
                ElMessage({
                    message: "C???p nh???t m?? t??? schema th??nh c??ng",
                    type: 'success',
                });
            });
        }; 

        const updateTableDesc = (metaId:string, description:string) => {
            updateTableDescription(metaId, description).then((metaData:any) =>{
                ElMessage({
                    message: "C???p nh???t m?? t??? table th??nh c??ng",
                    type: 'success',
                });
            });
        }; 

        onMounted(async () => {
            // hard code for now
            await fetchTables(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name
            );
            initDbDiagram();
        });
        watch(isLoading, (newVal) => {
            emit("onLoadingChanged", newVal);
        });
        return {
            isLoading,
            schemasSelected,
            tables,
            contentHeight,
            refreshData,
            updateSchemaDesc,
            updateTableDesc,
        };
    },
};
