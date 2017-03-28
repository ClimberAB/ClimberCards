define([
    'jquery',
    'underscore',
    'qlik',
    './properties',
    './initialproperties',
    'client.utils/state',
    './lib/js/extensionUtils',
    './lib/js/perfect-scrollbar.min',
    './lib/js/perfect-scrollbar.jquery.min',
    'text!./lib/css/perfect-scrollbar.min.css',
    'text!./lib/css/style.css',
    'text!./lib/partials/template.html',
    './lib/js/directives/clTouch',
    './lib/js/directives/onLastRepeat',
],
    function ($, _, qlik, props, initProps, stateUtil, extensionUtils, ps, psJqeuery, PScss, cssContent, ngTemplate) {
        'use strict';

        var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/sense/app/"));
        extensionUtils.addStyleToHeader(cssContent);
        extensionUtils.addStyleToHeader(PScss);



        return {

            definition: props,

            initialProperties: initProps,

            snapshot: {
                canTakeSnapshot: true
            },
            support: {
                export: true,
                exportData: true
            },


            resize: function ($element, layout) {
                this.paint($element, layout);
            },

            clearSelectedValues: function ($element) {
                console.log('clearSelectedValues', $element);
            },

            paint: function ($element, layout) {

                //var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/sense/app/" ) + 1 );
                console.groupCollapsed('Basic Objects');
                console.info('$element:');
                console.log($element);
                console.info('layout:');
                console.log(layout);
                console.info('prefix:');
                console.log(prefix);
                console.info('backendApi:');
                console.log(this.backendApi);
                console.groupEnd();

                this.$scope.backendApi = this.backendApi;
                this.$scope.props = layout.props;

                $element.find('.selected').removeClass('selected');

                $element.find('.cl-cardsview').perfectScrollbar();

                var dimcount = layout.qHyperCube.qDimensionInfo.length;
                var mainValueTitle = layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;

                this.$scope.selectedCount = layout.qHyperCube.qDimensionInfo[0].qStateCounts.qSelected + layout.qHyperCube.qDimensionInfo[0].qStateCounts.qSelectedExcluded;


                if (layout.qHyperCube.qDataPages[0]) {
                    this.$scope.dataPages = _.map(layout.qHyperCube.qDataPages[0].qMatrix, function (row, idx) {
                        return {
                            'id': row[0] ? row[0].qText : '',
                            'title': row[2] ? row[2].qText : '',
                            'coverUrl': row[1].qText.substr(0, 1) == "/" ? prefix + row[1].qText : row[1].qText,
                            'mainValue': row[dimcount].qText,
                            'mainValueTitle': mainValueTitle,
                            'secondaryAttribute': dimcount > 3 ? row[3].qText : "",
                            'qElemNumber': row[0].qElemNumber,
                            'qState': row[0].qState
                        }
                    });
                }
                return qlik.Promise.resolve();

            },


            // Angular Support (uncomment to use)
            template: ngTemplate,

            // Angular Controller
            controller: ['$scope', '$element', function ($scope, $element) {

                $scope.dataPages = {};
                $scope.backendApi = {};
                $scope.props = {};
                $scope.selectedCount = 0;


                $scope.selections = {
                    selectionsMode: '',
                    swipe_idx_min: -1,
                    swipe_idx_max: -1,
                    values_to_select: [],
                };

                $scope.getCardSize = function () {
                    switch ($scope.props.layoutMode) {
                        case 'SMALL':
                            return 35;
                            break;
                        case 'LARGE':
                            return 94;
                            break;
                        default:
                            return 60;
                    }
                };

                $scope.noInteractions = function () {
                    return !stateUtil.isInAnalysisMode();
                };

                $scope.compactLayout = function () {
                    return $element.width() < 350;
                };

                $scope.setVariable = function (variableName, variableValue) {
                    if (!_.isEmpty(variableName) && (!_.isEmpty(variableValue))) {
                        var app = qlik.currApp();
                        app.variable.setContent(variableName, variableValue);
                    }
                };

                $scope.selectValueInField = function (field, value) {
                    if (!_.isEmpty(field) && (!_.isEmpty(value))) {
                        var app = qlik.currApp();
                        app.field(field).selectMatch(value, false);
                    }
                };

                // Helper function to split numbers.
                $scope.splitToStringNum = function (string, seperator) {
                    var item = string.split(seperator);
                    for (var i = 0; i < item.length; i++) {
                        if (!isNaN(item[i])) {
                            item[i] = Number(item[i]);
                        }
                    }
                    return item;
                };


                $scope.selectValuesInField = function (field, values) {
                    if (!_.isEmpty(field) && (!_.isEmpty(values))) {
                        var app = qlik.currApp();
                        var valuesArray = $scope.splitToStringNum(values, ';');
                        app.field(field).selectValues(valuesArray, false).catch(function(err){
                            console.error(err);
                        });
                    }
                };

                $scope.doActionBeforeNavigation = function () {
                    switch ($scope.props.actionBeforeNavigation) {
                        case "selectValueInField":
                            $scope.selectValueInField($scope.props.field, $scope.props.value);
                            break;
                        case "selectValuesInField":
                            $scope.selectValuesInField($scope.props.field, $scope.props.values);
                            break;
                        case "setVariable":
                            $scope.setVariable($scope.props.variable, $scope.props.variableValue);
                            break;
                        default:
                            break;
                    }

                };

                $scope.clickCard = function ($event, qElemNumber) {

                    if ($scope.selectedCount == 1) {
                        $scope.backendApi.selectValues(0, [parseInt(qElemNumber)], true)
                    } else {
                        if ($scope.props.selectOneAndGoto) {
                            $scope.backendApi.selectValues(0, [parseInt(qElemNumber)], false).then(function (reply) {
                                if ($scope.props.actionBeforeNavigation && $scope.props.actionBeforeNavigation !== 'none') {
                                    $scope.doActionBeforeNavigation();
                                }
                                //Goto sheet
                                if (!_.isEmpty($scope.props.selectedSheet)) {
                                    qlik.navigation.gotoSheet($scope.props.selectedSheet);
                                }
                            });
                        } else {
                            $($event.originalEvent.target).toggleClass('selected')
                            $scope.selectValues(0, [parseInt(qElemNumber)], false);
                        }
                    }
                };

                $scope.onSwipeStart = function ($event) {

                    if (!$scope.props.selectOneAndGoto) {
                        $scope.selections.values_to_select = [];
                        var target = $($event.originalEvent.target);
                        var idx = parseInt(target.attr('idx'));

                        $scope.selections.swipe_idx_min = idx;
                        $scope.selections.swipe_idx_max = idx;

                        var value = parseInt(target.attr('data-value'));

                        $scope.selections.selectionsMode = !$(target).hasClass('selected');

                        if (typeof value != typeof undefined) {
                            if ($scope.selections.selectionsMode) {
                                $scope.selections.values_to_select.push(value);
                                $(target).addClass('selected');
                            } else {
                                $scope.selections.values_to_select.push(value);
                                $(target).removeClass('selected');
                            }
                        }
                    }
                };

                $scope.onSwipeUpdate = function ($event) {

                    if (!$scope.props.selectOneAndGoto) {
                        var target = $($event.originalEvent.target);

                        var idx = parseInt(target.attr('idx'));

                        var updateSelection = $scope.selections.swipe_idx_min > idx || $scope.selections.swipe_idx_max < idx;

                        if (updateSelection && !isNaN(idx)) {
                            $scope.selections.swipe_idx_min = $scope.selections.swipe_idx_min > idx ? idx : $scope.selections.swipe_idx_min;
                            $scope.selections.swipe_idx_max = $scope.selections.swipe_idx_max < idx ? idx : $scope.selections.swipe_idx_max;

                            for (var i = $scope.selections.swipe_idx_max; i >= $scope.selections.swipe_idx_min; i--) {
                                var elem = $($element).find("[idx='" + i + "']")[0];
                                if ($scope.selections.selectionsMode) {
                                    if (!$(elem).hasClass('selected')) {
                                        var value = parseInt($(elem).attr('data-value'));
                                        if ($scope.selections.values_to_select.indexOf(value) == -1) {
                                            if (typeof value != typeof undefined) {
                                                $scope.selections.values_to_select.push(value);
                                                $(elem).addClass('selected');
                                            }
                                        }
                                    }
                                } else {
                                    if ($(elem).hasClass('selected')) {
                                        var value = parseInt($(elem).attr('data-value'));
                                        if ($scope.selections.values_to_select.indexOf(value) == -1) {
                                            if (typeof value != typeof undefined) {
                                                $scope.selections.values_to_select.push(value);
                                                $(elem).removeClass('selected');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };

                $scope.onSwipeCancel = function ($event) {

                    if (!$scope.props.selectOneAndGoto) {
                        console.log('swipecancel event called', $event);
                        console.log('datavalue: ', $event.originalEvent.target.attributes.datavalue.value);
                    }
                };

                $scope.onSwipe = function ($event) {

                    if (!$scope.props.selectOneAndGoto) {

                        $scope.selections.swipe_idx_min = -1;
                        $scope.selections.swipe_idx_max = -1;

                        if ($scope.selections.values_to_select != []) {
                            console.log('Select values', $scope.selections);
                            if ($scope.selections.selectionsMode) {
                                $scope.selectValues(0, $scope.selections.values_to_select, true);
                            } else {
                                $scope.selectValues(0, $scope.selections.values_to_select, true);
                            }
                        }
                        $scope.selections.field = '';
                    }
                };

            }]
        };

    });