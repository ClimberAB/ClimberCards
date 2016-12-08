/*global define*/
define( [
	'jquery',
	'underscore',
	'qlik',
	'ng!$q',
	'ng!$http',
	'./lib/js/components/pp-climber/pp-climber'
], function ( $, _, qlik, $q, $http ) {

	var app = qlik.currApp();

	var getSheetList = function () {

		var defer = $q.defer();

		app.getAppObjectList( function ( data ) {
			var sheets = [];
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
				return item.qData.rank;
			} );
			_.each( sortedData, function ( item ) {
				sheets.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				} );
			} );
			return defer.resolve( sheets );
		} );

		return defer.promise;
	};

	// ****************************************************************************************
	// Dimensions & Measures
	// ****************************************************************************************
	var dimensions = {
		uses: "dimensions",
		min: 3,
		max: 4
	};

	var measures = {
		uses: "measures",
		min: 1,
		max: 1
	};

	var sorting = {
		uses: "sorting"
	};

	// ****************************************************************************************
	// Other Settings
	// ****************************************************************************************

	var addons = {
		type:"items",
		component:"expandable-items",
		translation:"properties.addons",
		items: {
				dataHandling:{uses:"dataHandling"}
		}
	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************
	 var about = {
        component: "pp-cl-cards",
        translation: "Common.About",
        show: true,
    };

	var selectOneAndGoto = {
		ref: "props.selectOneAndGoto",
		label: "Selection mode",
		type: "boolean",
		component: "switch",
		defaultValue: false,
		options: [
			{
				value: true,
				label: "Select and goto sheet"
			},
			{
				value: false,
				label: "Selection"
			}
		]
	};

	var sheetId = {
		ref: "props.sheetId",
		label: "Sheet ID",
		type: "string",
		expression: "optional",
		show: function ( data ) {
			return data.props.selectOneAndGoto;
		}
	};

	var sheetList = {
		type: "string",
		component: "dropdown",
		label: "Select Sheet",
		ref: "props.selectedSheet",
		options: function () {
			return getSheetList().then( function ( items ) {
				return items;
			} );
		},
		show: function ( data ) {
			return data.props.selectOneAndGoto;
		}
	};

	var selectionPanel = {
		label: "Selection mode",
		type: "items",
		items: { 
			selectOneAndGoto: selectOneAndGoto,
			sheetList: sheetList,
		}
	};

	var layoutMode = {
	    type: "string",
	    component: "dropdown",
	    label: "Layout Mode",
	    ref: "props.layoutMode",
	    defaultValue: "MEDIUM",
	    options: [{
	      value: "SMALL",
	      label: "Small",
	    }, {
	      value: "MEDIUM",
	      label: "Medium",
	    }, {
	      value: "LARGE",
	      label: "Large",
	    }],
	};

	var imageLayout = {
	    type: "string",
	    component: "dropdown",
	    label: "Image Layout",
	    ref: "props.imageLayout",
	    defaultValue: "LANDSCAPE",
	    options: [ {
	      value: "LANDSCAPE",
	      label: "Landscape",
	    }, {
	      value: "SQUARE",
	      label: "Square",
	    }, {
	      value: "PORTRAIT",
	      label: "Portrait",
	    }],
	};

	  var imageSizeMode = {
	    type: "string",
	    component: "dropdown",
	    label: "Image Size Mode",
	    ref: "props.imageSizeMode",
	    defaultValue: "CONTAIN",
	    options: [ {
	      value: "CONTAIN",
	      label: "Contain",
	    }, {
	      value: "COVER",
	      label: "Cover",
	    }, {
	      value: "FILL",
	      label: "Fill",
	    }],
	  };
	  // Appearance Panel
	var layoutPanel = {
		label: "Cards Layout",
		type: "items",
		items: { 
			layoutMode: layoutMode,
			imageLayout: imageLayout,
			imageSizeMode: imageSizeMode,
		}
	};
	// Appearance Panel
	var appearancePanel = {
		uses: "settings",
		items: {
			selectionPanel: selectionPanel,
			layoutPanel: layoutPanel,
			initFetchRows : {
							ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
							label : "Initial fetch rows",
							type : "number",
							defaultValue : 20
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: dimensions,
			measures: measures,
			sorting: sorting,
			addons: addons,
			appearance: appearancePanel,
			about: about

		}
	};

} );
